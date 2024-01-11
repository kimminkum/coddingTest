import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "./BoradList";
import Write from "./Write";
import Detail from "./Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

interface MapleCharacter {
  ocid: string;
}

interface DetailCharacter {
  character_class: string;
  character_class_level: string;
  world_name: string;
  date: string;
  character_gender: string;
  character_guild_name: string;
  character_level: number;
  character_name: string;
  character_image: string;
}

interface PopularCharacter {
  popularity: number;
  date: string;
}

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [mapleCharacter, setMapleCharacter] = useState<MapleCharacter | null>(
    null
  );
  const [mapledetail, setMapledetail] = useState<DetailCharacter | null>(null);
  const [populars, setPopulars] = useState<PopularCharacter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const formattedDate = currentDate.toISOString().split("T")[0];
  const myApiKey =
    "test_d5d01dcf5a408a2f32d5662cccf248128aa0ee44db28deb4e95da08b2a4012a160b1f54ba0f445f36db292e67dfe4e33";

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(
          name
        )}`,
        {
          headers: {
            "x-nxopen-api-key": myApiKey
          }
        }
      );

      const mapleCharacterData = response.data; // 새로운 변수에 데이터 저장

      setMapleCharacter(mapleCharacterData);

      try {
        console.log(mapleCharacterData?.ocid + formattedDate);
        const res = await axios.get(
          `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${mapleCharacterData?.ocid}&date=${formattedDate}`,
          {
            headers: {
              "x-nxopen-api-key": myApiKey
            }
          }
        );
        const res2 = await axios.get(
          `https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${mapleCharacterData?.ocid}&date=${formattedDate}`,
          {
            headers: {
              "x-nxopen-api-key": myApiKey
            }
          }
        );

        setMapledetail(res.data);
        setPopulars(res2.data);
      } catch (err) {
        console.error("second error:", err);
        setError("Error second data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please check the character name.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (name) {
      fetchData();
    } else {
      setError("Please enter a character name.");
    }
  };

  useEffect(() => {
    console.log(mapledetail);
  }, [setMapledetail]);

  return (
    <div className="App">
      <div className="bg"></div>

      <div className="base">
        {/* <BrowserRouter>
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/write/:id" element={<Write />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<BoardList />} />
          </Routes>
        </BrowserRouter> */}

        {/*open API */}
        <div>
          <input
            type="text"
            placeholder="Enter character name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleButtonClick} disabled={loading}>
            Fetch Character Info
          </button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}

        {mapleCharacter && (
          <div>
            <div className="maple">Character Name: {mapleCharacter.ocid}</div>

            {mapledetail && (
              <div>
                <div className="detail">
                  <p>{mapledetail.character_guild_name}</p>
                  <p>{mapledetail.character_class_level}</p>
                  <p>{mapledetail.character_gender}</p>
                  <p>{mapledetail.character_name}</p>
                  <p>{mapledetail.character_level}</p>
                  <p>{mapledetail.character_class}</p>
                  <p>{mapledetail.world_name}</p>
                  <p>{mapledetail.date}</p>
                  <p>{populars?.date}</p>
                  <p>{populars?.popularity}</p>

                  <img src={mapledetail.character_image} alt="" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default App;

import React, { useReducer, useEffect, useState } from "react";
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

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [mapleCharacter, setMapleCharacter] = useState<MapleCharacter | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const myApiKey =
    "test_d5d01dcf5a408a2f32d5662cccf248128aa0ee44db28deb4e95da08b2a4012a160b1f54ba0f445f36db292e67dfe4e33";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    console.log(
      "Request URL:",
      `https://open.api.nexon.com/maplestory/v1/id?ocid=${encodeURIComponent(
        name
      )}`
    );
    // 요청 파라미터를 출력하여 확인
    console.log("Request Parameters:", {
      ocid: encodeURIComponent(name)
      // 다른 필요한 파라미터도 필요에 따라 추가
    });

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

      setMapleCharacter(response.data);
      console.log("hi" + mapleCharacter?.ocid);
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
          <div className="maple">Character Name: {mapleCharacter.ocid}</div>
        )}
      </div>
    </div>
  );
};
export default App;

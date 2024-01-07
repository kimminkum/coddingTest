import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "./BoradList";
import Write from "./Write";
import Detail from "./Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * App class
 */
const App: React.FC = () => {
  const [date, setDate] = useState("");

  const callApi = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        setDate(json.title);
      });
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 API 호출
    callApi();
  }, []); // 빈 배열은 마운트될 때 한 번만 실행됨

  // {
  //   "userId": 1,
  //   "id": 1,
  //   "title": "delectus aut autem",
  //   "completed": false
  // }

  return (
    <div className="App">
      <div className="bg"></div>

      <div className="base">
        <BrowserRouter>
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/write/:id" element={<Write />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<BoardList />} />
          </Routes>
          <div>{date ? date : "none"}</div>
        </BrowserRouter>
      </div>
    </div>
  );
};
export default App;

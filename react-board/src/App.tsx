import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "BoradList";
import Write from "./Write";
import Detail from "./Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * App class
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="write" element={<Write />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="/" element={<BoardList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;

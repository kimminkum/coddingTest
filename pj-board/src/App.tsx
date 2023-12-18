import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Main from "components/Main";
import View from "components/View";
import NotFound from "components/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/view/:viewId" element={<View />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

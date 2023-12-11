import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";

// const cors = require("cors");
// const express = require("express");
// const app = express();

// let corsOptions = {
//   origin: "*", // 출처 허용 옵션
//   credential: true // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
// };

// app.use(cors(corsOptions));

const submitTest = () => {
  Axios.get("http://localhost:8000/", {}).then(() => {
    alert("등록 완료!");
  });
};

class BoardList extends Component {
  /**
   * @return {Component} Component
   */
  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>1</td>
            <td>게시글1</td>
            <td>artistJay</td>
            <td>2022-03-19</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>2</td>
            <td>게시글2</td>
            <td>artistJay</td>
            <td>2022-03-19</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>3</td>
            <td>게시글2</td>
            <td>artistJay</td>
            <td>2022-03-19</td>
          </tr>
        </tbody>
        <Button variant="info" onClick={submitTest}>
          글쓰기
        </Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </Table>
    );
  }
}

export default BoardList;

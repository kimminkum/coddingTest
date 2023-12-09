import { render } from "@testing-library/react";
import { Component } from "react";
import Table from "react-bootstrap/Table";

class BoradList extends Component {
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default BoradList;

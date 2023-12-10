import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

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
        <Button variant="info">글쓰기</Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </Table>
    );
  }
}

export default BoardList;

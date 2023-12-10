import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Write extends Component {
  /**
   * @return { Component} Component
   **/
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control type="email" placeholder="email@xxx.com" />
          </Form.Group>
          <Form.Group>
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" />
          </Form.Group>
        </Form>
        <Button variant="info">작성완료</Button>
        <Button variant="secondary">취소</Button>
      </div>
    );
  }
}

export default Write;

import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

class Write extends Component {
  state = {
    isModifyMode: true,
    title: "",
    content: ""
  };

  write = () => {
    Axios.post("http://localhost:8000/insert", {
      title: this.state.title,
      content: this.state.content
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  update = () => {
    Axios.post("http://localhost:8000/update", {
      title: this.state.title,
      content: this.state.content
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**
   * @return { Component} Component
   **/
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={this.handleChange}
              placeholder="제목을 입력하세요."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              onChange={this.handleChange}
              placeholder="내용을 입력하세요"
            />
          </Form.Group>
        </Form>
        <Button
          variant="info"
          onClick={this.state.isModifyMode ? this.write : this.update}
        >
          작성완료
        </Button>
        <Button variant="secondary">취소</Button>
      </div>
    );
  }
}

export default Write;

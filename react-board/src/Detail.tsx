import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Link } from "react-router-dom";

interface IProps {
  boardId: number;
}
/**
 * Write class
 * @param {SS} e
 */

class Detail extends Component<IProps> {
  /**
   * @param {SS} e
   */
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isRendered: false
    };
  }
  state = {
    title: "",
    content: "",
    isRendered: false
  };

  detail = () => {
    Axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            title: res.data[0].BOARD_TITLE,
            content: res.data[0].BOARD_CONTENT
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @return { Component} Component
   **/
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              placeholder="제목을 입력하세요."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={this.state.content}
              placeholder="내용을 입력하세요"
            />
          </Form.Group>
        </Form>
        <Link to="/">
          <Button variant="secondary">돌아가기</Button>
        </Link>
      </div>
    );
  }
}

export default Detail;

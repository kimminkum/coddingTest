import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import { Link } from "react-router-dom";

const Board = ({
  id,
  title,
  content,
  props
}: {
  id: number;
  title: string;
  content: string;
  props: any;
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={id}
          onChange={(e) => {
            props.onCheckboxChange(
              e.currentTarget.checked,
              e.currentTarget.value
            );
          }}
        />
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
    </tr>
  );
};

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
      boardList: []
    };
  }
  state = {
    boardList: []
  };
  /*
  handleDelete = () => {
    if (this.state.checkList.length === 0) {
      alert("삭제할 게시글을 선택하여 주세요.");
      return;
    }
    let boardIdList = "";

    this.state.checkList.forEach((v: any) => {
      boardIdList += `${v},`;
    });

    Axios.post("http://localhost:8000/delete", {
      boardIdList: boardIdList.substring(0, boardIdList.length - 1)
    })
      .then(() => {
        this.getList();
      })
      .catch((e) => {
        console.error(e);
      });
  };
*/
  detail = () => {
    Axios.post(`http://localhost:8000/detail?id=${this.props.boardId}`)
      .then((res) => {
        this.setState({
          title: res.data[0].BOARD_TITLE,
          content: res.data[0].BOARD_CONTENT
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @return { Component} Component
   **/
  render() {
    const { boardList }: { boardList: any } = this.state;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((v: any) => {
              return (
                <Board
                  id={v.BOARD_ID}
                  title={v.BOARD_TITLE}
                  content={v.BOARD_CONTENT}
                  key={v.BOARD_ID}
                  props={this}
                />
              );
            })}
          </tbody>
        </Table>
        <Link to="/">
          <Button variant="secondary">돌아가기</Button>
        </Link>
      </div>
    );
  }
}

export default Detail;

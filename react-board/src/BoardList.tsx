import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";

// 게시판 데이터를 받아올 것을 정리
// map으로도 표현가능해진다.
const Board = ({
  id,
  title,
  registerId,
  registerDate,
  props
}: {
  id: number;
  title: string;
  registerId: string;
  registerDate: string;
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
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

// 부모와 통신하는 방식
interface IProps {
  isComplete: boolean;
  handleModify: any;
  renderComplete: any;
}

/**
 * BoardList class
 * @param {SS} e
 */

// 메인
class BoardList extends Component<IProps> {
  /**
   * @param {SS} props
   */

  constructor(props: any) {
    super(props);
    this.state = {
      boardList: [],
      checkList: []
    };
  }

  state = {
    boardList: [],
    checkList: []
  };

  getList = () => {
    Axios.get("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({ boardList: data });
        this.props.renderComplete();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  componentDidMount() {
    this.getList();
  }

  /**
   * @param {Component} Component
   * @param {any} id
   */

  onCheckboxChange = (checked: boolean, id: any) => {
    const list: Array<string> = this.state.checkList.filter((v) => {
      return v != id;
    });

    if (checked) {
      list.push(id);
    }

    this.setState({
      checkList: list
    });
  };

  /** */
  componentDidUpdate() {
    if (this.props.isComplete) {
      this.getList();
    }
  }
  /**
   * @returns {Component} Component
   */

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
            </tr>
          </thead>
          <tbody>
            {boardList.map((v: any) => {
              return (
                <Board
                  id={v.BOARD_ID}
                  title={v.BOARD_TITLE}
                  registerId={v.REGISTER_ID}
                  registerDate={v.REGISTER_DATE}
                  key={v.BOARD_ID}
                  props={this}
                />
              );
            })}
          </tbody>
        </Table>
        <Button variant="info">글쓰기</Button>
        <Button
          variant="secondary"
          onClick={() => {
            this.props.handleModify(this.state.checkList);
          }}
        >
          수정하기
        </Button>
        <Button variant="danger">삭제하기</Button>
      </div>
    );
  }
}

export default BoardList;

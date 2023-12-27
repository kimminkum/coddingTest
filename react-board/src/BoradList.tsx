// BoardList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Styled/basic.scss";
import "./Styled/board.scss";
import Table from "react-bootstrap/Table";

interface Board {
  BOARD_ID: number;
  BOARD_TITLE: string;
  REGISTER_DATETIME: string;
  // 다른 필요한 속성들 추가
}

const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState<Board[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/list")
      .then((response) => {
        setBoardList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching board list:", error);
      });
  }, []);

  return (
    <div className="boardlist">
      <div>
        <h2>게시판 목록</h2>
        <Table striped bordered hover className="board_t">
          <thead>
            <tr>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((board) => (
              <tr key={board.BOARD_ID}>
                <Link className="flex_sb" to={`detail/${board.BOARD_ID}`}>
                  <td className="board_t">{board.BOARD_TITLE}</td>
                </Link>
                <td className="board_d">
                  {new Intl.DateTimeFormat("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  }).format(new Date(board.REGISTER_DATETIME))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="flex_end">
          <Link to="/write">
            <button className="">글작성</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
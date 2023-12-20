// BoardList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <h1>게시판 목록</h1>
      <ul>
        {boardList.map((board) => (
          <li key={board.BOARD_ID}>
            <Link to={`/detail/${board.BOARD_ID}`}>{board.BOARD_TITLE}</Link>
            <div>{board.REGISTER_DATETIME}</div>
          </li>
        ))}
      </ul>
      <Link to="/write">
        <button>글작성</button>
      </Link>
    </div>
  );
};

export default BoardList;

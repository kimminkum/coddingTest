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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/list?page=${currentPage}`)
      .then((response) => {
        setBoardList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching board list:", error);
      });
  }, [currentPage]);

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
                <td className="board_t">
                  <Link className="flex_sb" to={`detail/${board.BOARD_ID}`}>
                    {board.BOARD_TITLE}
                  </Link>
                </td>
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

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span>현재 페이지: {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            // 이 부분에서 전체 페이지 수를 고려하여 비활성화 여부를 결정할 수 있음
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardList;

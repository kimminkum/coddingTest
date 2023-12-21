// Detail.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

interface Board {
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  // 다른 필요한 속성들 추가
}

interface RouteParams {
  id: string;
}

const Detail: React.FC = () => {
  const { id } = useParams();
  const parsedId = id ? parseInt(id) : undefined;
  const [board, setBoard] = useState<Board | null>(null); // 초기값은 null로 설정
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedId !== undefined) {
      axios
        .post(`http://localhost:8000/detail`, { boardIdList: parsedId })
        .then((response) => {
          setBoard(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching board details:", error);
        });
    }
  }, [parsedId]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    console.log("start");
    if (parsedId !== undefined) {
      axios
        .delete(`http://localhost:8000/delete/${parsedId}`)
        .then((response) => {
          console.log("none");
          console.log("Post deleted successfully:", response.data);
          // 삭제 성공 시 홈페이지로 이동
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          console.log("huri");
        });
    }
  };

  const handleUpdate = () => {
    navigate(`/write/${parsedId}`);
  };

  return (
    <div>
      <h1>글 상세 내용</h1>
      <div>
        <p>Title: {board.BOARD_TITLE}</p>
        <p>Content: {board.BOARD_CONTENT}</p>
      </div>
      <div>
        <button onClick={handleUpdate}>수정하기</button>
        <Link to="/">
          <button>돌아가기</button>
        </Link>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </div>
  );
};

export default Detail;

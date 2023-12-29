// Detail.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Styled/basic.scss";
import "./Styled/board.scss";

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
  const [comment, setComment] = useState<string[]>([]);
  const [redet, setRedet] = useState("");

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

      axios
        .post(`http://localhost:8000/comment`, { boardIdList: parsedId })
        .then((res) => {
          setComment(res.data.map((item: any) => item.redet_content));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [parsedId, comment]);

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

  const onRedet = () => {
    if (!redet.trim()) {
      return;
    }

    axios
      .post("http://localhost:8000/redet", { redet, id })
      .then((res) => {
        console.log("rok", res.data);
      })
      .catch((err) => {
        console.error("ERROR :", err);
      });
  };

  return (
    <div className="detail">
      <h2>글 상세 내용</h2>
      <div className="detail_box">
        <div className="title_p">제목 : {board.BOARD_TITLE}</div>
        <div className="content_p">{board.BOARD_CONTENT}</div>

        <div className="comment_p">
          {/* 배열 형태의 comment를 매핑하여 표시 */}
          {comment.map((commentItem, index) => (
            <div key={index}>{commentItem}</div>
          ))}
        </div>
      </div>

      <div>
        <input
          type="text"
          value={redet}
          onChange={(e) => setRedet(e.target.value)}
        />
        <button type="button" onClick={onRedet}>
          댓글
        </button>
      </div>

      <div className="flex_end">
        <button onClick={handleUpdate}>수정하기</button>
        <Link to="/">
          <button>돌아가기</button>
        </Link>
        <button className="red_btn" onClick={handleDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default Detail;

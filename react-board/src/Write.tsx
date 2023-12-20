// Write.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    axios
      .post("http://localhost:8000/insert", { title, content })
      .then((response) => {
        console.log("Post created successfully:", response.data);
        navigate("/"); // useNavigate를 사용하여 경로 변경
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div>
      <h1>글 작성</h1>
      <form>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Content: </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Write;

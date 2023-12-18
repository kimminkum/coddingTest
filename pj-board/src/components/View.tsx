import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";

function View() {
  const { viewId } = useParams();
  return (
    <div>
      <div>{viewId}의 상세 페이지입니다.</div>
    </div>
  );
}

export default View;

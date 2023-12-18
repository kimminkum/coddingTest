import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";

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
        <input type="checkbox" value={id} />
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

function Main() /*<Props>*/ {
  return (
    <div>
      <div></div>
    </div>
  );
}

export default Main;

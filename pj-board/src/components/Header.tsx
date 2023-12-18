import styled from "styled-components";

const BarOne = styled.div`
  width: 100%;
  padding: 10px 20px;

  @media (min-width: 1240px) {
    width: 1200px;
    padding: 10px 0;
    margin: 0 auto;
  }
`;

function Header() {
  return (
    <div>
      <div></div>
    </div>
  );
}

export default Header;

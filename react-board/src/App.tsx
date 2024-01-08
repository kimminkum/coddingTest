import React, { useReducer, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "./BoradList";
import Write from "./Write";
import Detail from "./Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

/**
 * App class
 */
function reducer(state: any, action: any) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });

  // fetchUsers 함수 정의
  const fetchUsers = async () => {
    // 요청 상태(LOADING, SUCCESS, ERROR)에 따라 dispatch 호출
    // 기본으로 `type: "LOADING"` dispatch가 호출됨
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;

  return (
    <div className="App">
      <div className="bg"></div>

      <div className="base">
        <BrowserRouter>
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/write/:id" element={<Write />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<BoardList />} />
          </Routes>
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>
                {user.username} ({user.name})
              </li>
            ))}
          </ul>
          <button onClick={fetchUsers}>불러오기</button>
        </BrowserRouter>
      </div>
    </div>
  );
};
export default App;

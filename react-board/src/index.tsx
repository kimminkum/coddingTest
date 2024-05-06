import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// import { Provider } from "react-redux";
// import { createStore } from "redux";

// function reducer(state: number, action: any) {
//     return state;
// }
// let store = createStore(reducer);

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(<App />);

{
  /* <Provider.StrictMode>
<Provider Store={store}>
    <App />
</Provider>
</Provider.StrictMode> */
}

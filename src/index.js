import ReactDOM from "react-dom";
import App from "./components/App";
import { StoreProvider } from "./store/StoreProvider";
import "./styles/index.scss";

ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById("root")
);

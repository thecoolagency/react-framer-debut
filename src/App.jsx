import { BrowserRouter as Router } from "react-router-dom";

import Nav from "./components/Nav";
import AnimatedRoutes from "./components/AnimatedRoutes";
import './styles/theme.css'

const App = () => {

    return (
        <div className="wrap">
            <Router>
                <Nav />
                <AnimatedRoutes />
            </Router>
        </div>
    );
};

export default App
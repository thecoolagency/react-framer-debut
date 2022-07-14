import { BrowserRouter as Router } from "react-router-dom";
import Connect from './components/Connect';

import Nav from "./components/Nav";
import AnimatedRoutes from "./components/AnimatedRoutes";

const App = () => {

    return (
        <div className="wrap">
            <Router>
                <div className="top-connect">
                    <Connect />
                </div>
                <Nav />
                <AnimatedRoutes />
            </Router>
        </div>
    );
};

export default App
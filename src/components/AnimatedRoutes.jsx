import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Home";
import Page from "../Page";
import About from "../About";
import Auth from "../Auth";

import { AnimatePresence } from 'framer-motion';

function AnimtedRoutes() {

    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/page" element={<Page />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Auth />} />
            </Routes>
        </AnimatePresence>
    )
}
export default AnimtedRoutes
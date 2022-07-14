import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Home";
import Mint from "../Mint";

import { AnimatePresence } from 'framer-motion';

function AnimtedRoutes() {

    const location = useLocation();

    return (
            <AnimatePresence>
                <Routes location={location} key={location.path}>
                    <Route path="/" element={<Home />} />
                    <Route path="/mint" element={<Mint />} />
                </Routes>
            </AnimatePresence>
        )
}
export default AnimtedRoutes
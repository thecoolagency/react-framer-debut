import React from 'react';
import { motion } from 'framer-motion'

const About = () => {

    return (
        <motion.div
            className="margins"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
        >
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet, consectet.</p>
        </motion.div>
    );
};

export default About

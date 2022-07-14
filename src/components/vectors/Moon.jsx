import { motion } from 'framer-motion';

const Moon = ({ color }) => {
    
    return (
        <motion.svg id="Moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <circle fill={color} cx="25" cy="25" r="25" />
        </motion.svg>
    )
}

export default Moon
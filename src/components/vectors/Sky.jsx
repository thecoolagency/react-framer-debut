import { motion } from 'framer-motion';

const Sky = ({ skyColor, viewBox }) => {
    
    return (
        <motion.svg id="Sky" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
            <linearGradient id="XMLID_24_" gradientUnits="userSpaceOnUse" x1="700" y1="1412.8772" x2="700" y2="925.9921">
                <stop offset="1" stopColor={skyColor} stopOpacity="100%" />
            </linearGradient>
            <rect id="XMLID_5197_" y="0" fill="url(#XMLID_24_)" width="1400" height="2000" />
        </motion.svg>
    )
}

export default Sky


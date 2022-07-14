import { motion } from 'framer-motion';

const Sky = ({ color, skyColor, viewBox }) => {
    
    return (
        <motion.svg id="" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
            <circle fill={color} cx="736.5" cy="517.3" r="1.7" />
            <circle fill={color} cx="602.3" cy="613.1" r="1.7" />
            <circle fill={color} cx="406.8" cy="506.7" r="1.7" />
            <circle fill={color} cx="85.1" cy="594.4" r="1.7" />
            <circle fill={color} cx="641.8" cy="587.6" r="5" />
            <circle fill={color} cx="893.6" cy="511.8" r="5" />
            <circle fill={color} cx="170.6" cy="511.8" r="5" />
            <circle fill={color} cx="534.2" cy="531" r="2.6" />
            <circle fill={color} cx="404.2" cy="576.8" r="2.6" />
            <circle fill={color} cx="857.6" cy="613.1" r="2.6" />
            <circle fill={color} cx="1272" cy="505" r="2.6" />
            <circle fill={color} cx="1340.4" cy="571.7" r="2.6" />
            <linearGradient id="XMLID_24_" gradientUnits="userSpaceOnUse" x1="700" y1="1412.8772" x2="700" y2="925.9921">
                {/*<stop offset="1" stopColor="#0058A8" stopOpacity="100%" />*/}
                <stop offset="1" stopColor={skyColor} stopOpacity="100%" />
            </linearGradient>
            <rect id="XMLID_5197_" y="0" fill="url(#XMLID_24_)" width="1400" height="2000" />
            <circle fill={color} cx="736.5" cy="986.1" r="1.7" />
            <circle fill={color} cx="602.3" cy="1081.8" r="1.7" />
            <circle fill={color} cx="406.8" cy="975.5" r="1.7" />
            <circle fill={color} cx="85.1" cy="1063.2" r="1.7" />
            <circle fill={color} cx="341.8" cy="1056.4" r="5" />
            <circle fill={color} cx="593.6" cy="980.6" r="5" />
            <circle fill={color} cx="170.6" cy="980.6" r="5" />
            <circle fill={color} cx="1234.2" cy="999.8" r="2.6" />
            <circle fill={color} cx="4044.2" cy="1045.6" r="2.6" />
            <circle fill={color} cx="853.6" cy="1081.8" r="2.6" />
            <circle fill={color} cx="1272" cy="973.8" r="2.6" />
            <circle fill={color} cx="1340.4" cy="540.4" r="2.6" />
            <circle fill={color} cx="636.5" cy="486.1" r="1.7" />
            <circle fill={color} cx="302.3" cy="281.8" r="1.7" />
            <circle fill={color} cx="406.8" cy="475.5" r="1.7" />
            <circle fill={color} cx="55.1" cy="363.2" r="1.7" />
            <circle fill={color} cx="641.8" cy="356.4" r="5" />
            <circle fill={color} cx="793.6" cy="480.6" r="5" />
            <circle fill={color} cx="170.6" cy="480.6" r="5" />
            <circle fill={color} cx="134.2" cy="499.8" r="2.6" />
            <circle fill={color} cx="304.2" cy="245.6" r="2.6" />
            <circle fill={color} cx="557.6" cy="881.8" r="2.6" />
            <circle fill={color} cx="272" cy="473.8" r="2.6" />
            <circle fill={color} cx="1640.4" cy="540.4" r="2.6" />
        </motion.svg>
    )
}

export default Sky


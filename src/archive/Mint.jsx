import React, { useState } from "react";
import { motion } from 'framer-motion'
import BGClear from "./components/vectors/BGClear";
import BGDark from "./components/vectors/BGDark";
import Sky from "./components/vectors/Sky";
import Stars from "./components/vectors/Stars";
import Moon from "./components/vectors/Moon";

const Mint = () => {

    const [ color ] = useState('#ffffff');
    const [ moonColor ] = useState('yellow');
    const [ skyColor ] = useState('#94b2ff');
    const [ viewBox ] = useState('0 0 1400 1400');

    return (
        <>
            <motion.div
                className="Mint"
                initial={{  }}
                animate={{  }}
                exit={{  }}
            >

                <Sky skyColor={skyColor} viewBox={viewBox} />
                <motion.div
                    className="moveStars"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 1 }}
                >
                    <Stars color={color} viewBox={viewBox} />
                </motion.div>

                <motion.div
                    className="thisMoon"
                    initial={{ opacity: 1, top: '8rem' }}
                    animate={{ opacity: 1, top: '2rem' }}
                    exit={{ top: '8rem'  }}
                >

                    <Moon color={moonColor} />

                </motion.div>

            </motion.div>

            <motion.div className="Mint"
                initial={{ marginLeft: 0 }}
                animate={{ marginLeft: 0 }}
                exit={{ opacity: 0 }}
            >

                <div className="floating">
                    <h3>Mint</h3>
                </div>

            </motion.div>

            <div className="bg-Ice">

                <motion.div className="BG"
                    initial={{ bottom: '-180px', left: '20px' }}
                    animate={{ bottom: '-240px', left: '30px' }}
                    exit={{ bottom: '-240px', left: '10px' }}
                >

                    <BGClear />

                </motion.div>
                
                <motion.div className="BG"
                    initial={{ bottom: '-240px' }}
                    animate={{ bottom: '-210px' }}
                    exit={{ bottom: '-240px' }}
                >

                    <BGDark />

                </motion.div>

            </div>
        </>
    )
};

export default Mint

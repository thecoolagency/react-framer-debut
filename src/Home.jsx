import React, { useState } from "react";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import {
  useAccount
} from 'wagmi';
import Connect from './components/Connect';
import BGClear from "./components/vectors/BGClear";
import BGDark from "./components/vectors/BGDark";
import Sky from "./components/vectors/Sky";
import Stars from "./components/vectors/Stars";
import Moon from "./components/vectors/Moon";

const Home = () => {

    const { isConnected } = useAccount();

    const [ color ] = useState('#ffffff');
    const [ moonColor ] = useState('#ffffff');
    const [ skyColor ] = useState('#001850');
    const [ viewBox ] = useState('0 0 1400 1400');
    const [ classSet, setClassSet ] = useState('second');

    return (
        <>
            <motion.div
                className="Home"
                initial={{  }}
                animate={{  }}
                exit={{  }}
            >

                <Sky skyColor={skyColor} viewBox={viewBox} />
                <motion.div
                    className="moveStars"
                    initial={{ top: '-100px', transform: 'scale(1.15)' }}
                    animate={{ top: '-100px', transform: 'scale(1.1)' }}
                    exit={{ top: '-100px', transform: 'scale(1.15)' }}
                >
                    <Stars color={color} viewBox={viewBox} classIs={classSet} />
                </motion.div>

                <motion.div
                    className="thisMoon"
                    initial={{ top: '8rem' }}
                    animate={{ top: '2rem' }}
                    exit={{ top: '8rem' }}
                >

                    <Moon color={moonColor} />

                </motion.div>

            </motion.div>

            <motion.div className="Base"
                initial={{ marginLeft: 0 }}
                animate={{ marginLeft: 0 }}
                exit={{ opacity: 0 }}
            >

                <motion.div className="container"
                    initial={{ opacity: 0, top: '150%' }}
                    animate={{ opacity: 1, top: '50%' }}
                    exit={{ opacity: 0, top: '150%' }}
                >

                    <div className="">

                        <h3>Welcome to PMF</h3>


                        {isConnected ? (
                            <div><Link className="link button" to="/mint">Mint</Link></div>
                        ) : !isConnected && (
                            <div><Connect / ></div>
                        )}
                        {/*<button onClick={()=>setClassSet('first')}>Stars</button>*/}
                        <br />

                    </div>

                </motion.div>

            </motion.div>

            <div className="bg-Ice">

                <motion.div className="BG"
                        initial={{ bottom: '-280px', left: '20px' }}
                        animate={{ bottom: '-340px', left: '30px' }}
                        exit={{ bottom: '-340px', left: '10px' }}
                >

                    <BGClear />

                </motion.div>
                
                <motion.div className="BG"
                    initial={{ bottom: '-220px' }}
                    animate={{ bottom: '-200px' }}
                    exit={{ bottom: '-220px'  }}
                >

                    <BGDark />

                </motion.div>
                
            </div>
        </>
    );
}

export default Home

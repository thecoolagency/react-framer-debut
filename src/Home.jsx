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
    const [ viewBox ] = useState('0 0 1400 900');
    const [ classSet, setClassSet ] = useState('');

    return (
        <div style={{ backgroundColor: '#001850' }}>
            <motion.div
                className="Home"
                initial={{ top: '0px', position: 'relative' }}
                animate={{ position: 'relative' }}
                exit={{ height: "100%", top: 0, position: 'relative' }}
                transition={{ type: "tween", duration: 1 }}
            >

                <Sky skyColor={skyColor} viewBox={viewBox} classIs={classSet} />
                <motion.div
                    className="moveStars"
                    initial={{ top: '0', left: '-150px', right: 0, opacity: 1, scale: 1.15 }}
                    animate={{ top: '-150px', left: '0px', right: 0, opacity: 0.65, scale: 1.15 }}
                    exit={{ top: '0', left: 0, right: 0, opacity: 1, scale: 1.15 }}
                    transition={{ type: "tween", duration: 1 }}
                >
                    <Stars color={color} viewBox={viewBox} classIs={classSet} />
                </motion.div>

                <motion.div
                    className="thisMoon"
                    initial={{ top: '22rem', left: "-8rem" }}
                    animate={{ top: '2rem', left: 0}}
                    exit={{ top: '22rem', left: '-8rem' }}
                    transition={{ type: "tween", duration: 1 }}
                >

                    <Moon color={moonColor} classIs={classSet} />

                </motion.div>

            </motion.div>

            <motion.div className="Base"
                initial={{ marginLeft: 0 }}
                animate={{ marginLeft: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.4 }}
            >

                <motion.div className="container"
                    initial={{ opacity: 0, top: '150%' }}
                    animate={{ opacity: 1, top: '50%' }}
                    exit={{ opacity: 0, top: '150%' }}
                >

                    <div classIs={classSet}>

                        <h3>Welcome to PMF</h3>


                        {isConnected ? (
                            <div><Link className="button" to="/mint">Mint</Link></div>
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
                        initial={{ bottom: '-320px', left: '30px' }}
                        animate={{ bottom: '-280px', left: '20px' }}
                        transition={{ type: "tween", duration: 1 }}
                >

                    <BGClear classIs={classSet} />

                </motion.div>
                
                <motion.div className="BG"
                    initial={{ bottom: '-220px' }}
                    animate={{ bottom: '-200px' }}
                    exit={{ bottom: '-220px'  }}
                    transition={{ type: "tween", duration: 1 }}
                >

                    <BGDark classIs={classSet} />

                </motion.div>
                
            </div>
        </div>
    );
}

export default Home

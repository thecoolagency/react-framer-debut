import React, { useState } from "react";
import { motion } from 'framer-motion';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import FlipCard, { BackCard, FrontCard } from './components/FlipCard';
import contractInterface from './contracts/contract-abi.json';
import BGClear from "./components/vectors/BGClear";
import BGDark from "./components/vectors/BGDark";
import Sky from "./components/vectors/Sky";
import Stars from "./components/vectors/Stars";
import Moon from "./components/vectors/Moon";

const contractConfig = {
    addressOrName: '0xe7258970df77d500e5a806b562823bd48f3bbfbc',
    contractInterface: contractInterface
};

const Mint = () => {
    
    const [ totalMinted, setTotalMinted ] = useState(0);
    const { isConnected } = useAccount();

    const {
        data: mintData,
        write: mint,
        isLoading: isMintLoading,
        isSuccess: isMintStarted,
        error: mintError,
    } = useContractWrite({ ...contractConfig, functionName: 'mint' });

    const { data: totalSupplyData } = useContractRead({
        ...contractConfig,
        functionName: 'totalSupply',
        watch: true,
    });

    const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
        hash: mintData?.hash,
    });

    React.useEffect(() => {
        if (totalSupplyData) {
            setTotalMinted(totalSupplyData.toNumber());
        }
    }, [totalSupplyData]);

    const isMinted = txSuccess;

    const [ color ] = useState('#ffffff');
    const [ moonColor ] = useState('#ffffff');
    const [ skyColor ] = useState('#08297d');
    const [ viewBox ] = useState('0 0 1400 1400');
    const [ classIsSet ] = useState('first');

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
                    initial={{ top: '-100px', transform: 'scale(1.1)', left: 0 }}
                    animate={{ top: '-100px', transform: 'scale(1.15)', left: '2rem' }}
                    exit={{ top: '-100px', transform: 'scale(1.1)', left: 0 }}
                >
                    <Stars color={color} viewBox={viewBox} classIs={classIsSet} />
                </motion.div>

                <motion.div
                    className="thisMoon"
                    initial={{ top: '2rem' }}
                    animate={{ top: '8rem' }}
                    exit={{ top: '2rem' }}
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
                <div style={{ flex: '1 1 auto' }}>
                  <div style={{ padding: '24px 24px 24px 0' }}>
                    <h1>Bud Dah Boy</h1>
                    <p style={{ margin: '12px 0 24px' }}>
                      {totalMinted} Bud Dah Boy minted.
                    </p>

                    {mintError && (
                      <p style={{ marginTop: 24, color: '#FF6257' }}>
                        Error: {mintError.message}
                      </p>
                    )}
                    {txError && (
                      <p style={{ marginTop: 24, color: '#FF6257' }}>
                        Error: {txError.message}
                      </p>
                    )}

                    {isConnected && !isMinted && (
                      <button
                        style={{ marginTop: 24 }}
                        disabled={isMintLoading || isMintStarted}
                        className="button"
                        data-mint-loading={isMintLoading}
                        data-mint-started={isMintStarted}
                        onClick={() => mint()}
                      >
                        {isMintLoading && 'Waiting for approval'}
                        {isMintStarted && 'Minting...'}
                        {!isMintLoading && !isMintStarted && 'Mint'}
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ flex: '0 0 auto' }}>
                  <FlipCard>
                    <FrontCard isCardFlipped={isMinted}>
                      <img
                        className="responsive"
                        src="/nft-hidden.png"
                        width="500"
                        height="500"
                        alt="Bud Dah Boy"
                      />
                      <h1 style={{ marginTop: 24 }}>Bud Dah Boy</h1>
                    </FrontCard>
                    <BackCard isCardFlipped={isMinted}>
                      <div style={{ padding: 24 }}>
                        <img
                          src="/nft.png"
                          width="80"
                          height="80"
                          alt="Bud Dah Boy"
                          style={{ borderRadius: 8 }}
                        />
                        <h2 style={{ marginTop: 24, marginBottom: 6 }}>Bud Dah Boy Minted!</h2>
                        <p style={{ marginBottom: 24 }}>
                          Your NFT will be visible in your wallet in the next few minutes.
                        </p>
                        <p style={{ marginBottom: 6 }}>
                          View on{' '}
                          <a href={`https://rinkeby.etherscan.io/tx/${mintData?.hash}`} target="_blank" rel="noreferrer">
                            Etherscan
                          </a>
                        </p>
                        <p>
                          View on{' '}
                          <a
                            target="_blank"
                            rel="noreferrer" 
                            href={`https://testnets.opensea.io/assets/rinkeby/${mintData?.to}/1`}
                          >
                            Opensea
                          </a>
                        </p>
                      </div>
                    </BackCard>
                  </FlipCard>
                </div>
              </motion.div>

            </motion.div>

            <div className="bg-Ice">

                <motion.div className="BG"
                    initial={{ bottom: '-340px', left: '20px' }}
                    animate={{ bottom: '-320px', left: '30px' }}
                    exit={{ bottom: '-340px', left: '10px'  }}
                >

                    <BGClear />

                </motion.div>
                
                <motion.div className="BG"
                    initial={{ bottom: '-200px' }}
                    animate={{ bottom: '-220px' }}
                    exit={{ bottom: '-200px' }}
                >

                    <BGDark />

                </motion.div>

            </div>
        </>
    )
};

export default Mint

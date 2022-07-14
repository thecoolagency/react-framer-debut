 // need to break this down smarter 

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { toast } from "react-toastify";
import "styles/ReactToastify.css";

import { SpinnerCircular } from 'spinners-react';

import { ReactComponent as Opensea } from 'assets/opensea.svg';
import { ReactComponent as Rarible } from 'assets/rarible.svg';
import { ReactComponent as Etherscan } from 'assets/etherscan.svg';

import contract from "contracts/MemesTCA.json";
// const contractAddressRinkeby = process.env.REACT_APP_NFT_CONTRACT_ADDRESS_TCA_MEMES;
const contractAddressRinkeby = "0x0122c80b96b2114badc4181c73259f2a532af853";
const contractAddressGoerli = "0x1fb3D974c8a0c2eEE3fc9a02678FDc6ed6892539";
const contractAddressKovan = "0xEAa90d04713AF563E4BF76aEA4a814Ec0EfC34d9";
const contractAddressRopsten = "0xBaa3cedc112FDBa1427b719bfCc752e3E482eEdb";
const abi = contract;

const Mint = () => {

    const [status, setStatus] = useState("Click to start minting.");
    const [openSea, setOpenSea] = useState(null)
    const [rarible, setRarible] = useState(null)
    const [etherscan, setEtherscan] = useState(null)
    const [mintedNFT, setMintedNFT] = useState(null)
    const [mintedName, setMintedName] = useState(null)
    const [mintedDescription, setMintedDescription] = useState(null)
    const [miningStatus, setMiningStatus] = useState(null)
    const [loadingState, setLoadingState] = useState(0)
    const [txError, setTxError] = useState(null)
    const [currentAccount, setCurrentAccount] = useState('')
    const [correctNetwork, setCorrectNetwork] = useState(false)
    const [network, setNetwork] = useState('')
    const [contractAddress, setContractAddress] = useState('')

    // Checks if wallet is connected
    const checkIfWalletIsConnected = async () => {
    const { ethereum } = window
    if (ethereum) {
            console.log('Got the ethereum obejct: ', ethereum)

        const accounts = await ethereum.request({ method: 'eth_accounts' })

        if (accounts.length !== 0) {
            console.log('Found authorized Account: ', accounts[0])
            setCurrentAccount(accounts[0])
        } else {
            console.log('No authorized account found')
        }
    } else {
        console.log('No Wallet found. Connect Wallet')
    }
    }

    // Calls Metamask to connect wallet on clicking Connect Wallet button
    const connectWallet = async () => {
        try {
            const { ethereum } = window

            if (!ethereum) {
                console.log('Metamask not detected')
                return
            }
            let chainId = await ethereum.request({ method: 'eth_chainId' })
            console.log('Connected to chain:' + chainId)

            const ropstenChainId = '0x3'
            const rinkebyChainId = '0x4'
            const goerliChainId = '0x5'
            const kovanChainId = '0x2a'

            const devChainId = 1337
            const localhostChainId = `0x${Number(devChainId).toString(16)}`

            if (chainId !== rinkebyChainId && chainId !== goerliChainId && chainId !== ropstenChainId && chainId !== kovanChainId && chainId !== localhostChainId) {
                await toast('You are not connected to a supported Testnet! Use Goerli, Kovan, Ropsten or Rinkeby.');
                return
            }

            if (chainId === rinkebyChainId) {
                setCorrectNetwork(true)
                setNetwork('rinkeby')
                setContractAddress(contractAddressRinkeby);
            } else if (chainId === goerliChainId) {
                setCorrectNetwork(true)
                setNetwork('goerli')
                setContractAddress(contractAddressGoerli);
            } else if (chainId === ropstenChainId) {
                setCorrectNetwork(true)
                setNetwork('ropsten')
                setContractAddress(contractAddressRopsten);
            } else if (chainId === kovanChainId) {
                setCorrectNetwork(true)
                setNetwork('kovan')
                setContractAddress(contractAddressKovan);
            } else if (chainId === localhostChainId) {
                setCorrectNetwork(false)
                setNetwork('localhost')
            } else {
                setCorrectNetwork(false)   
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            console.log('Found account', accounts[0])
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
            toast.dismiss();
            if (error.code === '-32002') {
                await toast("Error: Request already pending, open Metamask");
            } else if (error.code === '4001') {
                await toast("Warning | " + error.message);
            } else {
                await toast("Error: " + error.message);    
            }
        }
    }

    // Checks if wallet is connected to the correct network
    const checkCorrectNetwork = async () => {

        const { ethereum } = window
        
        if (ethereum) {
            let chainId = await ethereum.request({ method: 'eth_chainId' })
            console.log('Connected to chain:' + chainId)

            const ropstenChainId = '0x3'
            const rinkebyChainId = '0x4'
            const goerliChainId = '0x5'
            const kovanChainId = '0x2a'

            const devChainId = 1337
            const localhostChainId = `0x${Number(devChainId).toString(16)}`

            if (chainId === rinkebyChainId) {
                setCorrectNetwork(true)
                setNetwork('rinkeby')
                setContractAddress(contractAddressRinkeby);
            } else if (chainId === goerliChainId) {
                setCorrectNetwork(true)
                setNetwork('goerli')
                setContractAddress(contractAddressGoerli);
            } else if (chainId === ropstenChainId) {
                setCorrectNetwork(true)
                setNetwork('ropsten')
                setContractAddress(contractAddressRopsten);
            } else if (chainId === kovanChainId) {
                setCorrectNetwork(true)
                setNetwork('kovan')
                setContractAddress(contractAddressKovan);
            } else if (chainId === localhostChainId) {
                setCorrectNetwork(true)
                setNetwork('localhost')
            } else {
                setCorrectNetwork(false)   
            }

            // if (chainId !== rinkebyChainId && chainId !== goerliChainId && chainId !== ropstenChainId && chainId !== kovanChainId && chainId !== localhostChainId) {
            //     setCorrectNetwork(false)
            // } else {
            //     setCorrectNetwork(true)
            // }

        } else {
            console.log('No Wallet found. Connect Wallet')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        checkCorrectNetwork()
    }, [])

    const mintNFT = async () => {
        try {
            const { ethereum } = window

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const nftContract = new ethers.Contract(
                    contractAddress,
                    abi,
                    signer
                )

                const settx = {
                    value: ethers.utils.parseEther("0.002"),
                    gasLimit: 221649,
                };

                setStatus("confirm in wallet...");
                console.log(contractAddress)
                console.log(abi)
                console.log(signer)
                console.log("Going to pop wallet now to pay gas...")

                let nftTx = await nftContract._mintSingleNFT(settx)
                console.log('Mining....', nftTx.hash)
                setMiningStatus(0)

                setStatus("minting...");

                let tx = await nftTx.wait()
                setLoadingState(1)
                console.log('Mined!', tx)

                let event = tx.events[0]
                console.log(event)
                let value = event.args[2]
                console.log(value)
                let tokenId = value.toNumber()
                console.log(tokenId)

                setStatus("mint successful! ID: " + tokenId);

                console.log(
                    `Mined, see transaction: https://${network}.etherscan.io/tx/${nftTx.hash}`
                )

                getMintedNFT(tokenId)

            } else {
                console.log("Ethereum object doesn't exist!")
                await toast("Error: Cannot find a browser enabled wallet.");
                setStatus("reconnect your wallet...");
                connectWallet();
            }
        } catch (error) {
            toast.dismiss();
            await toast("Error: " + error.message);
            if (error.code === '4001') {
                setStatus("You rejected the transaction. Error code: " + error.code)
            } else {
                setStatus("Unknown error, please try again. Error code: " + error.code)
            }
            console.log(error.message + error.code)
        }
    }

    const getMintedNFT = async (tokenId) => {
        try {
            const { ethereum } = window

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const nftContract = new ethers.Contract(
                    contractAddress,
                    abi,
                    signer
                )

                let tokenUri = await nftContract.tokenURI(tokenId)
                console.log(tokenUri)
                let fixTokenUri = tokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
                console.log(fixTokenUri)
                let data = await axios.get(fixTokenUri)
                console.log(data)
                let meta = data.data

                let tokenImage = meta.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")

                setMiningStatus(1)
                let dataURL = contractAddress + "/" + tokenId;
                console.log(dataURL);
                setOpenSea("https://testnets.opensea.io/assets/" + network + "/" + contractAddress + "/" + tokenId)
                setRarible("https://" + network + ".rarible.com/token/" + contractAddress + ":" + tokenId)
                setEtherscan("https://" + network + ".etherscan.io/token/" + contractAddress + "?a=" + tokenId)
                setMintedNFT(tokenImage)
                setMintedName(meta.name)
                setMintedDescription(meta.description)

            } else {
                await toast("Error: Cannot find a browser enabled wallet.");
            }
        } catch (error) {
            console.log(error)
            await toast("Error: " + error.message);
            setTxError(error.message)
        }
    }

    return (
        <div className="animated fadeIn">
            <h6>MINT AN NFT</h6>
            <br />
            <h2 className="mb10">
                memes 2000
            </h2>
            {currentAccount === '' ? (
                <>
                <button 
                    className="mb20 inp"
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
                <button 
                    className="mb20 inp"
                    onClick={mintNFT}
                >
                    Mint Meme
                </button>
                </>
            ) : correctNetwork ? (
            <>
                <button 
                    className="mb20 inp"
                    onClick={mintNFT}
                >
                    Mint
                </button>
                <br />
                <div className="status animated fadeIn">{status}</div>
            </>
            ) : (
                <div>
                    <div>Please connect to a supported Testnet</div>
                </div>
            )}

            {loadingState === 0 ? (
                miningStatus === 0 ? (
                    txError === null ? (
                        <div className="animated fadeInDown">
                            <SpinnerCircular size={35} thickness={180}  color='rgba(255, 255, 255, 1)' />
                        </div>
                    ) : (
                        <div className="animated fadeIn">{txError}</div>
                    )
                ) : (
                    <div className="empty"></div>
                )
            ) : (
                <div className="results animated fadeIn">
                    <img
                        src={mintedNFT}
                        alt=""
                        className="details animated fadeInDown"
                        height="210"
                        width="195"
                    />
                    <div className="details animated fadeInUp">
                        <h2>{mintedName}</h2>
                        <p>{mintedDescription}</p>
                        <a href={openSea} target="_blank" rel="noreferrer noopener" alt="OpenSea link"><Opensea /></a>&nbsp;&nbsp;
                        <a href={rarible} target="_blank" rel="noreferrer noopener" alt="Rarible link"><Rarible /></a>&nbsp;&nbsp;
                        <a href={etherscan} target="_blank" rel="noreferrer noopener" alt="etherscan link"><Etherscan /></a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Mint

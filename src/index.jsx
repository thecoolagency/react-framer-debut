import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { 
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    wallet,
    DisclaimerComponent,
    Theme,
    AvatarComponent,
    useAddRecentTransaction
} from '@rainbow-me/rainbowkit';
import { 
    chain,
    configureChains,
    createClient,
    WagmiConfig
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import App from './App';

function CustomAvatar({ address, ensImage, size }) {
    return (
        newFunction(size)
    );
}

const { chains, provider, webSocketProvider } = configureChains(
    [
        // chain.mainnet,
        // chain.optimismKovan,
        // chain.arbitrumRinkeby,
        // chain.polygonMumbai,
        // chain.goerli,
        chain.rinkeby,
        // chain.kovan,
        ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true'
            ? [chain.ropsten]
            : []),
    ],
    [
        infuraProvider({ infuraId: process.env.NEXT_PUBLIC_INFURA_ID }),
        alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
        publicProvider(),
    ]
);

// const { connectors } = getDefaultWallets({
//     appName: 'TCA Demo Solid',
//     chains,
// });

const connectors = connectorsForWallets([{
    appName: 'TCA Demo Solid',
    groupName: 'Recommended',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.metaMask({ chains }),
      wallet.coinbase({ appName: 'PMF App', chains }),
      wallet.walletConnect({ appName: 'PMF App', chains }),
      wallet.argent({ appName: 'PMF App', chains }),
      wallet.brave({ appName: 'PMF App', chains }),
      wallet.ledger({ appName: 'PMF App', chains }),
      wallet.trust({ appName: 'PMF App', chains }),
      wallet.steak({ appName: 'PMF App', chains }),
      wallet.imToken({ appName: 'PMF App', chains }),
    ],
  },
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

const TCATheme = {
    colors: {
        accentColor: 'white', // get a wallet background color
        accentColorForeground: 'none', // get a wallet button text
        actionButtonBorder: 'none', // get a wallet button border
        actionButtonBorderMobile: 'none',  // button border color on mobile
        actionButtonSecondaryBackground: 'none', // button on modal > get a wallet
        closeButton: 'none', 
        closeButtonBackground: 'none',
        connectButtonBackground: 'none',
        connectButtonBackgroundError: 'none',
        connectButtonInnerBackground: 'none',
        connectButtonText: 'white',
        connectButtonTextError: 'none',
        connectionIndicator: 'none',
        error: 'none',
        generalBorder: 'none',
        generalBorderDim: 'none',
        menuItemBackground: 'none',
        modalBackdrop: 'none',
        modalBackground: 'none',
        modalBorder: 'none',
        modalText: 'white', // text
        modalTextDim: 'none',
        modalTextSecondary: 'none', // text
        profileAction: 'none',
        profileActionHover: 'none',
        profileForeground: 'none',
        selectedOptionBorder: 'none',
        standby: 'none'
    },
    fonts: {
        body: 'Helvetica',
    },
    radii: {
        actionButton: 'none',
        connectButton: 'none',
        menuButton: 'none',
        modal: 'none',
        modalMobile: 'none',
    },
    shadows: {
        connectButton: 'none',
        dialog: 'none',
        profileDetailsAction: 'none',
        selectedOption: 'none',
        selectedWallet: 'none',
        walletLogo: 'none',
    },
    blurs: {
        modalOverlay: ''
    }
};

root.render(
    <React.StrictMode>
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider avatar={CustomAvatar} chains={chains} theme={TCATheme}>
                <App />
            </RainbowKitProvider>
        </WagmiConfig>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function newFunction(size) {
    return <img
        src="/logo192.png"
        width={size}
        height={size}
        style={{ borderRadius: 999 }} />;
}


import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Connect from './components/Connect';

import Header from "./components/Header";
import Nav from "./components/Nav";

import BGClear from "./components/vectors/BGClear";

import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

export const magic = new Magic("pk_live_172168EE20739749", {
  extensions: [new OAuthExtension()],
});

const Test = () => {

  const [email, setEmail] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const [txHash, setTxHash] = useState("");
  const [sendingTransaction, setSendingTransaction] = useState(false);

  useEffect(() => {
    magic.user.isLoggedIn().then(async (magicIsLoggedIn) => {
      setIsLoggedIn(magicIsLoggedIn);
      if (magicIsLoggedIn) {
        const metadata = await magic.user.getMetadata();
        setPublicAddress(metadata.publicAddress);
        setUserMetadata(metadata);
      }
    });
  }, [isLoggedIn]);

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
  };

  let client = null;
  async function setupClient() {
    if( client == null){
      const token = {
        "x-api-key": "10f233c1b6dec945648e2ac830913549349a1742c865b940bd1fdf2fc6b98b60"
      };
      const server = "https://tcamagic.herokuapp.com/";
    } else {
      return client;
    }
    return client;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.target;

    const did = await new Magic(
      process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
    ).auth.loginWithMagicLink({ email: elements.email.value });

    // Once we have the token from magic,
    // update our own database
    // const authRequest = await fetch()

    // if (authRequest.ok) {
    // We successfully logged in, our API
    // set authorization cookies and now we
    // can redirect to the dashboard!
    // router.push('/dashboard')
    // } else { /* handle errors */ }
  };

  return (
    <form onSubmit={handleSubmit} className="MagicForm">
      <label htmlFor="email">Email</label>
      <input name="email" type="email" />
      <button>Log in</button>
    </form>
  );
}
export default Test
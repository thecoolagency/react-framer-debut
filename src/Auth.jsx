import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

export const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
    extensions: [new OAuthExtension()],
});

const Auth = () => {

    const [publicAddress, setPublicAddress] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMetadata, setUserMetadata] = useState({});

    // listen and check for logged in status
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

    // url to redirect user when auth link is clicked
    let redirectURI = window.location.protocol + "//" + window.location.hostname + '/profile';

    // initialize
    let client = null;
    async function setupClient() {
        if (client == null) {
            const token = {
                "x-api-key": process.env.REACT_APP_MAGIC_API_KEY
            };
            const server = process.env.REACT_APP_SERVER_URL;
        } else {
            return client;
        }
        return client;
    }

    // handle form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { elements } = event.target;

        try {
        const did = await new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,).auth.loginWithMagicLink({ 
            email: elements.email.value,
            // showUI: false
            redirectURI
        });
        } catch (err) {
            alert(err.code)
        }
    };

    // handle logout button
    const logout = async () => {
        await magic.user.logout();
        setIsLoggedIn(false);
    };

    return (
        <motion.div
            className="margins"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
        >
            <h2>Profile</h2>
            { isLoggedIn ? 
                <div>
                    <p>Welcome</p> 
                    <div>Email address:{userMetadata.email}</div> 
                    <div>Public address: {userMetadata.publicAddress}</div> 
                    <button onClick={()=>{logout()}}>logout</button>
                </div> 
            : 
                <form onSubmit={handleSubmit} className="MagicForm">
                    <p>You are not logged in. Use the form below to login.</p> 
                    <input name="email" type="email" placeholder="Email" />
                    <button>Log in</button>
                    <button onClick={()=>{logout()}}>logout</button>
                </form>
            }
        </motion.div>

    );
}
export default Auth
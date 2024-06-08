// This static route has priority over the Dynamic [username] route.
import { auth, googleAuthProvider, signInWithPopup  } from '@/lib/firebase';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';

export default function Enter(props) {
    // Need to know user's auth context to determine which components to show.
    const { user, username } = useContext(UserContext);

    // States
    // 1. user signed out <SignInButton />
    // 2. user signed in, but missing username <UsernameForm />
    // 3. user signed in, has username <SignOutButton />
    return (
        <main>
        {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
      </main>
      );
    }

// Sign in with Google Button
function SignInButton() {
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
            console.log("Signed in successfully");
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={'/google.png'} />Sign in with Google
        </button>
    );
}

// Sight out button - removes the json webtoken stored in the browser.
// This token manages the authentication state on the front-end. 
function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
  }

// Username Form selection
function UsernameForm() {
    return null;
}
// This static route has priority over the Dynamic [username] route.
import { auth, firestore, googleAuthProvider, signInWithPopup  } from '@/lib/firebase';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/lib/context';
import { doc } from 'firebase/firestore';

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
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, isLoading] = useState(false);

    const { user, username } = useContext(UserContext);

        // Listen to the form, everytime it changes, execute a read to the database
        useEffect(() => {
            checkUsername(formValue);
    
        }, [formValue]);

    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        // Passes regex - Loading will be checking the db asynchronous
        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    // Check the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = async (username) => {
        if (username.length >= 3) {
            const ref = doc(firestore, `usernames/${username}`);
            const { exists } = await ref.get();
        }
    }


    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>

                    <input name="username" placeholder="username" value={formValue} onChange={onChange} />

                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Choose
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    );
}
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useUserData() {
    // Hook for listening to firestore doc
    // need to have user object before making a reference to a firestore doc
    // Fetch the user doc from firestore
    const [user] = useAuthState(auth);
    const [username, setUserName] = useState(null);

    // Listen for changes to the user object - when the object changes - fetch a new doc 
    // from firestore database
    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        // make a reference to the document that matches the users id
        if (user) {
        const ref = doc(firestore, 'users', user.uid);
        // returns a function to unsubsribe from the data
        unsubscribe = onSnapshot(ref, (doc) => { // Callback that provides latest doc information from db
            setUserName(doc.data()?.username);    // Whenever doc updates, this callback will run with latest data
        }); // When we get that data - we set the username on the component
        } else {
        setUserName(null);
        }

        // Call unsubscribe when the user document is no longer needed
        return unsubscribe;
    }, [user]);

    return { user, username };
}
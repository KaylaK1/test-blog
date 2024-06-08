import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { auth } from "@/lib/firebase";
import { Router } from "next/router";

// Top navbar
export default function Navbar() {

    // Any components that depend on these values will rerender anytime the user or username changes.
    // So the ui will rerender whenever the user logs in or logs out.
    const { user, username } = useContext(UserContext);
    
    const router = useRouter();

    const signOut = () => {
        auth.signOut;
        router.reload();
    }
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>
                {/* user is signed in and has username */ }
                {username && (
                    <>
                        <li className="push-left">
                            <button>Sign Out</button>
                        </li>
                        <li className="push-left">
                            <Link href="/admin">
                                <button className="btn-blue">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} />
                            </Link>
                        </li>
                    </>
                )}

                {/* user is not signed OR has not created username */}
                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}
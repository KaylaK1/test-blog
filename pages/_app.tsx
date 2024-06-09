// Main entry point for any page in application 
// wrapper or layout for all pages
// use to add components to all pages or manage authentication 
import "@/styles/globals.css";
import Navbar from "@/components/NavBar";
import { Toaster } from 'react-hot-toast';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';


export default function App({ Component, pageProps }) {

  // Call within the Component Body to use custom hook
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>   
  );
}

// Main entry point for any page in application 
// wrapper or layout for all pages
// use to add components to all pages or manage authentication 
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

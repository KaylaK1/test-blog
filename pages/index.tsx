import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';
import Loader from '@/components/Loader';

// Link can just be an href string
// Or can be explicit for the path and the query to perform
// prefetch tells Next to load the linked page in the background
// lookup: LinkPrefetching
export default function Home() {
  return (
    <div>
      <Loader show />
      Homepage
    </div>
  );
}

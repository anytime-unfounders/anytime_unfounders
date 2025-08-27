import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return <Component {...pageProps} key={router.asPath} />;
}

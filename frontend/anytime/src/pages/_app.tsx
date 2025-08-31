import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Bg from "../../components/Bg"; // <-- Import Bg

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* <Bg /> */}
      <Component {...pageProps} key={router.asPath} />
    </div>
  );
}

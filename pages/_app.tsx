import '../styles/globals.css'
import '../styles/ol.css';
import "../styles/Unmined.css"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

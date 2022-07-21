import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
//
import { UserLayout } from '../components/layouts/UserLayout';
import { ContextProvider } from "../context/Store";
import type { AppProps } from 'next/app';
import { WordleContextProvider } from '../context/WordleContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <WordleContextProvider>
        <UserLayout>
          <Component {...pageProps} />
        </UserLayout>
      </WordleContextProvider>  
    </ContextProvider>
  )
}

export default MyApp;


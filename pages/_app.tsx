import '../styles/reset.css';
import 'reflect-metadata';
import '../styles/globals.css';
import '../styles/public.css';
import { AppWrapper } from 'src/context/state';

interface MyAppProps {
  pageProps: object;
  Component: React.ComponentType;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;

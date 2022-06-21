import 'reflect-metadata';
import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/public.css';

interface MyAppProps {
  pageProps: object;
  Component: React.ComponentType;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

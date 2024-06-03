import { ToastContainer } from 'react-toastify';
import FormProvider from '../services/context';
import localFont from 'next/font/local';
import '../styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SquadProvider } from '../context/SquadContext';
import TeamCreationProvider from '../context/TeamContext';
import UserProvider from '../context/UserContext';
import Script from 'next/script';

const futuraBook = localFont({ src: '../public/assets/fonts/futura-book.ttf' });

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <FormProvider>
        <TeamCreationProvider>
          <SquadProvider>
            <ToastContainer />
            <Script
              src="https://cloud.umami.is/script.js"
              data-website-id="47f28678-a24c-45b2-a892-d64f3ec9869e"
              strategy="afterInteractive"
              onLoad={() => console.log('Umami script loaded successfully')}
              onError={(e) => console.error('Umami script failed to load', e)}
            />
            <main className={futuraBook.className}>
              <Component {...pageProps} />
            </main>
          </SquadProvider>
        </TeamCreationProvider>
      </FormProvider>
    </UserProvider>
  );
}

export default MyApp;

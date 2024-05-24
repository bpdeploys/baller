import Head from 'next/head';
import { useRouter } from 'next/router';
import { Capacitor } from '@capacitor/core';
import { Camera } from '@capacitor/camera';
import { useEffect, useContext, useState } from 'react';

// Context
import { UserContext } from '../context/UserContext';

// Components
import ScreenWrapper from '../components/Layout/ScreenWrapper';
import Button from '../components/Common/Button';

// Styles
import styles from './index.module.scss';
import ScreenLoading from '../components/Common/LoadingScreen';

const requestPermissions = async () => {
  try {
    const cameraPermissions = await Camera.requestPermissions();
    if (cameraPermissions.photos !== 'granted') {
      console.error('Permission denied to access camera');
    }
  } catch (error) {
    console.error('Failed to request permissions', error);
  }
};

export default function Home() {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const permissionsRequested = localStorage.getItem('permissionsRequested');
      if (!permissionsRequested) {
        requestPermissions().then(() => {
          localStorage.setItem('permissionsRequested', 'true');
        });
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      router.push('/homewall');
    } else {
      setIsCheckingAuth(false);
    }
  }, [userData]);

  if (isCheckingAuth) {
    return <ScreenLoading />;
  }

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="blue" image="blueLightningFull">
        <section className={styles.home}>
          <div className={styles.home__logo}>
            <img
              src="/assets/imgs/home-logo.png"
              alt="Baller Logo"
              width={89}
              height={89}
            />
            <div className={styles.home__headings}>
              <h1>BallerProfile</h1>
              <h2>Baller App</h2>
            </div>
          </div>
          <div className={styles.home__buttons}>
            <Button
              text="Sign Up"
              size="small"
              customClassName={styles.home__button}
              color="white"
              href="/register"
            />
            <span className={styles.home__or}>Already have an account?</span>
            <Button
              text="Login"
              size="small"
              customClassName={styles.home__button}
              color="blue"
              href="/login"
            />
          </div>
        </section>
      </ScreenWrapper>
    </>
  );
}

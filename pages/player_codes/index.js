import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import CodesTable from '../../components/Squad/CodesTable';

// Context
import { useUserData } from '../../context/UserContext';

// API
import { getProxyCodes } from '../../services/api';

// Hooks
import { useLoading } from '../../utils/hooks/useLoading';
import { useHasMounted } from '../../utils/hooks/useHasMounted';

// Styles
import styles from './playercodes.module.scss';
import { useRouter } from 'next/router';
import ScreenLoading from '../../components/Common/LoadingScreen';

export default function PlayerCodes() {
  const router = useRouter();
  const { userData } = useUserData();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const hasMounted = useHasMounted();
  const [proxyCodes, setProxyCodes] = useState([]);

  useEffect(() => {
    startLoading();
    const teamId = userData?.team?.id;
    getProxyCodes(teamId)
      .then((data) => {
        setProxyCodes(data);
        stopLoading();
      })
      .catch((error) => {
        stopLoading();
        toast.error('There was an error loading your squad codes');
      });
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/select_league');
  };

  const handleShare = async () => {
    if (!hasMounted) {
      return;
    }
    const element = document.querySelector(`.${styles.playerCodes}`);

    if (Capacitor.isNativePlatform()) {
      try {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL('image/png'); // Full data URL

        const base64Data = image.split(',')[1];
        const fileName = `screenshot-${Date.now()}.png`;

        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents,
          encoding: Encoding.Base64,
        });

        // Convert file path to web-friendly URL
        const fixedPhotoUri = Capacitor.convertFileSrc(result.uri);
        toast.success('Screenshot saved to gallery', fixedPhotoUri);
      } catch (error) {
        console.log(error);
        toast.error('Error taking screenshot');
      }
    } else {
      // Use html2canvas for browser
      html2canvas(element)
        .then((canvas) => {
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = 'team-codes.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error taking screenshot');
        });
    }
  };

  const playersData = proxyCodes?.players?.map((player) => ({
    id: player.id,
    firstName: player.proxy_name,
    lastName: player.proxy_surname,
    code: player.player_code,
  }));

  if (isLoading || !userData || !hasMounted) {
    return <ScreenLoading />;
  }

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper image="grayLightningFull">
        <Header text="Player Codes" textTransform="uppercase" />
        <div className={styles.playerCodes}>
          <div className={styles.playerCodes__headings}>
            <h2>SEND TO TEAMMATES</h2>
            <h1>Take a screenshot and send to your teams WHATSAPP GROUP!</h1>
          </div>
          <div className={styles.playerCodes__tableWrapper}>
            <CodesTable data={playersData} />
          </div>
          <div className={styles.playerCodes__button}>
            <Button
              text="Share"
              color="green"
              uppercase
              onClick={handleShare}
              customClassName={styles.playerCodes__shareButton}
            />
            <Button
              text="Done"
              color="transparent"
              uppercase
              onClick={handleSubmit}
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}

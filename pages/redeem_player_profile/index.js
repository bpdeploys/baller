import Head from 'next/head';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import HeaderButtons from '../../components/Layout/HeaderButtons';

// Styles
import styles from './redeemplayerprofile.module.scss';
import VerificationInput from 'react-verification-input';
import { useFormData } from '../../services/context';
import { redeemProxyPlayer } from '../../services/api';
import { useLoading } from '../../utils/hooks/useLoading';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function RedeemPlayerProfile() {
  const { data } = useFormData();
  const router = useRouter();
  const [playerCode, setPlayerCode] = useState('');

  console.log(data, 'DATA FROM CODE PAGE');

  const {
    isLoading: isLoadingSubmit,
    startLoading: startLoadingSubmit,
    stopLoading: stopLoadingSubmit,
  } = useLoading();

  const links = [
    { href: '/redeem_player_profile', text: 'Redeem Account' },
    { href: '/create_player_profile', text: 'Create Account' },
  ];

  const handleCodeChange = (value) => {
    const uppercaseValue = value.toUpperCase();
    console.log(uppercaseValue); // You can remove this log in production
    setPlayerCode(uppercaseValue);
  };

  const onSubmit = async (values) => {
    // setFormValues(values);

    const playerProfile = {
      first_name: data?.firstName,
      last_name: data?.lastName,
      email: data?.email,
      password: data?.password,
      type: data?.type,
      gender: data?.gender,
      sport: data?.sport,
      player_code: playerCode,
    };

    console.log('PROFILE', playerProfile);
    startLoadingSubmit();
    try {
      const response = await redeemProxyPlayer(playerProfile);
      if (response.token) {
        // Authentication and routing logic here
        localStorage.setItem('token', response.token);
        router.push('/create_team');
      } else {
        toast.error('Redeem failed. Please check your code.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      stopLoadingSubmit();
    }
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <HeaderButtons text="Player Profile" links={links} active="1" />
        <div className={styles.redeemPlayerProfile}>
          <div className={styles.redeemPlayerProfile__inputs}>
            <h1>
              Type the code Player Code below to redeem your pre-made account!
            </h1>
            <VerificationInput
              placeholder=""
              length={4}
              classNames={{
                container: styles.verificationContainer,
                character: styles.verificationContainer__character,
                characterInactive:
                  styles.verificationContainer__characterInactive,
                characterSelected:
                  styles.verificationContainer__characterSelected,
              }}
              onChange={handleCodeChange}
            />
          </div>
          <div className={styles.redeemPlayerProfile__button}>
            <Button
              text="Create Profile"
              color="blue"
              uppercase
              type="submit"
              onClick={onSubmit}
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import constants from '../../utils/data/constants';
import Dropdown from '../../components/Common/Dropdown';

// API
import { updateCaptainSquadNumber } from '../../services/api';

// Context
import { useUserData } from '../../context/UserContext';

// Hooks
import { useHasMounted } from '../../utils/hooks/useHasMounted';

// Styles
import styles from './selectsquadnumber.module.scss';

export default function SelectSquadNumber() {
  const hasMounted = useHasMounted();
  const { userData, updateUserData } = useUserData();
  const [selectedNumber, setSelectedNumber] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedNumber === null) {
      toast.error('Please select a squad number');
      return;
    }

    try {
      const request = await updateCaptainSquadNumber(
        userData?.team?.captain?.id,
        {
          squad_number: parseInt(selectedNumber),
        }
      );
      if (request) {
        toast.success('Squad number updated successfully');
        updateUserData({ captain_squad_number: selectedNumber });
        router.push('/create_squad');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sampleData = {
    playingPosition: 'F',
    squadNumber: selectedNumber || '10',
  };

  if (!userData || !hasMounted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header
          text={`Hi ${userData?.first_name}`}
          textTransform="capitalize"
        />
        <div className={styles.selectSquadNumber}>
          <Dropdown
            name="squadNumber"
            placeholder="Select your Squad Number"
            items={constants.SQUAD_NUMBERS}
            onChange={(e) => setSelectedNumber(e.target.value)}
          />
          <div className={styles.selectSquadNumber__shirt}>
            <RedeemPlayerShirt data={sampleData} size="big" captain />
            <div className={styles.selectSquadNumber__info}>
              <span>Captain of</span>
              <h2>{userData?.team?.team_name}</h2>
            </div>
          </div>
          <div className={styles.selectSquadNumber__button}>
            <Button text="DONE" color="blue" uppercase onClick={handleSubmit} />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}

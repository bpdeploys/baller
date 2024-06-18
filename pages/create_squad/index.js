import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

// Context
import { useContext, useState, useEffect } from 'react';
import { SquadContext } from '../../context/SquadContext';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import SquadCreationTutorial from '../../components/Squad/TutorialModal';
import CurrentPlayer from '../../components/Squad/CurrentPlayer';
import SquadPlayer from '../../components/Squad/SquadPlayer';

// Styles
import styles from './createsquad.module.scss';

// API
import { createProxyPlayerSquad } from '../../services/api';

// Context
import { useUserData } from '../../context/UserContext';

// Utils
import { getRandomNumber } from '../../utils/functions';
import useLocalStorageState from '../../utils/hooks/useLocalStorageState';
import { useLoading } from '../../utils/hooks/useLoading';
import ScreenLoading from '../../components/Common/LoadingScreen';

export default function CreateSquad() {
  const router = useRouter();
  const { squadList, setSquad } = useContext(SquadContext);
  const { userData } = useUserData();
  const [isClient, setIsClient] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useLocalStorageState(
    'tutorialCompleted',
    false
  );
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (squadList.length === 0) {
      const storedBackup = localStorage.getItem('squadListBackup');
      if (storedBackup) {
        const backupSquad = JSON.parse(storedBackup);
        setSquad(backupSquad);
        localStorage.removeItem('squadListBackup');
      }
    }
  }, [squadList, setSquad]);

  const onSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    // Use Set to track unique squadNumbers
    const uniqueSquadNumbers = new Set();
    const transformedPlayers = squadList.reduce((acc, player) => {
      // Check if squadNumber is already processed
      if (!uniqueSquadNumbers.has(player.squadNumber)) {
        uniqueSquadNumbers.add(player.squadNumber);
        acc.push({
          proxy_name: player.firstName,
          proxy_surname: player.lastName,
          phone_number: player.phoneNumber,
          squad_number: player.squadNumber,
          email: `${player.firstName}${
            player.lastName
          }${getRandomNumber()}@bp.com`,
          team_id: userData?.team?.id,
          playing_position: player.playingPosition,
        });
      }
      return acc;
    }, []);

    const payload = {
      team_id: userData?.team?.id,
      players: transformedPlayers,
    };

    try {
      await createProxyPlayerSquad(payload);
      toast.success('Your squad has been created!');
      router.push('/player_codes');
    } catch (error) {
      stopLoading();

      if (error.response) {
        // Server responded with a status other than 2xx
        switch (error.response.status) {
          case 400:
            toast.error(
              'Bad request. Please check the squad data and try again.'
            );
            break;
          case 401:
            toast.error('Unauthorized. Please log in and try again.');
            break;
          case 403:
            toast.error(
              'Forbidden. You do not have permission to create this squad.'
            );
            break;
          case 404:
            toast.error('API endpoint not found.');
            break;
          case 500:
            toast.error('Internal server error. Please try again later.');
            break;
          default:
            toast.error('An unexpected error occurred.');
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error(
          'No response from the server. Please check your network connection.'
        );
      } else {
        // Something else caused the error
        toast.error(`Error: ${error.message}`);
      }

      if (error.message === 'The request timed out') {
        localStorage.setItem('squadListBackup', JSON.stringify(squadList));
        toast.error(
          'Request timed out. Your squad data has been saved locally. Please try again later.'
        );
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      stopLoading();
    }
  };

  const onCurrentPlayerUpdate = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    setTutorialCompleted(true);
    router.push('/edit_squad_number');
  };

  if (!isClient) {
    return <ScreenLoading />;
  }

  const captainInfo = {
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    squadNumber: userData?.captain_squad_number,
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      {!tutorialCompleted && <SquadCreationTutorial />}
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Create your Squad" textTransform="uppercase" />
        <div className={styles.createSquad}>
          <h1>Create a squad of players to join your team.</h1>
          <div className={styles.createSquad__squadPlayers}>
            <CurrentPlayer
              data={captainInfo}
              onClick={onCurrentPlayerUpdate}
              captain
            />
            {squadList
              .map((player, key) => (
                <SquadPlayer key={player.id + key} data={player} />
              ))
              .concat(
                Array.from(
                  { length: Math.max(0, 11 - squadList.length) },
                  (_, index) => (
                    <SquadPlayer
                      key={`empty-${index}`}
                      empty
                      disabled={!tutorialCompleted}
                    />
                  )
                )
              )}
          </div>
          <div
            className={styles.createSquad__button}
            style={{
              filter: !tutorialCompleted ? 'blur(2px)' : 'none',
            }}
          >
            <Button
              text="Create Squad"
              color="blue"
              uppercase
              onClick={onSubmit}
              loading={isLoading}
              disabled={
                !tutorialCompleted ||
                squadList.length < 3 ||
                squadList.length > 11 ||
                isLoading
              }
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}

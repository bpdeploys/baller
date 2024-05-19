import { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import LeagueSelectionBox from '../../components/SportsProvider/LeagueSelectionBox';

// Styles
import styles from './selectsportsprovider.module.scss';

// API
import { getAllLeaguesByVenue, updateLeague } from '../../services/api';

// Hooks
import { useLoading } from '../../utils/hooks/useLoading';

// Context
import { useUserData } from '../../context/UserContext';
import { useRouter } from 'next/router';
import ScreenLoading from '../../components/Common/LoadingScreen';

export default function SelectLeague() {
  const { userData, updateUserData } = useUserData();
  const router = useRouter();

  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leaguesList, setLeaguesList] = useState([]);

  const {
    isLoading: isLoadingProviders,
    startLoading: startLoadingProviders,
    stopLoading: stopLoadingProviders,
  } = useLoading();

  const {
    isLoading: isLoadingSubmit,
    startLoading: startLoadingSubmit,
    stopLoading: stopLoadingSubmit,
  } = useLoading();

  const isAnyLeagueSelected = selectedLeague !== null;

  useEffect(() => {
    const fetchSportsProviders = async () => {
      try {
        startLoadingProviders(); // Start loading
        const leagues = await getAllLeaguesByVenue(userData?.team?.venue);
        setLeaguesList(leagues);
      } catch (error) {
        console.error('Error fetching sports providers:', error);
      } finally {
        stopLoadingProviders();
      }
    };

    fetchSportsProviders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leagueInfo = {
      league: selectedLeague?.id,
    };

    startLoadingSubmit();

    try {
      const request = await updateLeague(userData?.team?.id, leagueInfo);
      if (request) {
        toast.success(
          `Your team succesfully joined ${selectedLeague.league_name}`
        );
        if (!userData?.league?.id) {
          updateUserData({ league: request });
        }
        router.push('/player_profile');
      }
      // router.push('/create_squad');
    } catch (error) {
      toast.error(error.message);
      router.push('/player_profile'); // remove for prod
    } finally {
      stopLoadingSubmit();
    }
  };

  const handleselectedLeague = (item) => {
    setSelectedLeague(item);
  };

  if (isLoadingProviders) {
    return <ScreenLoading />;
  }

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightning" positionY="450px">
        <div className={styles.providersWrapper}>
          <h1>Join a League</h1>
          <div className={styles.providers}>
            {leaguesList.map((league) => (
              <LeagueSelectionBox
                league={league}
                selected={selectedLeague === league}
                deselect={() => setSelectedLeague(null)}
                onClick={() => handleselectedLeague(league)}
                isAnyLeagueSelected={isAnyLeagueSelected}
              />
            ))}
          </div>
          <div className={styles.providers__button}>
            <Button
              text="Confirm entry"
              color={selectedLeague ? 'blue' : 'gray'}
              onClick={handleSubmit}
              disabled={!selectedLeague || isLoadingSubmit}
              loading={isLoadingSubmit}
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}

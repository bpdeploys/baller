import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './selectsportsprovider.module.scss';
// API
import { getAllLeaguesByVenue, updateLeague } from '../../services/api';

// Context
import { useCreateTeamFormData } from '../../context/TeamContext';
import { useLoading } from '../../utils/hooks/useLoading';
import { useUserData } from '../../context/UserContext';
import LeagueSelectionBox from '../../components/SportsProvider/LeagueSelectionBox';
import { toast } from 'react-toastify';

export default function SelectLeague() {
  const router = useRouter();
  const { setCreateTeamFormValues } = useCreateTeamFormData();
  const { userData, updateUserData } = useUserData();

  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leaguesList, setLeaguesList] = useState([]);

  const { isLoading, startLoading, stopLoading } = useLoading();

  const isAnyLeagueSelected = selectedLeague !== null;

  useEffect(() => {
    const fetchSportsProviders = async () => {
      try {
        startLoading(); // Start loading
        const leagues = await getAllLeaguesByVenue(userData?.team?.venue);
        setLeaguesList(leagues);
        stopLoading(); // Stop loading after data is fetched
      } catch (error) {
        console.error('Error fetching sports providers:', error);
        stopLoading(); // Stop loading in case of error
      }
    };

    fetchSportsProviders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leagueInfo = {
      league: selectedLeague?.id,
    };

    try {
      const request = await updateLeague(userData?.team?.id, leagueInfo);
      if (request) {
        toast.success(`Your team succesfully joined ${selectedLeague.name}`);
        if (!userData?.league?.id) {
          updateUserData({ league: request });
        }
      }
      // router.push('/create_squad');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleselectedLeague = (item) => {
    setSelectedLeague(item);
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
              disabled={!selectedLeague}
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}

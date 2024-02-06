import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './teamprofile.module.scss';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import { useEffect, useState } from 'react';
import { getProxyData } from '../../services/api';
import { toast } from 'react-toastify';
import { useUserData } from '../../context/UserContext';
import { useLoading } from '../../utils/hooks/useLoading';
import { useHasMounted } from '../../utils/hooks/useHasMounted';
import ProfileHeader from '../../components/PlayerProfile/Header';
import StatsItem from '../../components/PlayerProfile/SingleStat';
import TeamHero from '../../components/TeamProfile/Hero';
import FixtureBox from '../../components/TeamProfile/FixtureBox';
import TeamBox from '../../components/TeamProfile/TeamBox';
import SquadList from '../../components/TeamProfile/SquadList';
import Form from '../../components/TeamProfile/Form';
import StatsList from '../../components/TeamProfile/StatsBox';

export default function PlayerProfile() {
  const router = useRouter();
  const { userData, updateUserData } = useUserData();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const hasMounted = useHasMounted();

  const players = [
    {
      name: 'Dimitri Gbo',
      position: 'Midfielder',
      status: 'verified',
      captain: true,
    },
    {
      name: 'Lionel Messi',
      position: 'Striker',
      status: 'verified',
    },
    {
      name: 'Diogo Jota',
      position: 'Midfielder',
      status: 'verified',
    },
    {
      name: 'Andress Iniesta',
      position: 'Defender',
      status: 'verified',
    },
    {
      name: 'Didier Drogba',
      position: 'Goalkeeper',
      status: 'verified',
    },
    {
      name: 'Didier Drogba',
      status: 'not_redeemed',
    },
    {
      name: 'Didier Drogba',
      status: 'not_redeemed',
    },
  ];

  const forms = [
    {
      team: 'Arsenal',
      points: 33,
      data: {
        'Games played': 4,
        'Goals scored': 5,
        'Clean Sheets': 2,
        Conceded: 3,
      },
    },
  ];

  const matchStatistics = [
    { stat: 'Games played', value: 54 },
    { stat: 'Won', value: 54 },
    { stat: 'Lost', value: 54 },
    { stat: 'Drawn', value: 54 },
    { stat: 'Goalless games', value: 54 },
    { stat: 'Wins after going behind', value: 54 },
    { stat: 'Draws after going behind', value: 54 },
    { stat: 'Loss after going ahead', value: 54 }
  ];
  
  const teamsPlayed = [
    { team: 'Arsenal', timesPlayed: 7 },
    { team: 'Tottenham', timesPlayed: 5 },
    { team: 'Liverpool', timesPlayed: 6 },
    { team: 'Man City', timesPlayed: 4 }
  ];
  
  const topScorers = [
    { player: 'Mane', goals: 7 },
    { player: 'Gabriel', goals: 5 },
    { player: 'Haaland', goals: 6 },
    { player: 'Kane', goals: 4 }
  ];
  

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <div>
        <ProfileHeader />
        <TeamHero />
        <div className={styles.matchesWrapper}>
          <Form forms={forms} />
        </div>
        <div className={styles.matchesWrapper}>
          <h2>Upcoming Fixtures</h2>
          <FixtureBox />
        </div>
        <div className={styles.matchesWrapper}>
          <h2>Team Overview</h2>
          <TeamBox />
        </div>
        <SquadList
          title="Players you follow"
          players={players}
          style={{ marginTop: '40px' }}
        />
        <StatsList matchStatistics={matchStatistics} teamsPlayed={teamsPlayed} topScorers={topScorers}/>
      </div>
    </>
  );
}

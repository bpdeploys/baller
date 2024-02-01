import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './playerprofile.module.scss';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import { useEffect, useState } from 'react';
import { getProxyData } from '../../services/api';
import { toast } from 'react-toastify';
import { useUserData } from '../../context/UserContext';
import { useLoading } from '../../utils/hooks/useLoading';
import { useHasMounted } from '../../utils/hooks/useHasMounted';
import ProfileHeader from '../../components/PlayerProfile/Header';
import ProfileHero from '../../components/PlayerProfile/Hero';
import ProfileNavButtons from '../../components/PlayerProfile/NavButtons';
import StatsDisplay from '../../components/PlayerProfile/StatsDisplay';
import MatchCard from '../../components/PlayerProfile/MatchCard';
import StatsList from '../../components/PlayerProfile/StatsList';
import ProfileDivider from '../../components/PlayerProfile/Divider';
import StatsItem from '../../components/PlayerProfile/SingleStat';

export default function PlayerProfile() {
  const router = useRouter();
  const { userData, updateUserData } = useUserData();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const hasMounted = useHasMounted();

  const [activeTab, setActiveTab] = useState('stats');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const stats = [
    { title: 'Average Points last 5 games', value: '6.3' },
    { title: 'Average Points last 3 games', value: '10.5' },
    { title: 'Points expected next game', value: '7' },
  ];

  const matches = [
    {
      opponent: 'Arsenal',
      date: '17/10/23',
      type: 'League',
      competition: 'Up',
    },
    {
      opponent: 'Chelsea',
      date: '24/10/23',
      type: 'League',
      competition: 'Down',
    },
    {
      opponent: 'Liverpool',
      date: '31/10/23',
      type: 'League',
      competition: 'Mid',
    },
  ];

  const attackingStats = [
    { label: 'Starting Lineup', value: 10 },
    { label: 'Games Missed', value: 10 },
    { label: 'Man of the Match', value: 10 },
  ];

  const attackingStatsRest = [
    { label: 'First half goals', value: 10 },
    { label: 'Second half goals', value: 10 },
    { label: 'Opening goals', value: 10 },
    { label: 'Equalisers', value: 10 },
    { label: 'Consolation', value: 10 },
    { label: 'Hattricks', value: 10 },
    { label: 'Braces', value: 10 },
    { label: 'Long distance', value: 10 },
    { label: 'Penalties', value: 10 },
    { label: 'Freekicks scored', value: 10 },
    { label: 'Tap-ins', value: 10 },
    { label: 'Individual Goals', value: 10 },
    { label: 'Assisted Goals', value: 10 },
    { label: 'Games scored in', value: 10 },
    { label: 'Games not scored in', value: 10 },
    { label: 'Goal per game ratio', value: '0.75' },
  ];

  const otherStats = [
    { label: 'Starting Lineup', value: 10 },
    { label: 'Games Missed', value: 10 },
    { label: 'Man of the Match', value: 10 },
    { label: 'Fouls Drawn', value: 10 },
    { label: 'Fouls Committed', value: 10 },
    { label: 'Goals disallowed', value: 10 },
    { label: 'Own Goals', value: 10 },
    { label: 'Yellow cards', value: 10 },
    { label: 'Red cards', value: 10 },
  ];

  const oppositionScoredAgainst = [
    { label: 'Tottenham', value: 2 },
    { label: 'Arsenal', value: 2 },
    { label: 'Man City', value: 2 },
    { label: 'Liverpool', value: 2 },
  ];

  const playersAssisted = [
    { label: 'Messi. L', value: 2 },
    { label: 'Benzema. K', value: 2 },
    { label: 'Mbappe. K', value: 2 },
    { label: 'Toure. Y', value: 2 },
  ];

  const playersHasAssisted = [
    { label: 'Tottenham', value: 2 },
    { label: 'Arsenal', value: 2 },
    { label: 'Man City', value: 2 },
    { label: 'Liverpool', value: 2 },
  ];

  const additionalStats = (
    <>
      {attackingStatsRest.map((stat, index) => (
        <StatsItem key={index} label={stat.label} value={stat.value} />
      ))}
      <div className={styles.goalLocations}>
        <img
          src="/assets/imgs/svgs/profileGoalLocations.svg"
          alt="Goal Locations"
        />
      </div>
      <div className={styles.statList}>
        <h3 className={styles.centeredTitle}>Opposition Scored Against</h3>
        {oppositionScoredAgainst.map((stat, index) => (
          <StatsItem key={index} label={stat.label} value={stat.value} />
        ))}
      </div>
      <div className={styles.statList}>
        <h3 className={styles.centeredTitle}>Players Assisted Dimitri</h3>
        {playersAssisted.map((stat, index) => (
          <StatsItem key={index} label={stat.label} value={stat.value} img />
        ))}
      </div>
      <div className={styles.statList}>
        <h3 className={styles.centeredTitle}>Players Dimitri has assisted</h3>
        {playersHasAssisted.map((stat, index) => (
          <StatsItem key={index} label={stat.label} value={stat.value} img />
        ))}
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <div>
        <img className={styles.grayLightning} src="/assets/imgs/svgs/grayLightning.svg" alt="Gray lightning" />
        <ProfileHeader />
        <ProfileHero />
        <ProfileNavButtons
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {activeTab === 'stats' && (
          <div>
            <StatsDisplay stats={stats} />
            <div className={styles.matchesWrapper}>
              <h2>Upcoming Fixtures</h2>
              <div className={styles.matches}>
                {matches.map((match) => (
                  <MatchCard key={match.opponent} match={match} />
                ))}
              </div>
            </div>
            <StatsList
              title="Attacking Stats"
              stats={attackingStats}
              style={{ marginTop: '40px' }}
            >
              {additionalStats}
            </StatsList>
            <ProfileDivider />
            <StatsList title="Other Stats" stats={otherStats} />
          </div>
        )}
        {activeTab === 'overview' && <div>Overview Content</div>}
      </div>
    </>
  );
}

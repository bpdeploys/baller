import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchPlayerProfile } from '../../services/api';
import { toast } from 'react-toastify';
import { useUserData } from '../../context/UserContext';
import { useLoading } from '../../utils/hooks/useLoading';
import { useHasMounted } from '../../utils/hooks/useHasMounted';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import ProfileHeader from '../../components/Layout/ProfileHeader';
import StatsItem from '../../components/PlayerProfile/SingleStat';
import TeamHero from '../../components/TeamProfile/Hero';
import FixtureBox from '../../components/TeamProfile/FixtureBox';
import TeamBox from '../../components/TeamProfile/TeamBox';
import SquadList from '../../components/TeamProfile/SquadList';
import Form from '../../components/TeamProfile/Form';
import StatsList from '../../components/TeamProfile/StatsBox';
import ScreenLoading from '../../components/Common/LoadingScreen';

// Styles
import styles from './teamprofile.module.scss';
import { getPlayingPositionById } from '../../utils/functions';

export default function TeamProfile() {
  const router = useRouter();
  const { userData, updateUserData } = useUserData();
  const hasMounted = useHasMounted();

  const [playerProfile, setPlayerProfile] = useState(null);

  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      try {
        const profileData = await fetchPlayerProfile(userData.realId);
        setPlayerProfile(profileData);
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, []);

  if (isLoading || !userData || !hasMounted) {
    return <ScreenLoading />;
  }

  // Extract team name and players
  const teamName = playerProfile?.teams[0].team_name || 'Unknown Team';
  const players =
    playerProfile?.teams[0].team_shirt_numbers.map((player) => ({
      name: player.player_id.user?.first_name
        ? `${player.player_id.user.first_name} ${player.player_id.user.last_name}`
        : `${player.player_id.proxy_name} ${player.player_id.proxy_surname}`,
      position: player.player_id.playing_position.playing_position,
      status: player.player_id.user ? 'verified' : 'not_redeemed',
      captain: playerProfile.captain === player.player_id.id,
    })) || [];
  const notRedeemedPlayersCount = players.filter(
    (player) => player.status === 'not_redeemed'
  ).length;
  const playingPosition = getPlayingPositionById(
    parseInt(playerProfile?.playing_position.id)
  );

  const forms = [
    {
      team: teamName,
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
    { stat: 'Loss after going ahead', value: 54 },
  ];

  const teamsPlayed = [
    { team: 'Arsenal', timesPlayed: 7 },
    { team: 'Tottenham', timesPlayed: 5 },
    { team: 'Liverpool', timesPlayed: 6 },
    { team: 'Man City', timesPlayed: 4 },
  ];

  const topScorers = [
    { player: 'Mane', goals: 7 },
    { player: 'Gabriel', goals: 5 },
    { player: 'Haaland', goals: 6 },
    { player: 'Kane', goals: 4 },
  ];

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <div>
        <ProfileHeader playingPosition={playingPosition} />
        <TeamHero data={playerProfile?.teams[0]} />
        <div className={styles.matchesWrapper}>
          <Form forms={forms} />
        </div>
        <div className={styles.matchesWrapper}>
          <h2>Upcoming Fixtures</h2>
          <FixtureBox teamName={teamName} />
        </div>
        <div className={styles.matchesWrapper}>
          <h2>Team Overview</h2>
          <TeamBox teamName={teamName} />
        </div>
        <SquadList
          title="Players you follow"
          players={players}
          style={{ marginTop: '40px' }}
          playersQuantity={players.length}
          notRedeemedPlayersCount={notRedeemedPlayersCount}
          teamName={teamName}
        />
        <StatsList
          matchStatistics={matchStatistics}
          teamsPlayed={teamsPlayed}
          topScorers={topScorers}
        />
      </div>
    </>
  );
}

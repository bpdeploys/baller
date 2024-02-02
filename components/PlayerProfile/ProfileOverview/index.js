import React from 'react';
import TeamBox from '../TeamBox';
import styles from './profileoverview.module.scss';
import TagList from '../TagList';
import PointsList from '../PointsList';
import PlayerInfo from '../PlayerInfo';

const playersAssisted = [
  { label: 'Messi. L', value: 'Rated', status: 'done' },
  { label: 'Benzema. K', value: 'Rate', status: 'pending' },
  { label: 'Mbappe. K', value: 'Rate', status: 'pending' },
  { label: 'Toure. Y', value: 'Rated', status: 'done' },
];

const testList = [
  { label: 'Messi. L', value: 92, value2: 12 },
  { label: 'Benzema. K', value: 14, value2: 2 },
  { label: 'Mbappe. K', value: 14, value2: 2 },
  { label: 'Toure. Y', value: 14, value2: 2 },
];

const playerInfo = [
  { label: 'Main Nationality:', value: 'England' },
  { label: '2nd Nationality:', value: 'Ivory Coast' },
  { label: 'Selected', value: 6 },
  { label: 'Opposition Played', value: 9 },
  { label: 'Team', value: 'Chelsea' },
];

const ProfileOverview = () => {
  return (
    <section className={styles.overview}>
      <h4 className={styles.title}>Player Overview</h4>
      <div className={styles.teamInfo}>
        <TeamBox link={true ? '/select_sports_provider' : '/create_team'} />
      </div>
      <PlayerInfo info={playerInfo} style={{ marginTop: '40px' }} />
      <TagList
        title="Opposition Played"
        stats={playersAssisted}
        style={{ marginTop: '40px' }}
      />
      <PointsList
        title="Players selected"
        stats={testList}
        style={{ marginTop: '40px' }}
      />
      <PointsList
        title="Managers"
        stats={testList}
        style={{ marginTop: '40px' }}
      />
      <TagList
        title="Players you follow"
        stats={playersAssisted}
        style={{ marginTop: '40px' }}
      />
    </section>
  );
};

export default ProfileOverview;

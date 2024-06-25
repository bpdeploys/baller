import { useState, useEffect } from 'react';
import ProfileHeader from '../../../components/Layout/ProfileHeader';
import FantasyPlayer from '../../../components/Fantasy/FantasyPlayer';
import FantasyPitch from '../../../components/Fantasy/FantasyPitch';
import styles from './fantasydelight.module.scss';
import PlayerSelectionModal from '../../../components/Fantasy/PlayerSelectionModal';
import Dropdown from '../../../components/Common/Dropdown';
import Button from '../../../components/Common/Button';

const mockPlayers = {
  GK: [
    { id: 1, name: 'Manuel Neuer' },
    { id: 2, name: 'Thibaut Courtois' },
    { id: 3, name: 'Jan Oblak' },
    { id: 4, name: 'Alisson Becker' },
    { id: 5, name: 'Ederson' },
  ],
  DEF: [
    { id: 6, name: 'Virgil van Dijk' },
    { id: 7, name: 'Sergio Ramos' },
    { id: 8, name: 'Trent Alexander-Arnold' },
    { id: 9, name: 'Andrew Robertson' },
    { id: 10, name: 'Aymeric Laporte' },
  ],
  MID: [
    { id: 11, name: 'Kevin De Bruyne' },
    { id: 12, name: 'Luka Modric' },
    { id: 13, name: "N'Golo Kanté" },
    { id: 14, name: 'Fabinho' },
    { id: 15, name: 'Casemiro' },
  ],
  ST: [
    { id: 16, name: 'Lionel Messi' },
    { id: 17, name: 'Cristiano Ronaldo' },
    { id: 18, name: 'Robert Lewandowski' },
    { id: 19, name: 'Kylian Mbappe' },
    { id: 20, name: 'Harry Kane' },
  ],
};

const captainOptions = [
  { label: 'Sergio Ramos', value: 'sergio_ramos' },
  { label: 'Lionel Messi', value: 'lionel_messi' },
  { label: 'Virgil van Dijk', value: 'virgil_van_dijk' },
  { label: 'Harry Kane', value: 'harry_kane' },
  { label: 'Manuel Neuer', value: 'manuel_neuer' },
  { label: 'Giorgio Chiellini', value: 'giorgio_chiellini' },
  { label: 'César Azpilicueta', value: 'cesar_azpilicueta' },
  { label: 'Hugo Lloris', value: 'hugo_lloris' },
  { label: 'Eden Hazard', value: 'eden_hazard' },
  { label: 'Robert Lewandowski', value: 'robert_lewandowski' },
];

const initialSelectedPlayers = {
  GK: null,
  DEF1: null,
  DEF2: null,
  DEF3: null,
  MID1: null,
  MID2: null,
  MID3: null,
  ST1: null,
  ST2: null,
};

export default function FantasyDelight() {
  const [selectedPlayers, setSelectedPlayers] = useState(
    initialSelectedPlayers
  );
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Effect to check if all positions are filled
  useEffect(() => {
    const isAllSelected = Object.values(selectedPlayers).every(
      (player) => player !== null
    );
    setIsButtonDisabled(!isAllSelected);
  }, [selectedPlayers]);

  const handleSelect = (position) => {
    setCurrentPosition(position);
  };

  const handleDeselect = (position) => {
    setSelectedPlayers({ ...selectedPlayers, [position]: null });
  };

  const handlePlayerSelect = (position, player) => {
    setSelectedPlayers({ ...selectedPlayers, [position]: player });
    setCurrentPosition(null);
  };

  const getRandomUniquePlayer = (players, selectedIds) => {
    let randomPlayer;
    do {
      const randomIndex = Math.floor(Math.random() * players.length);
      randomPlayer = players[randomIndex];
    } while (selectedIds.includes(randomPlayer.id));
    return randomPlayer;
  };

  const handleRandomSelection = () => {
    const selectedIds = Object.values(selectedPlayers)
      .filter((player) => player !== null)
      .map((player) => player.id);

    const newSelectedPlayers = {
      GK: getRandomUniquePlayer(mockPlayers.GK, selectedIds),
      DEF1: getRandomUniquePlayer(mockPlayers.DEF, selectedIds),
      DEF2: getRandomUniquePlayer(mockPlayers.DEF, selectedIds),
      DEF3: getRandomUniquePlayer(mockPlayers.DEF, selectedIds),
      MID1: getRandomUniquePlayer(mockPlayers.MID, selectedIds),
      MID2: getRandomUniquePlayer(mockPlayers.MID, selectedIds),
      MID3: getRandomUniquePlayer(mockPlayers.MID, selectedIds),
      ST1: getRandomUniquePlayer(mockPlayers.ST, selectedIds),
      ST2: getRandomUniquePlayer(mockPlayers.ST, selectedIds),
    };

    setSelectedPlayers(newSelectedPlayers);
  };

  const mapPositionToRole = (position) => {
    if (position.startsWith('DEF')) return 'DEF';
    if (position.startsWith('MID')) return 'MID';
    if (position.startsWith('ST')) return 'ST';
    return position;
  };

  const handleCaptainChange = (e) => {
    console.log('Selected captain:', e.target.value);
    // Perform any actions based on the selected captain
  };

  const handleSubmit = () => {
    // Handle squad submission logic
    console.log('Submitting squad:', selectedPlayers);
    // Reset selected players
    setSelectedPlayers(initialSelectedPlayers);
  };

  return (
    <>
      <ProfileHeader />
      <div className={styles.fantasyDelight}>
        <div className={styles.heading}>
          <p>
            Select a position to add players to your team <br /> OR
          </p>
          <button onClick={handleRandomSelection}>Random Selection</button>
        </div>
        <FantasyPitch>
          {Object.keys(selectedPlayers).map((position) => (
            <FantasyPlayer
              key={position}
              position={position}
              selectedPlayer={selectedPlayers[position]}
              onSelect={handleSelect}
              onDeselect={handleDeselect}
              className={styles[position.toLowerCase()]}
            />
          ))}
        </FantasyPitch>
        <div className={styles.actions}>
          <Dropdown
            id="captainDropdown"
            name="captain"
            placeholder="Choose a Captain"
            items={captainOptions}
            onChange={handleCaptainChange}
          />
          <Button
            text="Submit Squad"
            color="blue"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          />
        </div>
      </div>
      {currentPosition && (
        <PlayerSelectionModal
          players={mockPlayers[mapPositionToRole(currentPosition)]}
          position={currentPosition}
          onPlayerSelect={handlePlayerSelect}
          onClose={() => setCurrentPosition(null)}
        />
      )}
    </>
  );
}

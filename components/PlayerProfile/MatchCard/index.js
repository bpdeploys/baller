import React, { useState } from 'react';
import styles from './matchcard.module.scss';
import AttendModal from '../AttendModal';
import CancelModal from '../CancelModal';

const MatchCard = ({ match }) => {
  const [attendModal, setAttendModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const AttendMatch = () => {
    if (match.attending) {
      return (
        <div className={styles.tag}>
          <small></small>
          <span className={styles.attend}>Attending</span>
        </div>
      );
    } else if (match.attending === false) {
      return (
        <div className={styles.tag}>
          <small></small>
          <span className={styles.cancel}>Not Attending</span>
        </div>
      );
    } else {
      return (
        <>
          <span>Are you playing this game?</span>
          <div>
            <img
              src="/assets/imgs/svgs/attendButton.svg"
              alt="Player attending"
              onClick={() => setAttendModal(true)}
            />
            <img
              src="/assets/imgs/svgs/unattendButton.svg"
              alt="Player unattending"
              onClick={() => setCancelModal(true)}
            />
          </div>
        </>
      );
    }
  };

  return (
    <>
      <AttendModal isOpen={attendModal} onClose={() => setAttendModal(false)} />
      <CancelModal isOpen={cancelModal} onClose={() => setCancelModal(false)} />
      <div className={styles.matchCard}>
        <div className={styles.matchInfo}>
          <div className={styles.matchVs}>
            <span>VS</span> {match.opponent}
          </div>
          <div className={styles.matchDetails}>
            <div className={styles.matchDate}>{match.date}</div>
            <div className={styles.matchType}>
              {match.competition === 'Up' ? (
                <img
                  src="/assets/imgs/svgs/arrowUpRed.svg"
                  alt="Up competition"
                />
              ) : match.competition === 'Down' ? (
                <img
                  src="/assets/imgs/svgs/arrowDownGreen.svg"
                  alt="Down competition"
                />
              ) : (
                <img
                  src="/assets/imgs/svgs/neutralOrange.svg"
                  alt="neutral competition"
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.matchAttending}>
          <AttendMatch />
        </div>
        <button className={styles.reportButton}>View Match Report</button>
      </div>
    </>
  );
};

export default MatchCard;

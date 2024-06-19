// Styles
import styles from './teambox.module.scss';
import Link from 'next/link';

const TeamBox = ({ link, teamName }) => {
  return (
    <div className={styles.teamBox}>
      <h4>Team</h4>
      <div className={styles.teamBox__content}>
        <div className={styles.teamBox__details}>
          <div className={styles.teamBox__detail}>
            <img
              src="/assets/imgs/svgs/grayCirclePlaceholder.svg"
              alt="Up competition"
            />
            <div>
              <span>{teamName}</span>
              <small>Debut: 12/03/23</small>
            </div>
          </div>
          <div>
            <span>Games played</span>
            <br />
            <span>18</span>
          </div>
        </div>
      </div>
      <Link href={link || '/'} className={styles.teamBox__link}>
        <img
          src="/assets/imgs/svgs/blueLinkArrow.svg"
          alt="View Upcoming Fixtures link"
        />
        View Upcoming Fixtures
      </Link>
    </div>
  );
};

export default TeamBox;

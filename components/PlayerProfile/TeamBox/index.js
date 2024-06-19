// Styles
import styles from './teambox.module.scss';
import Link from 'next/link';

/**
 * Squad teammate info component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 * @param {boolean} empty Whether or not the element should be empty
 *
 * @returns {React.Element} A Squad teammate info element
 */
const TeamBox = ({ playerTeam, link }) => {
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
              <span>{playerTeam}</span>
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
      <Link href={link} className={styles.teamBox__link}>
        <img
          src="/assets/imgs/svgs/blueLinkArrow.svg"
          alt="View team profile link"
        />
        View Team Profile
      </Link>
    </div>
  );
};

export default TeamBox;

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
const FixtureBox = ({ link }) => {
  return (
    <div className={styles.fixtureBox}>
      <svg viewBox="0 0 364 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0C107.881 10.4312 172.494 11.1586 283.009 15.117L245.231 46.3244C288.015 56.1451 364 62.5032 364 62.5032V112C270.716 107.703 213.977 100.031 110.595 77.9346L158.199 56.1451C88.7257 45.6418 65.65 38.3624 0.000870987 30.5248L0 0Z"
          fill="#F5F5F5"
        />
        <path
          d="M0 0C107.881 10.4312 172.494 11.1586 283.009 15.117L245.231 46.3244C288.015 56.1451 364 62.5032 364 62.5032V112C270.716 107.703 213.977 100.031 110.595 77.9346L158.199 56.1451C88.7257 45.6418 65.65 38.3624 0.000870987 30.5248L0 0Z"
          fill="url(#paint0_linear_405_65)"
          fill-opacity="0.2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_405_65"
            x1="182"
            y1="0"
            x2="182"
            y2="112"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.609375" stop-color="white" />
            <stop offset="1" stop-color="#D5D5D5" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.fixtureBox__content}>
        <small>Chelsea vs</small>
        <br />
        <h3>Manchester United</h3>
        <span>19/08/23</span>
      </div>
      <Link href={link || '/'} className={styles.fixtureBox__link}>
        <img
          src="/assets/imgs/svgs/blueLinkArrow.svg"
          alt="View team profile link"
        />
        View Opposition Report
      </Link>
    </div>
  );
};

export default FixtureBox;

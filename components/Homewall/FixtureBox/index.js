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
const FixtureBox = ({ attending = false, link }) => {
  return (
    <div className={styles.fixtureBox}>
      <h4>Upcoming Fixture</h4>
      <div className={styles.card}>
        <img
          className={styles.lightning}
          src="/assets/imgs/svgs/grayLightningThin.svg"
          alt="Lightning image"
        />
        <div className={styles.card__content}>
          <small>Chelsea vs</small>
          <br />
          <h3>Manchester United</h3>
          <span>19/08/23</span>
        </div>
        {attending ? (
          <Link href={link || '/'} className={styles.card__link}>
            <img
              src="/assets/imgs/svgs/blueLinkArrow.svg"
              alt="View team profile link"
            />
            View Opposition Report
          </Link>
        ) : (
          <div className={styles.card__confirm}>
            <small>Confirm attendance</small>
            <div className={styles.buttons}>
              <button className={styles.accept}>I’m playing!</button>
              <button className={styles.decline}>No / Not sure!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixtureBox;

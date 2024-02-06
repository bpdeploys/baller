import { useRouter } from 'next/router';

// Styles
import styles from './hero.module.scss';

const TeamHero = () => {
  const router = useRouter();

  return (
    <div className={styles.hero}>
      <div className={styles.heroWrapper}>
        <img
          className={styles.topLightning}
          src="/assets/imgs/svgs/lightBlueLightning.svg"
          alt="Blue lightning"
        />
        <img
          className={styles.bottomLightning}
          src="/assets/imgs/svgs/lightBlueLightning.svg"
          alt="Blue lightning"
        />
        <div className={styles.heroLeft}>
          <div className={styles.profileImage}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
            </svg>
          </div>
        </div>
        <div className={styles.heroMid}>
          <h1>Chelsea</h1>
        </div>
      </div>
    </div>
  );
};

export default TeamHero;

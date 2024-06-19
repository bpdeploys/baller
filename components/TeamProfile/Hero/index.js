import { useRouter } from 'next/router';

// Styles
import styles from './hero.module.scss';

const TeamHero = ({ data }) => {
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
            <img
              src="https://guessthefootballplayer.com/Js/placeholder3.png"
              alt="User profile image"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className={styles.heroMid}>
          <h1>{data.team_name}</h1>
        </div>
      </div>
    </div>
  );
};

export default TeamHero;

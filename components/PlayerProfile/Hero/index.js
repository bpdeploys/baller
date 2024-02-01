import { useRouter } from 'next/router';

// Styles
import styles from './hero.module.scss';

const ProfileHero = () => {
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
              src="/assets/imgs/svgs/dimitriProfilePlaceholder.svg"
              alt="User profile image"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.playerStatus}>
            <img
              src="/assets/imgs/svgs/f5Placeholder.svg"
              alt="User profile image"
              width={90}
              height={41}
            />
          </div>
        </div>
        <div className={styles.heroMid}>
          <h1>Dimitri Gbo</h1>
          <h4>Midfielder</h4>
          <img
            src="/assets/imgs/svgs/flagPlaceholder.svg"
            alt="User profile image"
            width={31}
            height={17}
          />
        </div>
        <h3 className={styles.heroNumber}>10</h3>
      </div>
    </div>
  );
};

export default ProfileHero;

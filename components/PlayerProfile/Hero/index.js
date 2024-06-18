import { useRouter } from 'next/router';

// Styles
import styles from './hero.module.scss';
import Flag from 'react-world-flags';
import { countryToAlpha2 } from 'country-to-iso';

const ProfileHero = ({ data }) => {
  const router = useRouter();
  const countryCode = countryToAlpha2(data.user.nationality.country);

  console.log(countryCode);

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
              src={
                data.user.first_name == 'Dimitri'
                  ? '/assets/imgs/svgs/dimitriProfilePlaceholder.svg'
                  : '/assets/imgs/pngs/playerimg.png'
              }
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
          <h1>
            {data.user.first_name} {data.user.last_name}
          </h1>
          <h4>{data.playing_position.playing_position}</h4>
          <Flag
            code={countryCode}
            alt={`${data.user.nationality.country} flag`}
            width={31}
            height={17}
          />
        </div>
        <h3 className={styles.heroNumber}>{data.squad_number[0].number}</h3>
      </div>
    </div>
  );
};

export default ProfileHero;

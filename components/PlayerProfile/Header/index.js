import { useRouter } from 'next/router';

// Styles
import styles from './header.module.scss';

/**
 * Profile Header component
 *
 * @param {boolean} shadow Whether or not the header should have a shadow (default: true)
 *
 * @returns {React.Element} A header element
 */
const ProfileHeader = ({ shadow = true }) => {
  const router = useRouter();

  return (
    <header>
      <div
        className={styles.header}
        style={{
          boxShadow: shadow ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
        }}
      >
        <img
          className={styles.menu}
          src="/assets/imgs/svgs/menuIcon.svg"
          alt="Baller Logo"
          width={30}
          height={18}
          onClick={() => {}}
        />

        <img
          className={styles.picture}
          src="/assets/imgs/svgs/profileImgPlaceholder.svg"
          alt="Baller Logo"
          width={40}
          height={40}
          onClick={() => {}}
        />
      </div>
    </header>
  );
};

export default ProfileHeader;

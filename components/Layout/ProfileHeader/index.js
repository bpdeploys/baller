import { useRouter } from 'next/router';

// Styles
import styles from './header.module.scss';
import useToggle from '../../../utils/hooks/useToggle';
import SideMenu from '../SideMenu';
import { useUserData } from '../../../context/UserContext';

/**
 * Profile Header component
 *
 * @param {boolean} shadow Whether or not the header should have a shadow (default: true)
 *
 * @returns {React.Element} A header element
 */
const ProfileHeader = ({ shadow = true, onMenuClick, playingPosition }) => {
  const router = useRouter();
  const [isMenuOpen, toggleMenu] = useToggle();
  const { userData } = useUserData();

  return (
    <>
      <header>
        <div
          className={styles.header}
          style={{
            boxShadow: shadow ? '0px 4px 4px 0px rgba(0, 0, 0, 0.05)' : 'none',
          }}
        >
          <img
            className={styles.menu}
            src="/assets/imgs/svgs/menuIcon.svg"
            alt="Baller Logo"
            width={30}
            height={18}
            onClick={toggleMenu}
          />
          <div className={styles.playingPosition}>{playingPosition}</div>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default ProfileHeader;

import React from 'react';
import Link from 'next/link';

// Styles
import styles from './sidemenu.module.scss';

// Context
import { useUserData } from '../../../context/UserContext';

// Hooks
import { useHasMounted } from '../../../utils/hooks/useHasMounted';
import ScreenLoading from '../../Common/LoadingScreen';

const links = [
  { title: 'Rewards', path: '/af_marketing' },
  { title: 'Player Profile', path: '/player_profile' },
  { title: 'Team Profile', path: '/team_profile' },
  { title: 'Homewall', path: '/homewall' },
  { title: 'League Page', path: '' },
  { title: 'Settings', path: '/logout' },
];

const SideMenu = ({ isOpen, onClose }) => {
  const { userData } = useUserData();
  const hasMounted = useHasMounted();

  if (!hasMounted || !userData) {
    return <ScreenLoading />;
  }

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.closeBtn} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <line
              x1="21.9204"
              y1="22.6275"
              x2="7.07113"
              y2="7.7783"
              stroke="white"
            />
            <line
              x1="7.07125"
              y1="21.9204"
              x2="21.9205"
              y2="7.07119"
              stroke="white"
            />
          </svg>
        </div>
        <div className={styles.sideMenu__header}>
          <div className={styles.sideMenu__bpc}>
            <span>{userData?.bp_points}</span>
            <small>bpc</small>
          </div>
          {/* <Link href={'/'}>Go to Wallet</Link> */}
        </div>
        <div className={styles.sideMenu__links}>
          <nav>
            <ul>
              {links.map((link) => (
                <li key={link.title}>
                  <Link href={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.sideMenu__topLght}>
          <img
            src="/assets/imgs/svgs/lightBlueLightning.svg"
            alt="Top lightning"
          />
        </div>
        <div className={styles.sideMenu__bottomLght}>
          <img
            src="/assets/imgs/svgs/lightBlueLightning.svg"
            alt="Bottom lightning"
          />
        </div>
      </div>
    </>
  );
};

export default SideMenu;

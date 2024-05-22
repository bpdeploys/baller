import { useEffect, useRef, useState } from 'react';

// Styles
import styles from './homewall.module.scss';
import WalletDetails from '../../components/Homewall/WalletDetails';
import FixtureBox from '../../components/Homewall/FixtureBox';
import KeyMatch from '../../components/Homewall/KeyMatch';
import LiveMatch from '../../components/Homewall/LiveMatch';
import AttendButton from '../../components/Homewall/AttendButton';
import AffiliateCard from '../../components/Homewall/AffiliateCard';
import useToggle from '../../utils/hooks/useToggle';
import SideMenu from '../../components/Layout/SideMenu';
import { useUserData } from '../../context/UserContext';

export default function SelectSport() {
  const [isMenuOpen, toggleMenu] = useToggle();
  const { userData } = useUserData();

  console.log(userData);

  return (
    <>
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <div className={styles.homewall}>
        <div className={styles.header}>
          <img
            className={styles.menu}
            src="/assets/imgs/svgs/hamburger.svg"
            alt="Baller Logo"
            width={40}
            height={22}
            onClick={toggleMenu}
          />
          <img
            className={styles.logo}
            src="/assets/imgs/svgs/homewallLogo.svg"
            alt="Baller Logo"
            width={40}
            height={40}
            onClick={() => router.push('/')}
          />
          <div />
        </div>
        <WalletDetails points="804" bpc="45" />
        <section className={styles.cards}>
          <AffiliateCard
            onClick={() => router.push('/af_marketing')}
            title={'Get free pet grooming'}
            company={'Dogshow Spa'}
            price={'5.00'}
            category={'Pets'}
            imageUrl={'/assets/imgs/affiliates/dog.jpg'}
            description={
              'Treat your furry friend to a day of pampering! Our pet grooming services include a full wash, trim, and nail clipping to keep your pet looking their best.'
            }
          />
          <KeyMatch />
          <KeyMatch active />
          <FixtureBox attending={true} />
          <FixtureBox attending={false} />
          <LiveMatch />
          <AttendButton />
        </section>
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';

// Styles
import styles from './homewall.module.scss';
import WalletDetails from '../../components/Homewall/WalletDetails';
import FeaturedOffer from '../../components/Homewall/FeaturedOffer';
import FixtureBox from '../../components/Homewall/FixtureBox';
import KeyMatch from '../../components/Homewall/KeyMatch';
import LiveMatch from '../../components/Homewall/LiveMatch';
import AttendButton from '../../components/Homewall/AttendButton';

export default function SelectSport() {
  return (
    <div className={styles.homewall}>
      <div className={styles.header}>
        <img
          className={styles.menu}
          src="/assets/imgs/svgs/hamburger.svg"
          alt="Baller Logo"
          width={40}
          height={22}
          onClick={() => router.push('/')}
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
        <FeaturedOffer />
        <KeyMatch />
        <KeyMatch active />
        <FixtureBox attending={true} />
        <FixtureBox attending={false} />
        <LiveMatch />
        <AttendButton />
      </section>
    </div>
  );
}

import Link from 'next/link';
import styles from './walletdetails.module.scss';

const WalletDetails = ({ points, bpc }) => {
  return (
    <div className={styles.wallet}>
      <div className={styles.points}>
        <h2>{points}</h2>
        <p>points</p>
      </div>
      <div className={styles.bpc}>
        <h2>{bpc}</h2>
        <img
          className={styles.logo}
          src="/assets/imgs/svgs/bpc.svg"
          alt="Baller Logo"
          width={20}
          height={15}
          onClick={() => router.push('/')}
        />
      </div>
      <Link href="/wallet" className={styles.link}>
        Go to Wallet
      </Link>
    </div>
  );
};

export default WalletDetails;

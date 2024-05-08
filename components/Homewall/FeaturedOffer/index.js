import Link from 'next/link';
import styles from './featuredoffer.module.scss';

const FeaturedOffer = ({ onClick }) => {
  return (
    <div className={styles.featuredOffer}>
      <h4>Exclusive Offers</h4>
      <div className={styles.card} onClick={onClick}>
        <div className={styles.offerDetails}>
          <h3>Special Offer</h3>
          <p>90% Off</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedOffer;

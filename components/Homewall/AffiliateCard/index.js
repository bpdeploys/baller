import Link from 'next/link';
import styles from './affiliatecard.module.scss';

const AffiliateCard = ({
  onClick,
  imageUrl,
  title,
  company,
  price,
  topPick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.image}>
        {topPick && <span className={styles.topPick}>👌 Top pick</span>}
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles.details}>
        <h3>{title}</h3>
        <p>{company}</p>
        <div>{price}</div>
      </div>
    </div>
  );
};

export default AffiliateCard;

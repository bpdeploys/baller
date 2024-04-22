import React from 'react';
import styles from './offerdetails.module.scss';

const OfferDetails = ({ offer, onClose }) => {
  if (!offer) return null;

  console.log(offer);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.image}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <img src={offer.imageUrl} alt={offer.title} />
          <p>{offer.price}</p>
        </div>
        <div className={styles.details}>
          <h2>{offer.title}</h2>
          <p className={styles.category}>{offer.category}</p>
          <div className={styles.description}>
            <h4>About</h4>
            <p>{offer.description}</p>
          </div>
        </div>
        <button className={styles.button}>Redeem for {offer.price}</button>
      </div>
    </div>
  );
};

export default OfferDetails;

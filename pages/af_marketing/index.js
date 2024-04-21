import { useEffect, useRef, useState } from 'react';

// Styles
import styles from './affiliatemarketing.module.scss';
import AffiliateCard from '../../components/Affiliates/AffiliateCard';
import { mockOffers } from '../../utils/data/mockOffers';

export default function SelectSport() {
  const [categories, setCategories] = useState([
    'All',
    'Makeup',
    'Kitchen',
    'Computers',
    'Sports',
    'Clothing',
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredOffers, setFilteredOffers] = useState(mockOffers);
  const [showIndicator, setShowIndicator] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredOffers(mockOffers);
    } else {
      const filtered = mockOffers.filter(
        (offer) => offer.category === selectedCategory
      );
      setFilteredOffers(filtered);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const containerWidth = container.offsetWidth;
    const contentWidth = content.scrollWidth;

    if (contentWidth > containerWidth) {
      setShowIndicator(true);
    } else {
      setShowIndicator(false);
    }

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    const content = contentRef.current;
    const containerWidth = container.offsetWidth;
    const contentWidth = content.scrollWidth;
    const scrollLeft = container.scrollLeft;

    if (containerWidth + scrollLeft < contentWidth) {
      setShowIndicator(true);
    } else {
      setShowIndicator(false);
    }
  };

  return (
    <div className={styles.affiliates}>
      <h1>Exclusive offers</h1>
      <div className={styles.categoriesContainer} ref={containerRef}>
        <div className={styles.categoriesContent} ref={contentRef}>
          {categories.map((category) => (
            <div
              key={category}
              className={`${styles.tag} ${
                selectedCategory === category ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        {showIndicator && <></>}
      </div>
      <div className={styles.cards}>
        {filteredOffers.map((offer) => (
          <AffiliateCard
            key={offer.id}
            onClick={() => setSelectedOffer(offer)}
            {...offer}
          />
        ))}
      </div>
    </div>
  );
}

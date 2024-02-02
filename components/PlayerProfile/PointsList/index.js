import { useState } from 'react';
import styles from './pointslist.module.scss';

const StatsItem = ({ label, value, value2, img }) => (
  <div className={styles.statsItem}>
    <div>
      {img && (
        <img
          src={'/assets/imgs/svgs/dimitriProfilePlaceholder.svg'}
          alt="Stat Image"
          width={35}
          height={35}
        />
      )}
      <span className={styles.label}>{label}</span>
    </div>
    <div className={styles.points}>
      <span className={styles.value}>{value}</span>
      <span className={styles.value}>{value2}</span>
    </div>
  </div>
);

const PointsList = ({ title, stats, style, children }) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className={styles.pointsList} style={style}>
      <small className={styles.pointsPrimaryTitle}>points earned</small>
      <small className={styles.pointsSecondaryTitle}>times selected</small>
      <h3 className={styles.title}>{title || 'Stats'}</h3>
      {stats.map((stat) => (
        <StatsItem
          key={stat.label}
          label={stat.label}
          value={stat.value}
          value2={stat.value2}
          img
        />
      ))}
      {viewMore && children}
      <div
        className={styles.viewMoreButton}
        onClick={() => setViewMore(!viewMore)}
      >
        {viewMore ? 'View less' : 'View more'}{' '}
        {viewMore ? (
          <svg
            width="11"
            height="6"
            viewBox="0 0 11 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.14645"
              y1="5.14645"
              x2="5.81335"
              y2="0.479542"
              stroke="black"
            />
            <line
              x1="9.89645"
              y1="5.22855"
              x2="5.39645"
              y2="0.728554"
              stroke="black"
            />
          </svg>
        ) : (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="9.60355"
              y1="0.728553"
              x2="4.93665"
              y2="5.39546"
              stroke="black"
            />
            <line
              x1="0.853553"
              y1="0.646447"
              x2="5.35355"
              y2="5.14645"
              stroke="black"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default PointsList;

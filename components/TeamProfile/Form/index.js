import styles from './form.module.scss'; // Adjust the import path as needed

const Form = ({ forms }) => {
  return (
    <div className={styles.form}>
      <h2>Form</h2>
      <div className={styles.formItem}>
        <div className={styles.teams}>
          <div className={styles.teamInfo}>
            <div className={styles.circle} />
            <div>
              <div>Chelsea</div>
              <div>20 pts</div>
            </div>
          </div>
          <div className={styles.teamInfo}>
            <div className={styles.circle} />
            <div>
              <div>Arsenal</div>
              <div>33 pts</div>
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.title}>This month</div>
          <div className={styles.list}>
            <div>
              <span>Games played</span>
              <span>4</span>
            </div>
            <div>
              <span>Goals scored</span>
              <span>5</span>
            </div>
            <div>
              <span>Clean Sheets</span>
              <span>2</span>
            </div>
            <div>
              <span>Conceded</span>
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

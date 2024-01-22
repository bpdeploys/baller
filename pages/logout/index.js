import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Button from '../../components/Common/Button';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';

// Styles
import styles from './selectsport.module.scss';
import { useUserData } from '../../context/UserContext';
import { handleLogoutStorage } from '../../utils/functions';
import SideMenu from '../../components/Layout/SideMenu';
import useToggle from '../../utils/hooks/useToggle';

export default function SelectSport() {
  const router = useRouter();
  const { clearUserData } = useUserData();
  const [isMenuOpen, toggleMenu] = useToggle();

  const handleLogout = (item) => {
    handleLogoutStorage();
    clearUserData();
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <ScreenWrapper image="grayLightningHalf">
        <section className={styles.sportSelection}>
          <div>
            <div className={styles.sportSelection__heading}>
              <img
                src="/assets/imgs/svgs/homeLogo.svg"
                alt="Logo"
                width={50}
                height={50}
              />
              <h1>Logout temporal page</h1>
            </div>
          </div>
          <Button text="Open Menu" color="blue" onClick={toggleMenu} />
          <Button text="Logout" color="blue" onClick={handleLogout} />
        </section>
      </ScreenWrapper>
    </>
  );
}

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './selectvenue.module.scss';
import SportsProviderBox from '../../components/SportsProvider/SportsProviderBox';

// API
import { getAllVenuesByProvider } from '../../services/api';

// Context
import { useCreateTeamFormData } from '../../context/TeamContext';
import { useLoading } from '../../utils/hooks/useLoading';

export default function SelectVenue() {
  const router = useRouter();
  const { data, setCreateTeamFormValues } = useCreateTeamFormData();

  const [venueOption, setVenueOption] = useState(null);
  const [venueList, setVenueList] = useState([]);

  const { isLoading, startLoading, stopLoading } = useLoading();

  const selectedProviderId = data?.provider?.id;

  console.log(data);

  useEffect(() => {
    const fetchAllVenuesByProvider = async () => {
      try {
        startLoading(); // Start loading
        const venues = await getAllVenuesByProvider(selectedProviderId);
        setVenueList(venues);
        stopLoading(); // Stop loading after data is fetched
      } catch (error) {
        console.error('Error fetching venues:', error);
        stopLoading(); // Stop loading in case of error
      }
    };

    if (selectedProviderId) {
      fetchAllVenuesByProvider();
    } else {
      stopLoading(); // Ensure loading is stopped if no provider ID is present
    }
  }, [selectedProviderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading(); // Start loading
      setCreateTeamFormValues({
        venue: venueOption,
      });
      await router.push('/create_team');
      stopLoading(); // Stop loading after navigation
    } catch (error) {
      console.error('Error saving data or navigating:', error);
      stopLoading(); // Stop loading in case of error
    }
  };

  const handleVenueOption = (item) => {
    setVenueOption(item);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightning" positionY="450px">
        <Header
          text="Select Sports Provider"
          textTransform="capitalize"
          noItalic
        />
        <div className={styles.providersWrapper}>
          <div className={styles.providers}>
            {venueList.map((provider) => (
              <SportsProviderBox
                provider={provider}
                selected={venueOption === provider}
                onClick={() => handleVenueOption(provider)}
              />
            ))}
          </div>
          <div className={styles.providers__button}>
            <Button text="DONE" color="blue" uppercase onClick={handleSubmit} />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}

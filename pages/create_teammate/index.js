import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Context
import { useContext, useEffect, useState } from 'react';
import { SquadContext } from '../../context/SquadContext';
import { useFormData } from '../../services/context';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Dropdown from '../../components/Common/Dropdown';
import Button from '../../components/Common/Button';

// Hooks
import { useHasMounted } from '../../utils/hooks/useHasMounted';
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';

// Data
import constants from '../../utils/data/constants';

// Styles
import styles from './createteammate.module.scss';
import { useUserData } from '../../context/UserContext';
import { useLoading } from '../../utils/hooks/useLoading';
import { fetchAllPlayingPositions } from '../../services/api';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string(),
  playingPosition: Yup.string().required('Playing Position is required'),
  squadNumber: Yup.string().required('Squad Number is required'),
});

export default function CreateTeammate() {
  const router = useRouter();

  const { userData } = useUserData();
  const { setFormValues } = useFormData();
  const { addTeammate } = useContext(SquadContext);

  const hasMounted = useHasMounted();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, setValue } = useForm({
    resolver,
  });

  const [positions, setPositions] = useState(null);

  // Get data to populate necessary dropdowns
  useEffect(() => {
    const loadData = async () => {
      startLoading();

      const selectedSport = userData?.team?.sport || 'Football';

      try {
        const fetchedPositions = await fetchAllPlayingPositions();
        const positionsOptions = fetchedPositions
          .filter((position) => position.sport === selectedSport)
          .map((position) => ({
            value: position.id,
            label: `${position.playing_position} (${position.abbreviated})`,
          }));
        setPositions(positionsOptions);
      } catch (error) {
        toast.error(error.message);
      } finally {
        stopLoading();
      }
    };

    loadData();
  }, []);

  const onSubmit = async (data) => {
    setFormValues(data);
    addTeammate(data);
    router.push('/create_squad');
  };

  const onError = (errors) => {
    if (Object.values(errors).length >= 2) {
      toast.error('Please fill the required fields');
    } else {
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  const pickContacts = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const properties = ['name', 'tel'];
        const contacts = await navigator.contacts.select(properties, {
          multiple: false,
        });
        if (contacts && contacts[0]) {
          const contact = contacts[0];
          setValue('firstName', contact.name[0].split(' ')[0]);
          setValue('lastName', contact.name[0].split(' ')[1]);
          setValue('phoneNumber', contact.tel[0]);
        }
      } catch (error) {
        toast.error('Failed to pick contact');
      }
    } else {
      toast.error('We cant use contacts on this device');
    }
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
      <ScreenWrapper background="white">
        <div className={styles.heading}>
          <h1>CREATE YOUR TEAMMATE</h1>
          <img
            src="/assets/imgs/svgs/blue-shirt.svg"
            alt="Player Shirt"
            width={60}
            height={68}
          />
        </div>
        <form
          className={styles.createTeammate}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.createTeammate__inputs}>
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              {...register('firstName')}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              {...register('lastName')}
            />
            <Dropdown
              name="playingPosition"
              placeholder="Playing Position"
              items={positions}
              {...register('playingPosition')}
            />
            <Dropdown
              name="squadNumber"
              placeholder="Squad Number"
              items={constants.SQUAD_NUMBERS}
              {...register('squadNumber')}
            />
            <div className={styles.createTeammate__phoneWrapper}>
              <Input
                type="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register('phoneNumber')}
              />
              {
                <Button
                  type="button"
                  onClick={pickContacts}
                  text="Go to Contacts"
                  uppercase
                  customClassName={styles.createTeammate__buttonCustom}
                />
              }
            </div>
          </div>
          <div className={styles.createTeammate__button}>
            <Button
              type="submit"
              text="Create Teammate"
              color="blue"
              uppercase
            />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}

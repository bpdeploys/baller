import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Dropdown from '../../components/Common/Dropdown';
import Button from '../../components/Common/Button';
import HeaderButtons from '../../components/Layout/HeaderButtons';

// Data
import constants from '../../utils/data/constants';

// Context
import { useUserData } from '../../context/UserContext';

// Styles
import styles from './createplayerprofile.module.scss';

// Hooks
import { useFormData } from '../../services/context';
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';
import { useLoading } from '../../utils/hooks/useLoading';

// Services
import {
  createPlayerProfile,
  fetchAllNations,
  fetchAllPlayingPositions,
} from '../../services/api';
import MobileDatePicker from '../../components/Common/MobileDatePicker';

const validationSchema = yup.object().shape({
  playingPosition: yup.string().required('Playing Position is required'),
  motive: yup.string().required('Motive is required'),
  nationality: yup.string().required('Nationality is required'),
  postcode: yup.string().required('Postcode is required'),
});

export default function CreatePlayerProfile() {
  const router = useRouter();
  const { updateUserData } = useUserData();
  const { data, setFormValues } = useFormData();
  const resolver = useYupValidationResolver(validationSchema);
  const { register, handleSubmit } = useForm({
    resolver,
  });
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [nations, setNations] = useState([]);
  const [positions, setPositions] = useState([]);
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDatePickerSelect = (date) => {
    setDatePickerValue(date);
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      startLoading();

      const selectedSport = data.sport;

      try {
        const fetchedNations = await fetchAllNations();
        const fetchedPositions = await fetchAllPlayingPositions();
        const nationsOptions = fetchedNations.map((nation) => ({
          value: nation.id,
          label: nation.country,
        }));
        const positionsOptions = fetchedPositions
          .filter((position) => position.sport === selectedSport)
          .map((position) => ({
            value: position.id,
            label: `${position.playing_position} (${position.abbreviated})`,
          }));
        setNations(nationsOptions);
        setPositions(positionsOptions);
      } catch (error) {
        toast.error(error.message);
      } finally {
        stopLoading();
      }
    };

    loadData();
  }, []);

  const onSubmit = async (values) => {
    setFormValues(values);

    const playerProfile = {
      first_name: data?.firstName,
      last_name: data?.lastName,
      email: data?.email,
      password: data?.password,
      type: data?.type,
      gender: data?.gender,
      nationality: data?.nationality || values.nationality,
      playing_position:
        parseInt(data?.playingPosition) || parseInt(values.playingPosition),
      second_nationality: data?.secondNationality,
      motive: data?.motive || values.motive,
      dob: datePickerValue.toISOString().split('T')[0],
      // postcode: data?.postcode || values.postcode,
      sport: data?.sport,
    };

    try {
      const response = await createPlayerProfile(playerProfile);
      if (response.token) {
        // Check for each role and update user data if found
        const roles = ['venue_manager', 'player', 'coach', 'referee'];
        let userData = null;

        for (let role of roles) {
          if (
            response.extra_data[role] &&
            response.extra_data[role].length > 0
          ) {
            userData = response.extra_data[role][0].user;
            break;
          }
        }

        if (userData) {
          updateUserData(userData, { realId: response.id }); // Update global user data
          localStorage.setItem('token', response.token); // Save token to local storage
          router.push('/create_team');
        } else {
          toast.error('No user data found for any role');
        }
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const links = [
    { href: '/redeem_player_profile', text: 'Redeem Account' },
    { href: '/create_player_profile', text: 'Create Account' },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <HeaderButtons text="Player Profile" links={links} active="2" />
        <form
          className={styles.createPlayerProfile}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.createPlayerProfile__inputs}>
            <h1>Create a new Player Profile!</h1>
            <Dropdown
              name="playingPosition"
              placeholder="Playing Position"
              items={positions}
              {...register('playingPosition')}
            />
            <Dropdown
              name="motive"
              placeholder="Motive"
              items={constants.MOTIVES}
              {...register('motive')}
            />
            <Dropdown
              name="nationality"
              placeholder="Main Nationality"
              items={nations}
              {...register('nationality')}
            />
            <Dropdown
              name="secondNationality"
              placeholder="2nd Nationality"
              items={nations}
              {...register('secondNationality')}
            />
            <Input
              name="postcode"
              placeholder="First Half of Postcode"
              {...register('postcode')}
            />
            <div onClick={() => setIsDatePickerOpen(true)}>
              <MobileDatePicker
                value={datePickerValue}
                isOpen={isDatePickerOpen}
                onSelect={handleDatePickerSelect}
                onCancel={() => setIsDatePickerOpen(false)}
                name="DOB"
                placeholder="DOB"
              />
            </div>
          </div>
          <div className={styles.createPlayerProfile__button}>
            <Button
              text="Create Profile"
              color="blue"
              uppercase
              type="submit"
            />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}

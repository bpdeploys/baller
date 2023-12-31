import { useState, useEffect } from 'react';
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
import Header from '../../components/Layout/Header';

// Data
import constants from '../../utils/data/constants';

// Hooks
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';

// Services

import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';

// Context
import { useUserData } from '../../context/UserContext';

// Styles
import styles from './keydetails.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string().required('Your name is required'),
  lastName: yup.string().required('Your last name is required'),
  emailAddress: yup.string().required('Your email is required'),
  gender: yup.string().required('Your Gender is required'),
});

export default function KeyDetails() {
  const router = useRouter();
  const { userData } = useUserData();
  const resolver = useYupValidationResolver(validationSchema);
  const { register, setValue, handleSubmit } = useForm({
    resolver,
  });

  useEffect(() => {
    if (userData) {
      setValue('name', userData.proxy_name);
      setValue('lastName', userData.proxy_surname);
      setValue('emailAddress', userData.email.toLowerCase());
    }
  }, [userData, setValue]);

  const onSubmit = async (values) => {
    router.push('edit_redeemed_profile');
  };

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const shirtData = {
    squadNumber: userData?.squad_number[0]?.number || 10,
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Key details" textTransform="uppercase" />
        <form
          className={styles.keyDetails}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.keyDetails__inputs}>
            <div className={styles.keyDetails__shirt}>
              <RedeemPlayerShirt data={shirtData} />
              <h3>Details needed!</h3>
            </div>
            <Input name="name" placeholder="Name" {...register('name')} />
            <Input
              name="lastName"
              placeholder="Last name"
              {...register('lastName')}
            />
            <Input
              name="emailAddress"
              placeholder="Email address"
              {...register('emailAddress')}
            />
            <Dropdown
              name="gender"
              placeholder="Gender"
              {...register('gender')}
              items={constants.GENDERS}
            />
          </div>
          <div className={styles.keyDetails__button}>
            <Button text="Done" color="blue" uppercase type="submit" />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}

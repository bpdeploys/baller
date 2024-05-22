import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// Context
import { useUserData } from '../../context/UserContext';

// Components
import Header from '../../components/Layout/Header';
import Input from '../../components/Common/Input';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Hooks
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';

// Services
import { loginRequest } from '../../services/api';

// Styles
import styles from './login.module.scss';

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Please provide your email'),
  password: yup.string().required('Please provide your password.'),
});

export default function Login() {
  const router = useRouter();
  const resolver = useYupValidationResolver(validationSchema);
  const { register, handleSubmit } = useForm({
    resolver,
  });
  const { updateUserData, clearUserData } = useUserData();

  useEffect(() => {
    clearUserData();
  }, []);

  const onSubmit = async (values) => {
    const loginCredentials = {
      email: values.email,
      password: values.password,
    };

    try {
      clearUserData();
      const response = await loginRequest(loginCredentials);
      if (response.key) {
        const roles = ['venue_manager', 'player', 'coach', 'referee'];
        let userData = null;

        for (let role of roles) {
          if (response[role] && response[role].length > 0) {
            userData = response[role][0].user;
            break;
          }
        }

        if (userData) {
          updateUserData(userData);
          localStorage.setItem('token', response.key);
          router.push('/homewall');
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

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ScreenWrapper background="blue" image="blueLightning" positionY="240px">
        <Header text="Login into your BallerProfile" logo />
        <form
          className={styles.login}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.login__inputs}>
            <Input
              placeholder="Email address"
              color="white"
              name="email"
              {...register('email')}
            />
            <Input
              type="password"
              placeholder="Password"
              color="white"
              name="password"
              {...register('password')}
            />
          </div>
          <div className={styles.login__button}>
            <Button text="Login" color="white" type="submit" />
            <div>
              <span>Don't have an account?</span>
              <Link href="/register">Sign Up</Link>
            </div>
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}

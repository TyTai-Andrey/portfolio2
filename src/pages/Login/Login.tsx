import React, { useEffect } from 'react';

import styles from './Login.module.scss';

import Button from '@components/Button';
import Input from '@components/Input';
import { useHistory, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $auth, setAuth } from '@store/index';
import Form from '@components/Form';
import { schemaValidateLogin } from './utils';

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const auth = useStore($auth);

  useEffect(() => {
    if (auth?.token) {
      const from = location.state?.from || '/';

      history.push(from);
    }
  }, [auth, location]);

  return (
    <div className={styles.root} data-id='Input'>
      <Form
        className={styles.form}
        onSubmit={(fields: Record<string, string>) => {
          setAuth({ token: Object.values(fields).join('') });
        }}
        schema={schemaValidateLogin}
        name={'name'}
      >
        <Input className={styles.input} name='name' label='name' />
        <Input className={styles.input} name='password' label='password' />
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            variant='outlined'
            size='medium'
            type='reset'
          >
            reset
          </Button>
          <Button
            className={styles.button}
            variant='contained'
            size='medium'
            type='submit'
          >
            submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import './index.scss';
import './media.scss';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications } from 'react-notifications-component';

import { history } from './store';
import { ModalProvider } from '@components/ModalProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

ReactDOM.render(
  <Router history={history}>
    <ReactNotifications />
    <ThemeProvider theme={createTheme()}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root'),
);

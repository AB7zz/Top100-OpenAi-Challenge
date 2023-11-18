import React, { useEffect } from 'react';
import StackController from './src/Controllers/StackController';
import {StatusBar, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NotificationListener } from './src/Notification/NotificationListener';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import MainScreen from './src/Screens/MainScreen/MainScreen';

const App = () => {
  SplashScreen.hide();


  return (
    <>
    <Provider store={store}>

      <StatusBar
        backgroundColor={'white'}
        barStyle="dark-content"
      />
      <StackController />
      </Provider>
    </>
  );
};
export default App;

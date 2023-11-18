import {firebase} from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

import {NotificationManager} from './src/Notification/NotificationManager';
import {AppRegistry} from 'react-native';


firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    NotificationManager(
        {
          title: remoteMessage.data.TITLE,
          message: remoteMessage.data.MESSAGE,
          id: "remoteMessage.data.ID",
        }
      )
  } catch (error) {
    console.log('setBackgroundMessageHandler error!: ', error);
  }
});

AppRegistry.registerComponent(appName, () => App);

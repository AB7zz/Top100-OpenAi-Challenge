import PushNotification from 'react-native-push-notification';
import { NotificationManager } from './NotificationManager';
import axios, { Axios } from 'axios';
export const NotificationListener = () => {

  
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: async function (res) {
    //   dispatch(setFCMToken(res.token));
    console.log(res.token)
    try {
      await axios.post("", {fcm:res.token});
    } catch (error) {
      console.log("Error: "+error)
    }
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: async function (notification) {
      // console.log('NOTIFICATION: '+notification.data.MESSAGE);
      
      await NotificationManager(
        {
          title: notification.data.TITLE,
          message: notification.data.MESSAGE,
          id: "notification.data.MESSAGEID",
        }
      );

    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: false,
    requestPermissions: true,
  });
};

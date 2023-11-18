import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { DeviceEventEmitter, PermissionsAndroid, Platform } from 'react-native';
import Notification from 'react-native-push-notification';


export const ReginsterNotification = async () => {
  PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  ]);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFCMToken();
    CreateNotificationChannels();
  }

};

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  !fcmToken &&
    messaging()
      .getToken()
      .then(async token => {
        try {
          await AsyncStorage.setItem('fcmToken', token).then(() => {
          });
        } catch (error) {
          console.error('getFCMToken function: ', error);
        }
      });

  console.log(fcmToken)
};

// Create Notification Channel
export const CreateNotificationChannels =
  () => {
    Notification.channelExists(
      'edu_gpt_channel',
      channelExists => {
        !channelExists &&
          Notification.createChannel(
            {
              channelId: 'edu_gpt_channel',
              channelName: 'Edu GPT',
              playSound: true,
              importance: 4,
              channelDescription:
                'Channel for message notifications, with sound and vibration on',
              vibrate: true,
            },
            created => console.log('Edu GPT Channel created', created),
          );
      },
    );
  };


export const sendNotification = async notification => {
  console.log(notification)
  Notification.localNotification(notification);
};



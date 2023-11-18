const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {default: axios} = require('axios');
const {MD5} = require('crypto-js');

//! IOS MIGRATION
module.exports = async bundle => {
  try {
    var data = JSON.parse(bundle.userInfo);
    var timestamp = Date.now();
    var uniqueId = await AsyncStorage.getItem('@unique_id');
    var deviceId = data.DEVICEID;
    var auth =
      deviceId +
      '_' +
      MD5(uniqueId.replace(/\"/g, '') + 'e&Pdo!9xs' + timestamp) +
      '_' +
      timestamp;

    var baseUrl = "https://test.pickyassist.com/";

    switch (bundle.action) {
      case 'Accept':
        await axios.post(
          baseUrl+'mobile_app_api/teambox_api.php',
          {
            payload: {
              data: {
                auth: auth,
                notificationid: data.NOTIFICATIONID,
              },
              action: 'acceptMobileNotification',
            },
          },
        );

        break;
      case 'Reject':
        await axios.post(
          baseUrl+'mobile_app_api/teambox_api.php',
          {
            payload: {
              data: {
                auth: auth,
                notificationid: data.NOTIFICATIONID,
              },
              action: 'rejectMobileNotification',
            },
          },
        );

        break;

      case 'Snooze 10 min':
        await axios.post(
          baseUrl+'mobile_app_api/teambox_api.php',
          {
            payload: {
              data: {
                auth: auth,
                rem_id: data.REMINDERID,
                snooze_action: 'snooze_time',
                snooze_time: 10,
                added_from: 'mobile',
                reminder_time_old: 0,
              },
              action: 'call_snooze_from_api',
            },
          },
        );

        break;

      case 'Mark As Completed':
        try {
          if (!data.NOTEMANDATORY) {
            try {
              var res = await axios.post(
                baseUrl+'mobile_app_api/teambox_api.php',
                {
                  payload: {
                    data: {
                      auth: auth,
                      rem_id: data.REMINDERID,
                      update_upcoming: 0,
                      update_missing: 0,
                      added_from: 'mobile',
                      complte_note: 'note',
                    },
                    action: 'call_complete_from_api',
                  },
                },
              );
            } catch (error) {
              console.log(
                'BACKGRUND TASK API CALL \ncall_complete_from_api : ',
                error,
              );
            }
          } else {
            // PushNotification.invokeApp(bundle);
          }
        } catch (error) {
          console.log('ERROR!', error);
        }

        break;
      default:
        break;
    }
  } catch (error) {
    // handle error
    console.error('HEADLESS ERROR');
  }
};

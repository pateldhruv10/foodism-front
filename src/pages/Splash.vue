<template>
  <div class="splash-screen">
    <q-layout view="lhh LpR lff">
      <q-img :src="require('src/assets/splash-screen02_3.gif')" />
    </q-layout>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { LocalStorage, SessionStorage } from 'quasar';
import { PushNotifications } from '@capacitor/push-notifications';
const route = useRouter();
setTimeout(() => {
  route.push({ name: 'web-home' })
}, 0)



const addListeners = async () => {
  // console.log("123");
  await PushNotifications.addListener('registration', token => {
  //   console.log("1235s");
    console.info('Food Registration token: ', token.value);
    // console.log(token.value);
    LocalStorage.set("fcmtoken", token.value);
    // let value = LocalStorage.getItem("fcmtoken");
    // console.log(value);
    // SessionStorage.set("fcmtoken1", token.value);
    // let value1 = SessionStorage.getItem("fcmtoken1");
    // console.log(value1);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Food Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Food Push notification received: ', notification.title);

  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Food Push notification action performed', notification.actionId, notification.inputValue);
  });
}
addListeners();
const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

 await PushNotifications.register();
}
//registerNotifications();
const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}
//getDeliveredNotifications();
</script>
<style lang="scss">
  // $
  .splash-screen{
    .q-layout{
      height: 100vh;
      display: flex;
      align-items: center;
      background: #e74122 !important;
      .q-img{
        height: 350px;
      }
    }
  }
  
</style>

// <reference types="@capacitor/push-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: "1037609800511-7fslv2osn9e4in2gpm08b4gb98neck5s.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
      }
  },
  "appId": "com.foodism.app",
  "appName": "Foodism",
  "bundledWebRuntime": false,
  "webDir": "www",
};

export default config; 
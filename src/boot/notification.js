import { Notify } from "quasar";

export default {
  error(message) {
    Notify.create({
      type: "negative",
      message: message,
      timeout: process.env.NOTIFICATION_TIMEOUT
    });
  },

  success(message) {
    Notify.create({
      type: "positive",
      message: message,
      timeout: process.env.NOTIFICATION_TIMEOUT
    });
  },

  info(message) {
    Notify.create({
      message: message,
      timeout: process.env.NOTIFICATION_TIMEOUT
    });
  },
};

import { DialogPack } from "../configs/DialogConstants";

export const EventBus = {
  on(event, callback) {
    document.addEventListener(event, e => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export const ShowLoading = (message = []) => {
  if (message && !Array.isArray(message)) {
    message = [message];
  }
  EventBus.dispatch("loading", { showLoading: true, loadingMessage: message });
};

export const HideLoading = () => {
  EventBus.dispatch("loading", { showLoading: false, loadingMessage: "" });
};

export const ShowDialog = (dialogPack, priority = 10) => {
  dialogPack.showDialog = true;
  EventBus.dispatch("dialog", {
    dialogPack: dialogPack,
    priority: priority,
  });
};

export const HideDialog = (gameKey = "") => {
  EventBus.dispatch("dialog", {
    showDialog: false,
    dialogPack: DialogPack,
    priority: 0,
  });
};

export const ShowGlobalNotification = (gameKey, title, message) => {
  EventBus.dispatch("global-notification", {
    errorOccured: true,
    errorOccuredTitle: title,
    errorOccuredMessage: message,
    gameKey: gameKey,
  });
};

export const ClearNotification = gameKey => {
  EventBus.dispatch("global-notification-clear", { gameKey: gameKey });
};

export const ShowSnackbar = message => {
  EventBus.dispatch("snackbar", { message: message });
};

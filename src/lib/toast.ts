import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
}

export function showToast({
  title = 'Error',
  message,
  type = 'error',
}: ToastOptions) {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
  });
}

export function showSuccessToast(message: string) {
  showToast({
    title: 'Success',
    message,
    type: 'success',
  });
}

export function showErrorToast(message: string) {
  showToast({
    title: 'Error',
    message,
    type: 'error',
  });
}

export function showInfoToast(message: string) {
  showToast({
    title: 'Info',
    message,
    type: 'info',
  });
}

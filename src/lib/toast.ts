import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
}

export function showToast({ title, message, type = 'info' }: ToastOptions) {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'bottom',
    visibilityTime: 4000,
    autoHide: true,
  });
}

export function showSuccessToast(message: string, title?: string) {
  showToast({ title, message, type: 'success' });
}

export function showErrorToast(message: string, title?: string) {
  showToast({ title, message, type: 'error' });
}

export function showInfoToast(message: string, title?: string) {
  showToast({ title, message, type: 'info' });
}

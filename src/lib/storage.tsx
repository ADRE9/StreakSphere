import * as SecureStore from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';

// Create a 32-byte encryption key (must be exactly 32 bytes)
const ENCRYPTION_KEY = 'streaksphere_encryption_key_32bytes!';

// Initialize storage synchronously
export const storage = new MMKV({
  id: 'streaksphere-storage',
  encryptionKey: ENCRYPTION_KEY,
});

// Use SecureStore for sensitive data
export async function getSecureItem<T>(key: string): Promise<T | null> {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting secure item:', error);
    return null;
  }
}

export async function setSecureItem<T>(key: string, value: T): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting secure item:', error);
  }
}

export async function removeSecureItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error removing secure item:', error);
  }
}

// Non-sensitive data operations
export function getItem<T>(key: string): T | null {
  try {
    const value = storage.getString(key);
    return value ? JSON.parse(value) || null : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    storage.delete(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

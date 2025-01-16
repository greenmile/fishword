import PocketBase from 'pocketbase';

const pb = new PocketBase('http://129.154.43.50');

// Function to log in a user
export async function login(email, password) {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return authData;
  } catch (err) {
    console.error('Failed to log in:', err);
    throw err;
  }
}

// Function to log out a user
export function logout() {
  pb.authStore.clear();
}

// Function to get the current user
export function getCurrentUser() {
  return pb.authStore.model;
}

// Function to check if the user is authenticated
export function isAuthenticated() {
  return pb.authStore.isValid;
}
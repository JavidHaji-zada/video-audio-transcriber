// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const init = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyAbpjSIgZhQvqBW8xfl98Z2AOsaEqDFCRo',
    authDomain: 'video-audio-transcriber-8dd7c.firebaseapp.com',
    projectId: 'video-audio-transcriber-8dd7c',
    storageBucket: 'video-audio-transcriber-8dd7c.appspot.com',
    messagingSenderId: '349672854502',
    appId: '1:349672854502:web:5736a36d9162385c6f3c27',
  };
  // Initialize Firebase
  initializeApp(firebaseConfig);
};

const FIREBASE_UTILS = {
  init,
};

export default FIREBASE_UTILS;

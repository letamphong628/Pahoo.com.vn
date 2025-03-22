
// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBU0ycoLru5ZUZsKFKskJ_PrKFYvf1PXfg",
    authDomain: "pahoo-b33c0.firebaseapp.com",
    projectId: "pahoo-b33c0",
    storageBucket: "pahoo-b33c0.appspot.com",
    messagingSenderId: "250563387030",
    appId: "1:250563387030:web:b128786f2172d57445acb7",
    measurementId: "G-KEBBHMXV7H"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

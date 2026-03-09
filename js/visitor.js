const firebaseConfig = {
  apiKey: "AIzaSyDHm_XDLHM7N-LJyIZdDo6T8t8UJvtj5-c",
  authDomain: "visitorportfolio-3d2ae.firebaseapp.com",
  projectId: "visitorportfolio-3d2ae",
  storageBucket: "visitorportfolio-3d2ae.firebasestorage.app",
  messagingSenderId: "956958362720",
  appId: "1:956958362720:web:bda11abd82e005f1de8705",
  measurementId: "G-3241EGY9TS",
  databaseURL: "https://visitorportfolio-3d2ae-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const totalRef = database.ref("visitors/count");
const liveRef = database.ref("visitors/live");

// Total visitors
if (!sessionStorage.getItem('visited')) {
  totalRef.once("value")
    .then(snapshot => {
      let count = snapshot.exists() ? snapshot.val() : 0;
      count += 1;
      return totalRef.set(count).then(() => count);
    })
    .then(updatedCount => {
      document.getElementById("visitorCount").textContent = updatedCount;
      sessionStorage.setItem('visited', 'true');
    });
} else {
  totalRef.on("value", snapshot => {
    document.getElementById("visitorCount").textContent = snapshot.val();
  });
}

// Live visitors
const sessionId = "id_" + Math.random().toString(36).substr(2, 9);
const liveUserRef = liveRef.child(sessionId);

// Add self to live visitors
liveUserRef.set(true);

// Auto-remove on disconnect or close
liveUserRef.onDisconnect().remove();

// Show live visitor count
liveRef.on("value", snapshot => {
  const liveCount = snapshot.exists() ? snapshot.numChildren() : 0;
  document.getElementById("liveVisitorCount").textContent = liveCount;
});

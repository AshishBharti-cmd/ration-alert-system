const enteredPassword = prompt("Enter admin password:");

if (enteredPassword === "1234") {

  document.getElementById("dashboard").style.display = "block";

} else {

  alert("Wrong password");
  document.body.innerHTML = "<h2>Access Denied</h2>";

  throw new Error("Unauthorized");

}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
//   apiKey: "YOUR_KEY",
//   authDomain: "YOUR_AUTH",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_BUCKET",
//   messagingSenderId: "YOUR_ID",
//   appId: "YOUR_APP_ID"
apiKey: "AIzaSyCc-FPOiqospHw5ichw4D2Xxj3u7BHXl64",
  authDomain: "ration-alert-system.firebaseapp.com",
  projectId: "ration-alert-system",
  storageBucket: "ration-alert-system.firebasestorage.app",
  messagingSenderId: "539432386575",
  appId: "1:539432386575:web:8eb3a8a4c66e6395d0237a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.updateStatus = async function () {
  const wheat = document.getElementById("wheat").value;
  const sugar = document.getElementById("sugar").value;
  const oil = document.getElementById("oil").value;
  const message = document.getElementById("message").value;

  await setDoc(doc(db, "ration", "status"), {
    wheat: wheat,
    sugar: sugar,
    oil: oil,
    message: message,
    lastUpdated: new Date().toLocaleString()
  });

  alert("Status Updated Successfully!");
};
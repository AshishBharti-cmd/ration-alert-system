import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCc-FPOiqospHw5ichw4D2Xxj3u7BHXl64",
  authDomain: "ration-alert-system.firebaseapp.com",
  projectId: "ration-alert-system",
  storageBucket: "ration-alert-system.firebasestorage.app",
  messagingSenderId: "539432386575",
  appId: "1:539432386575:web:8eb3a8a4c66e6395d0237a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const monthElement = document.getElementById("month");
const wheatElement = document.getElementById("wheat");
const sugarElement = document.getElementById("sugar");
const oilElement = document.getElementById("oil");
const messageElement = document.getElementById("message");
const lastUpdatedElement = document.getElementById("lastUpdated");

// Set current month in Hindi
const now = new Date();
const month = now.toLocaleString("default", { month: "long", year: "numeric" });
monthElement.innerText = "महीना: " + month;


// This function handles BOTH Hindi translation AND color
function setStatus(element, status) {

  if (status === "Available") {
    element.innerText = "उपलब्ध";
    element.className = "available";
  } 
  else if (status === "Not Available") {
    element.innerText = "उपलब्ध नहीं";
    element.className = "not-available";
  } 
  else {
    element.innerText = status;
    element.className = "";
  }

}


// Fetch data from Firebase
async function fetchData() {

  const docRef = doc(db, "ration", "status");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const data = docSnap.data();

    setStatus(wheatElement, data.wheat);
    setStatus(sugarElement, data.sugar);
    setStatus(oilElement, data.oil);

    if (data.message && data.message.trim() !== "") {
  messageElement.innerText = data.message;
} else {
  messageElement.innerText = "अभी तक कोई सूचना नहीं";
}
    lastUpdatedElement.innerText = "अंतिम अपडेट: " + data.lastUpdated;

  }

}

fetchData();
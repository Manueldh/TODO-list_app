import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, push, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCut67-ikjJJKtCeHawuAnPgxIPWmUzulo",
    authDomain: "todo-app-e24db.firebaseapp.com",
    projectId: "todo-app-e24db",
    storageBucket: "todo-app-e24db.appspot.com",
    messagingSenderId: "981480301377",
    appId: "1:981480301377:web:da49ae1751cc311deeb7c0"
  };

  const appSettings = {
    databaseURL: "https://todo-app-e24db-default-rtdb.europe-west1.firebasedatabase.app/"
  }

  // Initialize Firebase
  const app = initializeApp(appSettings);
  const database = getDatabase(app)
  const toDoListInDB = ref(database, "TODO-List")


  
const datumP = document.getElementById("date-el")
const date = Date()

datumP.textContent = date.slice(0, 15)


const addBtn = document.getElementById("add-btn")
const overlay = document.getElementById("overlay")
const closeOverlay = document.getElementById("overlay-closing")

addBtn.addEventListener("click", function(){
    overlay.classList.add("open");
})

closeOverlay.addEventListener("click", function(){
    overlay.classList.remove("open")
})


const saveBtn = document.getElementById("save-btn")
let listArray = [
    {
    "task": "test",
    "notes": "note"
    }
]


function createOl() {
  onValue(toDoListInDB, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key
      const childData = childSnapshot.val()
      
  function addListItem() {
    const ol = document.getElementById("todo-ol")
        
    ol.innerHTML += `
     <li>
      <h2>${childData.task}</h2>
      <p>${childData.notes}</p>
     </li>
     `
    }
    addListItem()
    })
  })
}

// Zorgt ervoor dat de database correct gedisplayed wordt.
createOl()

// Als er geklikt wordt dan wordt de input naar de databse gestuurd, dan wordt de createOl() functie geroepen zodat de database weer gedisplayed wordt. En ook wordt de overlay gesloten.
saveBtn.addEventListener("click", function(){
    const inputTask = document.getElementById("input-task").value
    const inputNotes = document.getElementById("input-notes").value

    // listArray.unshift({
    //     "task": `${inputTask}`,
    //     "notes": `${inputNotes}`
    // })
    // listArray.forEach((element) => console.log(element.task))

    push(toDoListInDB, {
        "task": `${inputTask}`,
        "notes": `${inputNotes}`
    })

    createOl()
    overlay.classList.remove("open")
    

})


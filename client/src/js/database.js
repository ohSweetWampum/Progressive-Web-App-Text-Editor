// Importing IndexedDB utility function
import { openDB } from "idb";

// Function for initializing the database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      // If jate database already exists, log the info and exit
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }

      // Create a new object store for jate with autoIncrement key
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created"); // Log the creation of new database
    },
  });

// Function for adding content to the database
export const putDb = async (content) => {
  console.log("PUT item to the indexedDB");

  const jateDb = await openDB("jate", 1); // Opening the database

  // Creating a transaction object for writing into the database
  const tx = jateDb.transaction("jate", "readwrite");

  // Accessing the jate object store
  const ObjStore = tx.objectStore("jate");

  // Adding or updating content in the object store
  const Request = ObjStore.put({ id: 1, content: content });

  // Logging the completed request
  const result = await Request;
  console.log("data has been saved to the database", result);
};

// Function for fetching content from the database
export const getDb = async () => {
  console.log("GET from the indexedDB");

  const jateDb = await openDB("jate", 1); // Opening the database

  // Creating a transaction object for reading from the database
  const tx = jateDb.transaction("jate", "readonly");

  // Accessing the jate object store
  const ObjStore = tx.objectStore("jate");

  // Fetching all data from the object store
  const Request = ObjStore.getAll();

  // Logging the fetched data
  const result = await Request;
  console.log("result.value", result);

  return result?.value; // Returning the fetched data
};

initdb(); // Initializing the database

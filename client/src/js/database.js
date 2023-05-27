// Importing IndexedDB utility function
import { openDB } from "idb";

// Function for initializing the database
const initdb = async () => {
  try {
    const jateDb = await openDB("jate", 1, {
      upgrade(db) {
        // If jate database already exists, log the info and exit
        if (db.objectStoreNames.contains("jate")) {
          console.log("This database already exists");
          return;
        }

        // Create a new object store for jate with autoIncrement key
        db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
        console.log("jate database has been created"); // Log the creation of new database
      },
    });

    return jateDb;
  } catch (error) {
    console.error("Failed to initialize the database:", error);
  }
};

// Function for adding content to the database
export const putDb = async (content) => {
  try {
    console.log("PUT item to the indexedDB");

    const jateDb = await initdb(); // Initialize the database

    // Creating a transaction object for writing into the database
    const tx = jateDb.transaction("jate", "readwrite");

    // Accessing the jate object store
    const objStore = tx.objectStore("jate");

    // Adding or updating content in the object store
    const request = objStore.put({ id: 1, content: content });

    // Logging the completed request
    const result = await request;
    console.log("Data has been saved to the database", result);
  } catch (error) {
    console.error("Failed to put data into the database:", error);
  }
};

// Function for fetching content from the database
export const getDb = async () => {
  try {
    console.log("GET from the indexedDB");

    const jateDb = await initdb(); // Initialize the database

    // Creating a transaction object for reading from the database
    const tx = jateDb.transaction("jate", "readonly");

    // Accessing the jate object store
    const objStore = tx.objectStore("jate");

    // Fetching all data from the object store
    const request = objStore.getAll();

    // Logging the fetched data
    const result = await request;
    console.log("result.value", result);

    return result?.value; // Returning the fetched data
  } catch (error) {
    console.error("Failed to get data from the database:", error);
    return null;
  }
};

initdb(); // Initializing the database

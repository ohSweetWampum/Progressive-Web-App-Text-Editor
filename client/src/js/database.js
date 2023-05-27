import { openDB } from "idb";

const initdb = async () => {
  return openDB("jate", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("jate")) {
        db.createObjectStore("jate");
      }
    },
  });
};

export const putDb = async (content) => {
  console.log("PUT into the database");

  const db = await initdb();
  const tx = db.transaction("jate", "readwrite");
  await tx.objectStore("jate").put(content, "contentKey");

  console.log("Successfully added content");
};

export const getDb = async () => {
  console.log("GET from the database");

  const db = await initdb();
  const tx = db.transaction("jate", "readonly");
  return tx.objectStore("jate").get("contentKey");
};

// Initialize the database when the module is loaded.
initdb();

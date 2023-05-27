import { openDB } from "idb";

const initdb = async () => {
  return openDB("jate", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("jate")) {
        // Specify keyPath to use in-line keys
        db.createObjectStore("jate", { keyPath: "id" });
      }
    },
  });
};

let nextId = 0;

export const putDb = async (content) => {
  console.log("PUT into the database");

  const jateDb = await initdb();
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");

  // Each piece of content gets its own key.
  const request = store.add({ content: content }, nextId++);

  const result = await request;
  console.log("Successfully added content", result);
  return result;
};

export const getDb = async () => {
  console.log("GET from the database");

  const db = await initdb();
  const tx = db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");

  const contents = [];
  let cursor = await store.openCursor();

  while (cursor) {
    contents.push(cursor.value.content);
    cursor = await cursor.continue();
  }

  return contents;
};

// Initialize the database when the module is loaded.
initdb();

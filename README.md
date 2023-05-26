# PWA Text Editor

A progressive web application that is a text editor

## Website

[Click here to visit the app](https://text-editor-mtg.herokuapp.com/)

## Description

The PWA Text Editor is a Progressive Web Application that allows for offline functionality so that developers can create, store, and retrieve notes or code snippets. It utilizes Node.js, Express.js, and IndexedDB, the app also uses the idb package for data persistence. With workbox, I have enabled service workers for offline management, with webpack bundling our JavaScript files to be loaded. Once you visit the site, you can install it on your desktop, this is made possible via a manifest file and a service worker generated through webpack plugins.

## Installation

Navigate to the site and click "install!"

## Table of Contents

- [Website](#website)
- [Description](#description)
- [Installation](#installation)
- [Technology](#technology)
- [Usage](#usage)
- [Image](#image)
- [Code](#code)
- [Learning](#learning)
- [Author](#author)
- [Credits](#credits)
- [Contributing](#Contributing)
- [Questions](#questions)
- [License](#license)

## Technology

- Express.js
  [Learn about Express.js](https://expressjs.com/)

- Node.js
  [Learn about Node.js](https://nodejs.org/en)

- IndexedDB
  [Learn about IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

- JavaScript
  [Learn about JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- idb
  [Learn about idb](https://www.npmjs.com/package/idb)

- Workbox
  [Learn about Workbox](https://dev.to/noconsulate/react-pwa-with-workbox-6dl)

- Git
  [Learn about Git](https://git-scm.com/)

## Usage

The PWA Text Editor is a user-friendly app that lets you easily create and edit text or code snippets. Simply open the app, type your content, and it will be automatically saved. Even when you're offline, you can access and work on your saved data. Enjoy the convenience of a reliable text editor with offline capabilities, making it easy to stay productive wherever you are.

# Image

![Alt Text](/client/src/images/Screenshot%202023-05-25%20at%2011.43.56%20PM.png)

## Code

I wanted to highlight this code snippet because the putDb function in the PWA Text Editor is essential for storing user-entered content in the IndexedDB database. It establishes a connection to the database, creates a transaction, and adds the content to the object store. This ensures that the data is persisted and can be retrieved later, even when offline. The function plays a crucial role in allowing users to save and access their text or code snippets reliably.

```JavaScript
 // Export a function we will use to PUT into the database.
export const putDb = async (content) => {
  console.log("PUT into the database");

  // Create a connection to the database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .add() method to add the content into the database.
  const request = store.add(content);

  // Wait for the transaction to complete.
  await tx.done;

  // Get confirmation of the request.
  const result = await request;
  console.log("Successfully added content", result);
  return result;
};

```

## Learning

- IndexedDB
- idb
- Manifest.json
- Webpack
- Workbox

## Author

Matthew Gibson

- [Portfolio](https://github.com/ohSweetWampum)
- [LinkedIn](https://www.linkedin.com/in/matthew-gibson-6b9b12237/)
- [Github](https://github.com/ohSweetWampum)

## Credits

- Thanks to all the instructors and the in-class examples/activities they provided were especially helpful for this application.

## Contributing

If you would like to contribute, please contact me at [mtgibson888@gmail.com](mailto:mtgibson888@gmail.com)

## Questions

If you have any questions about this application, please contact me at [mtgibson888@gmail.com](mailto:mtgibson888@gmail.com) or check out my [GitHub Profile](https://github.com/ohSweetWampum)

## License

This application is covered by the MIT license

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

```

```

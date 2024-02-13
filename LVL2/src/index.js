import "../css/styles.css";
import "../src/react.png";

import { someFunction } from "lodash";
import myModule from "myModule";

document.getElementById("click-counter").addEventListener("click", () => {
  import("./ClickCounter")
    .then((module) => {
      module.default();
    })
    .catch((err) => {
      console.error("An error occured while loading Click Counter");
    });
});

document.getElementById("module2").addEventListener("click", () => {
  import("/path/to/module2")
    .then((module) => {
      module.default();
    })
    .catch((err) => {
      console.error("An error occured while loading module2");
    });
});

console.log("Hello World");

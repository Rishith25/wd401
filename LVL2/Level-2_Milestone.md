# WD401 Level-2 Submission Documentation

## Problem Statement:

In your new role as a Web Developer, you're assigned to a project that involves optimizing the integration of JavaScript into a web application. The team emphasizes the importance of efficient JS bundling for enhanced application performance. As you embark on the development task, challenges related to bundling, code splitting, lazy loading, and the implementation of import maps surface. Your role is to address these challenges, showcasing your ability to optimize JS integration and explore advanced bundling techniques. The team is particularly interested in your practical application of concepts such as code splitting, lazy loading, and import maps to improve the application's overall performance.

### Configuring Webpack

Webpack is a powerful and popular module bundler for JavaScript applications. It's often used in modern web development workflows to bundle together various assets and dependencies of a web application into a single file (or multiple files), making it easier to manage, deploy, and optimize.

#### webpack.config.js

This is the basic Webpack configuration file (webpack.config.js) that handles various file types and assets including CSS and images efficiently:

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of the application
  output: {
    filename: "bundle.js", // Output bundle filename
    path: path.resolve(__dirname, "dist"), // Output directory path
    assetModuleFilename: "assets/[hash][ext][query]", // Configure asset filenames
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Match CSS files
        use: ["style-loader", "css-loader"], // Use style-loader to inject CSS into the DOM and css-loader to handle CSS imports
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Match image files
        type: "asset/resource", // Use asset/resource to emit the file as a separate asset
        generator: {
          filename: "images/[hash][ext][query]", // Configure output filename for images
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Match font files
        type: "asset/resource", // Use asset/resource to emit the file as a separate asset
        generator: {
          filename: "fonts/[hash][ext][query]", // Configure output filename for fonts
        },
      },
    ],
  },
  mode: "development",
};
```

• Module Bundling: Webpack is primarily known for its module bundling capabilities. It treats all our code and assets as modules, including JavaScript files, CSS files, images, fonts, etc. These modules are then processed and combined into a dependency graph, which webpack uses to generate one or more bundles.

#### index.js

![image](https://github.com/Rishith25/gitflow/assets/119791436/85e87fa2-f0de-491a-9a37-7b61ebf8d7c3)

After webpack JavaScript bundling the following files are saved in “dist” folder and the bundle.js file is created and images folder is also created.

![image](https://github.com/Rishith25/gitflow/assets/119791436/1b18d0fa-7976-4776-96ba-a5ae8128ffd7)

##### Exaplanation:

###### 1. Entry Point and Output Configuration:

- **entry:** This specifies the entry point of the application. In this case, it's "./src/index.js".
- **output:** This object defines where webpack will emit the bundled files and what filenames to use.
- **filename:** Specifies the name of the bundled JavaScript file. In this case, it's "bundle.js".
- **path:** Specifies the directory where the output bundle will be emitted. It uses path.resolve to ensure the path is resolved correctly.
- **assetModuleFilename:** This option allows you to configure the filenames for assets emitted by webpack.

###### 2. Module Rules:

- These rules define how webpack should handle different types of files encountered during the bundling process.
- **test:** Regular expressions used to match file extensions.
- **use or type:** Specifies the loaders or asset types to use for processing matched files.
- **generator:** Specifies the options for emitting assets, including the filename configuration.

###### 3. CSS Files Rule:

- **test:** Matches files with a .css extension.
- **use:** Specifies the loaders to process CSS files. style-loader injects CSS into the DOM, and css-loader handles CSS imports.

###### 4. Image Files Rule:

- **test:** Matches image files with extensions like .png, .svg, .jpg, .jpeg, or .gif.
- **type:** "asset/resource": Specifies that these files should be emitted as separate assets.
- **generator:** Configures the output filename for images, placing them in the images directory.

###### 5. Font Files Rule:

- **test:** Matches font files with extensions like .woff, .woff2, .eot, .ttf, or .otf.
- **type:** "asset/resource": Specifies that these files should be emitted as separate assets.
- **generator:** Configures the output filename for fonts, placing them in the fonts directory.

###### 6. Mode:

- **mode:** "development": Sets the mode to development. This enables development-specific features and optimizations provided by webpack.

### Advanced Bundling Techniques

#### Code Splitting

Code splitting is a pivotal technique in contemporary web development, offering a solution to the challenge of managing large codebases efficiently. By breaking down a monolithic codebase into smaller, more manageable modules or bundles, developers can streamline the loading process and enhance performance.

##### Implementation

- If we have a large application with different module and features. We can split this feature into separate bundles.

- webpack.config.js

```js
-webpack.config.js;
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of the application
  output: {
    filename: "bundle.js", // Output bundle filename
    path: path.resolve(__dirname, "dist"), // Output directory path
    assetModuleFilename: "assets/[hash][ext][query]", // Configure asset filenames
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Match CSS files
        use: ["style-loader", "css-loader"], // Use style-loader to inject CSS into the DOM and css-loader to handle CSS imports
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Match image files
        type: "asset/resource", // Use asset/resource to emit the file as a separate asset
        generator: {
          filename: "images/[hash][ext][query]", // Configure output filename for images
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Match font files
        type: "asset/resource", // Use asset/resource to emit the file as a separate asset
        generator: {
          filename: "fonts/[hash][ext][query]", // Configure output filename for fonts
        },
      },
    ],
  },
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

- index.js

```js
import "../css/styles.css";
import "../src/react.png";

// Code Splitting

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
```

###### Benefits of Code Splitting:

- 1. **Faster Loading:** It makes your website load quicker because it only loads the necessary parts when they're needed, rather than all at once.
- 2. **Less Memory Used:** By loading only what's needed, it saves memory, making your website run smoother and faster.
- 3. **Easier to Manage:** It breaks your code into smaller pieces, making it easier to work with and update. You can focus on one part at a time, without having to deal with the whole thing.

#### Lazy Loading

Lazy loading is another indispensable technique for optimizing web applications, particularly in scenarios where loading resources upfront can lead to slower performance and increased bandwidth usage. The concept revolves around loading resources asynchronously, typically when they are required during runtime rather than upfront.

##### Implementation

- Load the files when needed for the application and define the routes and use lazy loader from React

- index.js

```js
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Account = lazy(() => import("./Account"));
const Transaction = lazy(() => import("./Transaction"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/transaction" component={Transaction} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
```

###### Benefits of Lazy Loading:

- 1. **Speeds Up Initial Load:** Lazy loading delays the loading of non-essential parts of your website until they're actually needed, making the initial loading time faster.
- 2. **Better User Experience:** It prioritizes loading important parts first, making the website feel more responsive and pleasant to use.
- 3. **Saves Data:** Since it doesn't load everything at once, lazy loading helps conserve data, which is great for users with limited plans or slower connections.

### Introduction to Import Maps

Import maps are a newer tool in web development that help manage how JavaScript modules are loaded in applications. Instead of bundling all the code together into one big file like traditional methods do, import maps let you specify which modules should be loaded from where, using a simple JSON-like format.

#### Concept of Import Maps:

The primary concept behind import maps is to decouple module loading from the application logic, providing more flexibility and control over how modules are resolved and fetched. Instead of relying on static bundling processes to resolve module dependencies, import maps allow developers to specify mappings between module specifiers (e.g., package names or paths) and their corresponding URLs.

#### Advantages of Import Maps over Traditional Bundling Approaches:

- 1. **Dynamic Loading:** You can load modules on the fly as your application runs, rather than all at once at the beginning. This can help speed up your app's initial load time and make it feel more responsive.
- 2. **Easier Dependency Management:** Instead of bundling all your dependencies together into one big file, import maps let you manage them individually. This makes it easier to update dependencies and keep your code organized.
- 3. **Less Overhead:** By only loading the modules you need when you need them, import maps can reduce the amount of unnecessary code that gets loaded. This can improve your app's performance and save bandwidth.
- 4. **Better Caching:** Import maps make it easier for browsers to cache individual modules separately. This means returning visitors can load your app faster because they don't need to download everything again.

So, import maps are particularly useful for large applications with lots of dependencies or for situations where we need to load modules dynamically based on user interactions or other runtime conditions. They give us more control over how our code is loaded and can help make our applications faster and more efficient.

### Implementing Import Maps

- Implementing import maps into real-world projects involves several steps, including defining the import map, updating module import statements, and handling any compatibility issues across different browsers.
- index.js

- Update Module Import Statements:

Replace existing module import statements with module specifiers defined in the import map.

- - Before:

```js
import { someFunction } from "lodash";
import myModule from "./myModule.js";
```

- - After:

```js
import { someFunction } from "lodash";
import myModule from "myModule";
```

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=], initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    Hello World
    <script src="src/index.js"></script>
    <script type="importmap" src="./import-map.json"></script>
  </body>
</html>
```

- import-map.json

```json
{
  "imports": {
    "lodash": "/path/to/lodash.js",
    "myModule": "/path/to/myModule.js",
    "axios": "/path/to/axios"
  }
}
```

##### Compatibility and Limitations:

Import maps are supported in modern browsers like Chrome, Firefox, and Edge. However, support may be limited or absent in older browsers like Internet Explorer.
To ensure compatibility, consider using a polyfill or alternative approaches for browsers that do not support import maps. For instance, you might use a bundler like Webpack or Rollup to handle module loading in older browsers.

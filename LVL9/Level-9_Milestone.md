# WD401 Level-9 Submission Documentation

## Error Tracking System:

### Tools and Libraries

For error tracking, we recommend integrating one of the following third-party tools or libraries:

- **Sentry**: Sentry is a popular error tracking and monitoring tool that provides real-time insights into application errors. It supports various platforms and programming languages, including JavaScript/React.

- **Rollbar**: Rollbar is another widely used error tracking solution that offers real-time error monitoring, alerting, and debugging features. It also supports JavaScript/React applications.

### Sentry is a powerful tool for error logging and monitoring. It includes features like:

- **Real-time error tracking**: Sentry provides real-time visibility into errors as they occur, enabling quick response and resolution.

- **Contextual information**: Sentry captures additional contextual information about errors, such as user data, environment details, and more.

- **Integrations**: It integrates with various platforms, frameworks, and languages, making it versatile for different tech stacks.

### Install

Sentry captures data by using an SDK within your application’s runtime.

```bash
npm install --save @sentry/react
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/c6fdcea5-3f29-4585-97cd-57c95d3c59fa)

### Configure

Configuration should happen as early as possible in your application's lifecycle.

Sentry supports multiple versions of React Router.

`index.tsx`

```tsx
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { ThemeProvider } from "./context/theme.js";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://cbbb92312eada27c9f41c5892921e892@o4506932182712320.ingest.us.sentry.io/4506938086457344",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

Once this is done, all unhandled exceptions are automatically captured by Sentry.

### Add Error Boundary

If you're using React 16 or above, you can use the Error Boundary component to automatically send Javascript errors from inside a component tree to Sentry, and set a fallback UI

### Testing

After integrating the error tracking system, thoroughly test the application to ensure that errors are being captured and logged correctly. Generate test errors by deliberately triggering exceptions or encountering edge cases within the application. Verify that alerts/notifications are triggered as expected for critical errors.

![image](https://github.com/Rishith25/gitflow/assets/119791436/36c0d829-0755-4857-8653-b5700b4f1e3b)

![image](https://github.com/Rishith25/gitflow/assets/119791436/dedbc572-3cf8-45f1-b8d9-79992d0d04de)

![image](https://github.com/Rishith25/gitflow/assets/119791436/b63841f2-4145-49fc-a8c1-358add597e18)

![image](https://github.com/Rishith25/gitflow/assets/119791436/071374d1-c09b-46f8-8297-bdc342e36584)

![image](https://github.com/Rishith25/gitflow/assets/119791436/3ce50c25-7ece-4bd8-a71d-927f969bccb5)

### Add Readable Stack Traces to Errors

#### Automatic Setup

The easiest way to configure uploading source maps with tsc and sentry-cli is by using the Sentry Wizard:

`npx @sentry/wizard@latest -i sourcemaps`

The wizard will guide you through the following steps:

- Logging into Sentry and selecting a project

- Installing the necessary Sentry packages

- Configuring your build tool to generate and upload source maps

- Configuring your CI to upload source maps

```tsx
import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  plugins: [
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "rishith",
      project: "wd301",
    }),
  ],
});
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/6e0a9589-34d7-4874-afba-d14d1c9d9d3f)
![image](https://github.com/Rishith25/gitflow/assets/119791436/bc97eb2a-c893-4a4e-a151-9299b015e34f)
![image](https://github.com/Rishith25/gitflow/assets/119791436/7fe6cf50-235f-4a9e-a0ee-e2cb88adc0d6)
![image](https://github.com/Rishith25/gitflow/assets/119791436/9aabb402-adb8-476a-8aaf-526508c60eba)

## Debugger Capability:

### Introduction

Debugging is a crucial skill for developers. Various approaches and tools are available to help identify and resolve issues in the code we wrote.

- **Console Logging**: We can use `console.log()` statements to output specific values, messages, or variables to the browser console. While this may be simple and easy to implement, it provides limited visibility into the state of the application at a specific moment. Also, it may clutter the codebase if not removed after debugging.

Eg:

```tsx
export default function ProjectListItems() {
  let state: any = useProjectsState();
  const { projects, isLoading, isError, errorMessage } = state;

  console.log(projects); //Console Log Statement for debugging

  if (projects.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return <>{/*Return statements*/}</>;
}
```

As for the Root Cause Analysis (RCA) for the bug found using `console.log` statements such that the bug is displayed in the console:

![image](https://github.com/Rishith25/gitflow/assets/119791436/f4a3e665-6ae7-4a53-b845-cbb148464ee1)

The `console.log` statements are used for debugging as what data is passed where it is showing an error and when the data is showing as None or Undefined.

- **Breakpoints**: We can set breakpoints in the code using the browser's developer tools. The execution pauses at these breakpoints, allowing inspection of variables and the call stack. This provides a more interactive and dynamic debugging experience. It also allows step-by-step execution to understand the flow of the program.

- **Debugger Statements**: We can insert debugger; statements directly into the code. When the code is executed, it pauses at the debugger; line, allowing for inspection. This is quick and easy to implement. It offers a breakpoint-like experience without relying on the developer tools. But it needs to be removed after debugging, else it can be intrusive if left in the production code.

Here for breakpoints or debugger we have placed a `debugger` statement in our application code for Projects list every time we proceed to this page at the debugger point the application stops and then runs one by one so has to see where the code is getting error.

`ProjectListItems.tsx`

```tsx
export default function ProjectListItems() {
  let state: any = useProjectsState();
  const { projects, isLoading, isError, errorMessage } = state;
  console.log(projects);
  debugger; //Debugger Statement for debugging
  if (projects.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  return <>{/*Return statements*/}</>;
}
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/e2a3f0ea-9478-4e71-bb8e-683d6c03a123)

- **Browser Developer Tools**: These are a comprehensive suite of tools provided by browsers for inspecting and debugging web applications. It includes the Elements panel, Console, Sources, Network, etc. It allows real-time inspection of the DOM, CSS, and JavaScript. But it has an initial learning curve.

![image](https://github.com/Rishith25/gitflow/assets/119791436/7ab2f01d-f30f-41f9-bee6-9e31e80b2922)

![image](https://github.com/Rishith25/gitflow/assets/119791436/8408e406-d910-4f08-a347-7b2698c0b42f)

![image](https://github.com/Rishith25/gitflow/assets/119791436/ffe7087f-289f-4dd0-b1a3-4750cae277d4)

![image](https://github.com/Rishith25/gitflow/assets/119791436/927ab7cd-ebae-4eba-9e5a-2b6cdcecd620)

As for the Root Cause Analysis (RCA) for the bug found using React Developer Tools:

> **Bug Description**: The bug is caused due to the fetching of the projects list created.

> **Symptoms**: Every time the project is clicked it is showing as something went wrong.

> **Root Cause**: May be it is due to the backend delay or fetching of the projects before its creation.

> **Resolution**: Fetching the projects only after its creation can be the solution.

> **Impact Analysis**: It may not have much impact now but in future has we add features it may be a problem.

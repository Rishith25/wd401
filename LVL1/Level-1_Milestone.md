# WD401 Level-1 Submission Documentation

## Problem Statement:

You've been assigned to a project that involves enhancing a critical feature for a web application. The team places a strong emphasis on the pull-request workflow, with a focus on code reviews, merge conflict resolution, and the recent integration of CI/CD. As you navigate through the development task, you encounter challenges such as feedback during code reviews and discussions on effective merge conflict resolution. The team looks to you to demonstrate your understanding of these challenges and your ability to adapt to the added complexity of CI/CD integration.

### Handling Code Review Feedback:

```js
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const response = await fetch(`${API_ENDPOINT}/organisations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: organisationName,
        user_name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sign-up failed with status ${response.status}`);
    }
    console.log("Sign-up successful");

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    navigate("/dashboard");
  } catch (error) {
    console.error("Sign-up failed:", error);
  }
};
```

### Code Review:

```js
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  //API Endpoint for sign-up
  try {
    const response = await fetch(`${API_ENDPOINT}/organisations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: organisationName,
        user_name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sign-up failed with status ${response.status}`);
    }
    //If signup successful
    console.log("Sign-up successful");
    //Token saved to Localstorage
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    const navigate = (path: string) => {
      // Your navigation logic here
    };
    navigate("/dashboard");
  } catch (error) {
    console.error("Sign-up failed:", error);
  }
};
```

![image1](https://github.com/Rishith25/gitflow/assets/119791436/1ebc9bce-4017-4d3e-abb7-976a54d5f17f)

![image2](https://github.com/Rishith25/gitflow/assets/119791436/2a42ceab-033d-4a46-82e8-f8d7d30cbf80)

## Iterative Development Process:

![image3](https://github.com/Rishith25/gitflow/assets/119791436/9f1076c7-469d-467b-9511-a5ad897b7f96)

## Resolving Merge Conflicts:

A merge conflict occurs in version control systems when two branches or versions of a codebase have changes that cannot be automatically merged. This situation typically arises when two developers make conflicting modifications to the same part of a file, and the version control system is unable to determine which changes should take precedence.

### Code in Branch “main”:

```js
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  //API Endpoint for sign-up
  try {
    const response = await fetch(`${API_ENDPOINT}/organisations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: organisationName,
        user_name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    console.log("This is from main Branch");

    if (!response.ok) {
      throw new Error(`Sign-up failed with status ${response.status}`);
    }
    //If signup successful
    console.log("Sign-up successful");
    //Token saved to Localstorage
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    const navigate = (path: string) => {
      // Your navigation logic here
    };
    navigate("/dashboard");
  } catch (error) {
    console.error("Sign-up failed:", error);
  }
};
```

### Code in Branch “branch”:

```js
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  //API Endpoint for sign-up
  try {
    const response = await fetch(`${API_ENDPOINT}/organisations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: organisationName,
        user_name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    console.log("This is from Branch");

    if (!response.ok) {
      throw new Error(`Sign-up failed with status ${response.status}`);
    }
    //If signup successful
    console.log("Sign-up successful");
    //Token saved to Localstorage
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    const navigate = (path: string) => {
      // Your navigation logic here
    };
    navigate("/dashboard");
  } catch (error) {
    console.error("Sign-up failed:", error);
  }
};
```

Merge conflict occurs in the branch “main” when branch “branch” is merged with the “main” branch then:

![image](https://github.com/Rishith25/gitflow/assets/119791436/535a5e2e-2ba7-4381-800b-0cf9c7c75c44)

![image](https://github.com/Rishith25/gitflow/assets/119791436/58c9b34a-1175-47bc-8d19-ba4a9b35c299)

![image](https://github.com/Rishith25/gitflow/assets/119791436/b1715d2b-1158-4345-97ba-d963b7f4f986)

> There are two options to resolve the conflicts:
>
> - Accept Incoming changes.
> - Keep current changes.
>   By accepting the incoming changes, the conflict of branch "main" is resolved with the branch "branch".
>   By keeping the current changes, the conflict of branch "main" merging with develop will be resolved with current changes.
>   >     The main AIM is to resolve the merge conflicts such a way that the application works as expected without producing new errors.

After Resolving the merge conflicts the code is as follows:

```js
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  //API Endpoint for sign-up
  try {
    const response = await fetch(`${API_ENDPOINT}/organisations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: organisationName,
        user_name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    console.log("This is from main Branch");
    console.log("This is from Branch");

    if (!response.ok) {
      throw new Error(`Sign-up failed with status ${response.status}`);
    }
    //If signup successful
    console.log("Sign-up successful");
    //Token saved to Localstorage
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    const navigate = (path: string) => {
      // Your navigation logic here
    };
    navigate("/dashboard");
  } catch (error) {
    console.error("Sign-up failed:", error);
  }
};
```

## CI/CD Integration:

Using node packages like prettier, eslint, jest, husky to format the code and these ensures the code quality standards. These tests run after committing the changes to the files.

### App.tsx File with required import statements for CI/CD Integration:

```js
import React from "react";
const API_ENDPOINT = "api_endpoint";

const organisationName = "org_name";
const userName = "user_name";
const userEmail = "email@example.com";
const userPassword = "password";

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  //API Endpoint for sign-up
  try {
    const response = await fetch(`${API_ENDPOINT}/organisations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: organisationName,
        user_name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    console.log("This is from main Branch");
    console.log("This is from Branch");

    if (!response.ok) {
      throw new Error(`Sign-up failed with status ${response.status}`);
    }
    //If signup successful
    console.log("Sign-up successful");
    //Token saved to Localstorage
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    const navigate = (path: string) => {
      // Your navigation logic here
    };
    navigate("/dashboard");
  } catch (error) {
    console.error("Sign-up failed:", error);
  }
};
```

### .github/workflows/cicd.yml

```yml
# .github/workflows/cicd.yml

name: CI/CD

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js and TypeScript
        uses: actions/setup-node@v3
        with:
          node-version: 14
          typescript: 4.5.5

      - name: Install dependencies
        run: npm install

      - name: Run TypeScript build
        run: npx tsc

      - name: Run tests
        run: npm test
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/41b818ce-bf1f-44a1-b6f6-9049541e2697)

![image](https://github.com/Rishith25/gitflow/assets/119791436/92f05738-d706-4dea-9131-0125e638c937)

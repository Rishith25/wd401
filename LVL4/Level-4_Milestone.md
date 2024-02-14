# WD401 Level-4 Submission Documentation

## Configuration of Testing Framework:

For this project, we've utilized Jest for unit testing and Cypress for end-to-end testing. Here's how we've configured the testing framework:

### Jest Configuration (Unit Testing)

1. Installation: First, we've installed Jest as a dev dependency using npm:

   ```bash
   npm install --save-dev jest
   ```

2. Writing Tests: We've written unit tests for individual modules or functions within our Node.js application. These tests are stored in files with .todo.js suffix or located within a **tests** directory.

   Following that, add the below scripts in the `package.json` file

```json
   "scripts": {
   "test": "NODE_ENV=test jest --detectOpenHandles",
   "prepare": "cd .. && husky install todo-app/.husky"
   },
```

To run the test, run the following command:

```bash
npm test
```

This will run the tests and display the results in the console.

The `__test__/todo.js` file will look like following:

```js
const request = require("supertest");
var cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");

let server, agent;
function extractCsrfToken(res) {
var $ = cheerio.load(res.text);
return $("[name=_csrf]").val();
}

const login = async (agent, username, password) => {
let res = await agent.get("/login");
let csrfToken = extractCsrfToken(res);
res = await agent.post("/session").send({
email: username,
password: password,
\_csrf: csrfToken,
});
};

describe("List the todo items Todo test suite", () => {
beforeAll(async () => {
await db.sequelize.sync({ force: true });
server = app.listen(4000, () => {});
agent = request.agent(server);
});

afterAll(async () => {
await db.sequelize.close();
server.close();
});

test("Sign up", async () => {
let res = await agent.get("/signup");
const csrfToken = extractCsrfToken(res);
res = await agent.post("/users").send({
firstName: "Test",
lastName: "User A",
email: "user.a@test.com",
password: "12345678",
\_csrf: csrfToken,
});
expect(res.statusCode).toBe(302);
});
```

### Cypress Configuration (End-to-End Testing)

1. Installation: Similarly, we've installed Cypress as a dev dependency using npm:

```bash
npm install --save-dev cypress
```

Executing this command will install the Cypress package and add it to the devDependencies in the `package.json` file. Following that, create a folder named cypress in the root of the project and within that folder, create another folder named e2e. Finally, add the test files within the **e2e** folder.

2. Generate a `cypress.config.js` file in the root directory of the project and include the following code:

```js
/_ eslint-disable no-unused-vars _/;
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

3. Configure the `package.json` file by adding the following command in the scripts section:

```json
   "scripts": {
   "clean:start": "npm run pretest && NODE_ENV=test npm start",
   "cy:test": "npx cypress run"
   },
```

## Test Suite Coverage:

Our test suite encompasses both unit tests and integration tests to ensure comprehensive coverage of the application:

### Unit Tests

Unit tests focus on testing individual units of code, typically functions or modules, in isolation. We've written unit tests for each function or module in our Node.js application using Jest.

> Unit Test Using Jest:

```js
/_ eslint-disable no-unused-vars _/
/_ eslint-disable no-undef _/
const request = require("supertest");
var cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");

let server, agent;
function extractCsrfToken(res) {
var $ = cheerio.load(res.text);
return $("[name=_csrf]").val();
}

const login = async (agent, username, password) => {
let res = await agent.get("/login");
let csrfToken = extractCsrfToken(res);
res = await agent.post("/session").send({
email: username,
password: password,
\_csrf: csrfToken,
});
};

describe("List the todo items Todo test suite", () => {
beforeAll(async () => {
await db.sequelize.sync({ force: true });
server = app.listen(4000, () => {});
agent = request.agent(server);
});

afterAll(async () => {
await db.sequelize.close();
server.close();
});

test("Sign up", async () => {
let res = await agent.get("/signup");
const csrfToken = extractCsrfToken(res);
res = await agent.post("/users").send({
firstName: "Test",
lastName: "User A",
email: "user.a@test.com",
password: "12345678",
\_csrf: csrfToken,
});
expect(res.statusCode).toBe(302);
});

test("Sign out", async () => {
let res = await agent.get("/todos");
expect(res.statusCode).toBe(200);
res = await agent.get("/signout");
expect(res.statusCode).toBe(302);
res = await agent.get("/todos");
expect(res.statusCode).toBe(302);
});

test("Adding a Todo Item responds with json at /todos", async () => {
const agent = request.agent(server);
await login(agent, "user.a@test.com", "12345678");
const res = await agent.get("/todos");
const csrfToken = extractCsrfToken(res);
const response = await agent.post("/todos").send({
title: "Buy Milk",
dueDate: new Date().toISOString(),
completed: false,
\_csrf: csrfToken,
});
expect(response.statusCode).toBe(302);
});

test("Mark a todo as complete", async () => {
const agent = request.agent(server);
await login(agent, "user.a@test.com", "12345678");
let res = await agent.get("/todos");
let csrfToken = extractCsrfToken(res);
await agent.post("/todos").send({
title: "Buy Milk",
dueDate: new Date().toISOString(),
completed: false,
\_csrf: csrfToken,
});
const groupedTodosResponse = await agent
.get("/todos")
.set("Accept", "application/json");
const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
const dueTodayCount = parsedGroupedResponse.dueToday.length;
const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];
res = await agent.get("/todos");
csrfToken = extractCsrfToken(res);

    const markCompleteResponse = await agent
      .put(`/todos/${latestTodo.id}`)
      .send({
        _csrf: csrfToken,
        completed: false,
      });
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);

});

test("Mark a todo as incomplete", async () => {
const agent = request.agent(server);
await login(agent, "user.a@test.com", "12345678");
let res = await agent.get("/todos");
let csrfToken = extractCsrfToken(res);
await agent.post("/todos").send({
title: "Buy Milk",
dueDate: new Date().toISOString(),
completed: true,
\_csrf: csrfToken,
});
const groupedTodosResponse = await agent
.get("/todos")
.set("Accept", "application/json");
const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
const dueTodayCount = parsedGroupedResponse.dueToday.length;
const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];
res = await agent.get("/todos");
csrfToken = extractCsrfToken(res);

    const markInCompleteResponse = await agent
      .put(`/todos/${latestTodo.id}`)
      .send({
        _csrf: csrfToken,
        completed: true,
      });
    const parsedUpdateResponse = JSON.parse(markInCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(false);

});

test("Fetches all todos in the database using /todos endpoint", async () => {
const agent = request.agent(server);
await login(agent, "user.a@test.com", "12345678");
let res = await agent.get("/todos");
let csrfToken = extractCsrfToken(res);
await agent.post("/todos").send({
title: "Buy xbox",
dueDate: new Date().toISOString(),
completed: false,
\_csrf: csrfToken,
});
await agent.post("/todos").send({
title: "Buy ps3",
dueDate: new Date().toISOString(),
completed: false,
});
const groupedTodosResponse = await agent
.get("/todos")
.set("Accept", "application/json");
const parsedResponse = JSON.parse(groupedTodosResponse.text);
expect(parsedResponse.allTodos[3].title).toBe("Buy xbox");
});

test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
// FILL IN YOUR CODE HERE
const agent = request.agent(server);
await login(agent, "user.a@test.com", "12345678");
let res = await agent.get("/todos");
let csrfToken = extractCsrfToken(res);
const todo = await agent.post("/todos").send({
title: "Test todo",
dueDate: new Date().toISOString(),
completed: false,
\_csrf: csrfToken,
});
const groupedTodosResponse = await agent
.get("/todos")
.set("Accept", "application/json");
const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
const dueTodayCount = parsedGroupedResponse.dueToday.length;
const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];
res = await agent.get("/todos");
csrfToken = extractCsrfToken(res);

    const todoDeleteResponse = await agent
      .delete(`/todos/${latestTodo.id}`)
      .send({
        _csrf: csrfToken,
      });
    const parsedUpdateResponse = JSON.parse(todoDeleteResponse.text);
    expect(parsedUpdateResponse.success).toBe(true);

});

test("User A cannot update User B Todos", async () => {
let res = await agent.get("/signup");
let csrfToken = extractCsrfToken(res);
res = await agent.post("/users").send({
firstName: "IPL",
lastName: "2023",
email: "ipl@ipl.com",
password: "ipl2023",
\_csrf: csrfToken,
});

    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/todos").send({
      title: "Test todo",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    const userA = res.id;

    await agent.get("/signout");

    res = await agent.get("/signup");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "User",
      lastName: "B",
      email: "user.b@test.com",
      password: "userb",
      _csrf: csrfToken,
    });

    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    const parsedResponse = await agent.put(`/todos/${userA}`).send({
      _csrf: csrfToken,
      completed: true,
    });
    console.log(parsedResponse);
    expect(parsedResponse.statusCode).toBe(422);

});

test("User A cannot delete User B Todos", async () => {
let res = await agent.get("/signup");
let csrfToken = extractCsrfToken(res);
res = await agent.post("/users").send({
firstName: "IPL",
lastName: "2023",
email: "ipl@ipl.com",
password: "ipl2023",
\_csrf: csrfToken,
});

    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/todos").send({
      title: "Test todo",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    const userA = res.id;

    await agent.get("/signout");

    res = await agent.get("/signup");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "User",
      lastName: "B",
      email: "user.b@test.com",
      password: "userb",
      _csrf: csrfToken,
    });

    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    const parsedResponse = await agent.delete(`/todos/${userA}`).send({
      _csrf: csrfToken,
    });
    expect(parsedResponse.statusCode).toBe(422);

});
});
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/76a44ea9-7b3a-4378-bb69-de3be264150a)

### Integration Tests

Integration tests verify interactions between different parts of the application. These tests ensure that various components work together as expected. We've designed integration tests to cover scenarios involving multiple modules or components interacting with each other.

```js
/_ eslint-disable no-undef _/;
let studentSubmissionUrl =
  Cypress.env("STUDENT_SUBMISSION_URL") || "http://localhost:3000";
if (studentSubmissionUrl.endsWith("/")) {
  studentSubmissionUrl = studentSubmissionUrl.slice(0, -1);
}
const clearSignUpFields = (cy) => {
  cy.get('input[name="firstName"]').clear();
  cy.get('input[name="email"]').clear();
  cy.get('input[name="password"]').clear();
  if (cy.get('input[name="lastName"]')) {
    cy.get('input[name="lastName"]').clear();
  }
};
const clearLoginFields = (cy) => {
  cy.get('input[name="email"]').clear();
  cy.get('input[name="password"]').clear();
};

const clearFields = (cy) => {
  cy.get('input[name="title"]').clear();
  cy.get('input[name="dueDate"]').clear();
};

function formatDateWithOffset(daysOffset = 0) {
  const date = new Date(); // Get the current date
  date.setDate(date.getDate() + daysOffset); // Add or subtract days based on the offset

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const firstName = "L10 VTA";
const lastName = "User";
const email = "vta@pupilfirst.com";
const password = "123456789";

describe("Preparing for Level 10 milestone testing, first we will verify signup", () => {
  it("should not create an account with empty email, password, or firstName", () => {
    cy.visit(studentSubmissionUrl + "/signup");
    cy.get('input[name="firstName"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");

    clearSignUpFields(cy);

    // Empty firstName
    cy.get('input[name="email"]').type("vta@pupilfirst.com");
    cy.get('input[name="password"]').type("12345678");

    if (cy.get('input[name="lastName"]')) {
      cy.get('input[name="lastName"]').type("User");
    }
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/signup");
    });

    // Empty email
    clearSignUpFields(cy);
    cy.get('input[name="firstName"]').type("L10 user");
    cy.get('input[name="password"]').type("12345678");

    if (cy.get('input[name="lastName"]')) {
      cy.get('input[name="lastName"]').type("User");
    }
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/signup");
    });

    // Empty password
    clearSignUpFields(cy);
    cy.get('input[name="firstName"]').type("L10 user");
    cy.get('input[name="email"]').type("l10vta@pupilfirst.com");

    if (cy.get('input[name="lastName"]')) {
      cy.get('input[name="lastName"]').type("User");
    }
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/signup");
    });
  });

  it("should visit signup path and create an account", () => {
    cy.visit(studentSubmissionUrl + "/signup");
    cy.get('input[name="firstName"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    if (cy.get('input[name="lastName"]')) {
      cy.get('input[name="lastName"]').type(lastName);
    }
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/todos");
    });
  });
  it("should not login with invalid credentials", () => {
    cy.visit(studentSubmissionUrl + "/login");
    clearLoginFields(cy);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("inv@lid");
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
  });
});

describe("Verify the todo list functions properly,", () => {
  beforeEach(() => {
    cy.visit(studentSubmissionUrl + "/login");
    clearLoginFields(cy);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });
  it("contains an input field with name attribute `title`", () => {
    cy.get('input[name="title"]').should("exist");
  });
  it("contains an input date field with name attribute `dueDate`", () => {
    cy.get('input[name="dueDate"]').should("exist");
  });
  it("contains a submit button", () => {
    cy.get('button[type="submit"]').should("exist");
  });
  it("contains one element with the given IDs in each of sections Overdue, Due Today, Due Later and Completed to show the count of todos", () => {
    cy.get("#count-overdue").should("be.visible");
    cy.get("#count-due-today").should("be.visible");
    cy.get("#count-due-later").should("be.visible");
    cy.get("#count-completed").should("be.visible");
  });

  it("Should not create a todo item with empty title", () => {
    clearFields(cy);
    cy.get('input[name="dueDate"]').type(formatDateWithOffset(0));
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get(".Todo-Item").should("not.exist");
  });
  it("Should not create a todo item with empty dueDate", () => {
    clearFields(cy);
    cy.get('input[name="title"]').type("Sample due today item");
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get(".Todo-Item").should("not.exist");
  });

  it("Should create sample due today item", () => {
    clearFields(cy);
    cy.get('input[name="title"]').type("Sample due today item");
    cy.get('input[name="dueDate"]').type(formatDateWithOffset(0));

    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get(".Todo-Item").should("exist");
    cy.get("#count-due-today").contains("1");
  });

  it("Should create sample due later item", () => {
    clearFields(cy);
    cy.get('input[name="title"]').type("Sample due later item");
    cy.get('input[name="dueDate"]').type(formatDateWithOffset(3));

    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get(".Todo-Item").should("exist");
    cy.get("#count-due-later").contains("1");
  });
  it("Should create sample overdue item", () => {
    clearFields(cy);
    cy.get('input[name="title"]').type("Sample overdue item");
    cy.get('input[name="dueDate"]').type(formatDateWithOffset(-3));

    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get(".Todo-Item").should("exist");
    cy.get("#count-overdue").contains("1");
  });

  it("Should mark sample overdue item as completed", () => {
    clearFields(cy);
    cy.contains("label", "Sample overdue item").click();
    cy.wait(500);
    cy.get("#count-completed").contains("1");
    cy.contains("label", "Sample overdue item")
      .invoke("attr", "for")
      .then((forAttribute) => {
        // Handle the 'for' attribute value
        cy.get(`#${forAttribute}`).should("be.checked");
      });
  });

  it("Should toggle a completed item to incomplete when clicked on it", () => {
    clearFields(cy);
    cy.contains("label", "Sample overdue item").click();
    cy.wait(500);
    cy.get("#count-completed").contains("0");
    cy.get("#count-overdue").contains("1");
    cy.contains("label", "Sample overdue item")
      .invoke("attr", "for")
      .then((forAttribute) => {
        // Handle the 'for' attribute value
        cy.get(`#${forAttribute}`).should("not.be.checked");
      });
  });

  it("Should delete an item", () => {
    clearFields(cy);
    cy.contains("label", "Sample overdue item")
      .next("a")
      .trigger("mouseover", { force: true })
      .click({ force: true });
    cy.get("#count-overdue").contains("0");
  });

  it("Should have a logout button with text `signout`", () => {
    clearFields(cy);
    cy.contains("signout", { matchCase: false });
  });

  it("Should be able to logout", () => {
    clearFields(cy);
    cy.contains("signout", { matchCase: false }).click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("Should redirect to `/todos` page when a logged in user visits root url", () => {
    clearFields(cy);
    cy.visit(studentSubmissionUrl);
    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/todos");
    });
  });
});

describe("Verify the todos of a user is not accessible for other users", () => {
  it("should login as another user and shouldn't see todos of other users", () => {
    cy.visit(studentSubmissionUrl + "/signup");
    cy.get('input[name="firstName"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="firstName"]').type("userB");
    cy.get('input[name="email"]').type("user.b@pupilfirst.com");
    cy.get('input[name="password"]').type(password);

    if (cy.get('input[name="lastName"]')) {
      cy.get('input[name="lastName"]').type(lastName);
    }
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/todos");
    });
    cy.get("#count-due-today").contains("0");
  });
});
```

## Automatic Test Suite Execution on GitHub.

The test suite is set to run automatically upon pushing changes to GitHub. It is configured to use both Jest and Cypress, and the execution is orchestrated through GitHub Actions.
GitHub Actions
Employing Continuous Integration (CI) services to integrate with GitHub repositories is essential for automating the execution of test suites. GitHub Actions is a prominent Continuous Integration service that facilitates this process. The following outlines how to utilize GitHub Actions to automatically run test suites when code is pushed to GitHub:

- Step-1: In GitHub repository, create a directory named .github/workflows.
- Step-2: Inside this directory, create a YAML file named main.yml.

### GitHub Actions Walkthrough

Below is a simplified walkthrough of the GitHub Actions implemented for automatic testing:

```yml
name: Auto test todo-app solution
on: push
env:
PG_DATABASE: wd-todo-test
PG_USER: postgres
PG_PASSWORD: rishith
jobs:

# Label of the container job

run-tests: # Containers must run in Linux based operating systems
runs-on: ubuntu-latest

    # Service containers to run with `container-job`
    services:
      # Label used to access the service container
      postgres:
        # Docker Hub image
        image: postgres:11.7
        # Provide the password for postgres
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: rishith
          POSTGRES_DB: wd-todo-test
        # Set health checks to wait until postgres has started
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      # Downloads a copy of the code in your repository before running CI tests
      - name: Check out repository code
        uses: actions/checkout@v3

      # Performs a clean installation of all dependencies in the `package.json` file
      # For more information, see https://docs.npmjs.com/cli/ci.html
      - name: Install dependencies
        run: cd todo && npm ci

      - name: Run unit tests
        run: cd todo && npm test
      - name: Run the app
        id: run-app
        run: |
          cd todo
          npm install
          npx sequelize-cli db:drop
          npx sequelize-cli db:create
          npx sequelize-cli db:migrate
          PORT=3000 npm start &
          sleep 5

      - name: Run integration tests
        run: |
          cd todo
          npm install cypress cypress-json-results
          npx cypress run --env STUDENT_SUBMISSION_URL="http://localhost:3000/"
```

This workflow file sets up an environment on the latest version of Ubuntu, checks out the repository, installs dependencies, and runs both unit tests and end-to-end tests.

![image](https://github.com/Rishith25/gitflow/assets/119791436/7c9f0dcd-6391-4761-a5d7-20b6454c7f56)

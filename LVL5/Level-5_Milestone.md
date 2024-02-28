# WD401 Level-5 Submission Documentation

## 1. GitHub Actions Pipeline:

- Utilize GitHub Actions as the CICD tool to create the pipeline for your web application.
- Implement a pipeline that includes stages for code validation, build, testing, and deployment. The pipeline should trigger automatically upon code changes.

### 1. Create a Workflow File: In your GitHub repository, create a directory named `.github/workflows` if it doesn't exist already. Inside this directory, create a YAML file (e.g., `cicd.yml`) where you'll define your workflow.

### 2. Define Workflow Stages:

- Code Validation: Run linters, static code analyzers, and any other code quality checks.
- Build: Compile your code, bundle assets, and prepare your application for deployment.
- Testing: Run unit tests, integration tests, and any other automated tests.
- Deployment: Deploy your application to your desired environment (e.g., staging or production).

### 3. Configure Triggers: Configure triggers to automatically start the workflow upon code changes. You can use events like push or pull_request.

### 4. Example Workflow of YAML file

```yml
name: Auto test todo-app solution
on: push

env:
  PG_DATABASE: wd-todo-test
  PG_USER: postgres
  PG_PASSWORD: rishith

jobs:
  # Label of the container job
  run-tests:
    # Containers must run in Linux based operating systems
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
        run: cd todo-app && npm ci

      # Tests
      - name: Run unit tests
        run: cd todo-app && npm test

      - name: Run the app
        id: run-app
        run: |
          cd todo-app
          npm install
          npx sequelize-cli db:drop
          npx sequelize-cli db:create
          npx sequelize-cli db:migrate
          PORT=3000 npm start &
          sleep 5

  # Deployment steps in CI-CD Pipeline
  deploy:
    name: Deploy-to-production
    needs: run-tests
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to production
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/e0e601e5-a196-4d06-800c-d56c3fce7bc9)

![image](https://github.com/Rishith25/gitflow/assets/119791436/a288736b-1ec0-4430-b33e-9a0dee673e64)

![image](https://github.com/Rishith25/gitflow/assets/119791436/fef72871-d67d-420f-99e3-821dc4da3375)

`render.com` deploy triggered by you via API

![image](https://github.com/Rishith25/gitflow/assets/119791436/9ae38473-db6d-4519-a640-5d5d45ebd490)

![image](https://github.com/Rishith25/gitflow/assets/119791436/c58f76b6-c99d-4374-9a1a-ddf8a59a5f2d)

## 2. Automated Test Cases:

- Integrate an automated testing step into your pipeline to validate the functionality, performance, and integrity of the application.
- Define and implement test cases that cover critical aspects of the application's features. These tests should be automatically executed during the pipeline, providing an additional layer of validation before deployment.

### Introduction

Automated testing plays a crucial role in ensuring the reliability and quality of software applications. Integrating automated testing into your GitHub Actions pipeline allows you to validate the functionality, performance, and integrity of our application with each code change.

Modify your GitHub Actions pipeline configuration file `cicd.yml` to include a testing stage. This stage should execute your testing scripts after the code has been validated and built.

```yml
jobs:

run-tests:
  runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:11.7
        env:
          POSTGRES_USER: ${{ secrets.PG_USER }}
          POSTGRES_PASSWORD: ${{secrets.PG_PASSWORD}}
          POSTGRES_DB: wd-todo-test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - name: Check out repository code
        uses: actions/checkout@v3

      - name: Install dependencies
        run: cd todo-app && npm ci

      # Tests Command
      - name: Run unit tests
        run: cd todo-app && npm test
```

> Unit Test Cases

```js
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
      _csrf: csrfToken,
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
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/131b3045-87d8-4446-a5a1-5da81f521da9)

![image](https://github.com/Rishith25/gitflow/assets/119791436/37fc9c01-9239-41cc-b32c-862f24d97f8f)

## 3. Environment Variable Configuration:

- Adequately configure environment variables within the CICD pipeline. These variables should encompass any sensitive or environment-specific information required for the application to function correctly across various stages.

### Introduction

Environment variables play a crucial role in configuring and managing the behavior of applications across different stages of the CI/CD pipeline. They allow you to encapsulate sensitive information, such as API keys, database credentials, and environment-specific configurations, without hardcoding them directly into your codebase.

### Steps

1. Identify Environment Variables

   Identify the environment-specific configurations and sensitive information that your application requires. This may include:

   • API keys and secrets
   • Database connection strings
   • Configuration parameters for different deployment environments (e.g., development, staging, production)
   • Any other sensitive or environment-specific information

2. Configure Secrets in GitHub Repository

   Navigate to your GitHub repository and go to the "Settings" tab. Select "Secrets" from the sidebar menu and click on "New repository secret". Add each sensitive environment variable as a secret, providing a meaningful name and value.

   • Go to your GitHub repository.
   • Click on "**Settings**" in the menu.
   • In the left sidebar, click on "**Secrets**"
   • Click on "**New repository secret**"
   • Enter the name and value for your secret (environment variable), then click "**Add secret**"

3. Reference Secrets in GitHub Actions Workflow

   Modify your GitHub Actions workflow configuration file `cicd.yml` to reference the secrets defined in your repository. You can use the `${{ secrets.SECRET_NAME }}` syntax to access secret values within your workflow.

4. Define Environment Variables in Workflow

   In your workflow file, define environment variables that encapsulate environment-specific configurations. These variables can be set using the env keyword within your job or step definitions. Reference secret values as needed.

5. Use Environment Variables in Application

   Update your application code to read environment variables and use them as required. Ensure that your application is configured to retrieve sensitive information and environment-specific configurations from environment variables rather than hardcoded values.

### Workflow file:

```yml
name: Auto test todo-app solution
on: push

env:
  PG_DATABASE: wd-todo-test
# POSTGRES DATABASE CREDENTIALS
  PG_USER: ${{ secrets.PG_USER }}
  PG_PASSWORD: ${{secrets.PG_PASSWORD}}

jobs:
  run-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:11.7
        env:
          POSTGRES_USER: ${{ secrets.PG_USER }}
          POSTGRES_PASSWORD: ${{secrets.PG_PASSWORD}}
          POSTGRES_DB: wd-todo-test


    steps:
	# Other Steps in the workflow

  deploy:
    name: Deploy-to-production
    needs: run-tests
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to production
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.SERVICE_ID }} # Env variable: `Service ID` to deploy
          api-key: ${{ secrets.RENDER_API_KEY }}# Env variable: `Render API KEY` to deploy
```

### Currently Configured Secrets

The pipeline relies on specific environment variables crucial for the application's functionality across different stages. These variables include:

> `PG_USER`: Name of the PostgreSQL user.
> `PG_PASSWORD`: Password for the PostgreSQL user.
> `SERVICE_ID`: Service of to deploy to render.com
> `RENDER_API_KEY`: API Key to deploy to render.com

### Output

![image](https://github.com/Rishith25/gitflow/assets/119791436/be6d1073-d65b-4635-9980-a8920f2e4a86)

## 4. Error Reporting Integration:

- Integrate error reporting mechanisms into your pipeline.
- In case of any errors during the pipeline execution, immediately notify the development team by posting detailed error messages and logs to a designated Slack or Discord channel.
- Ensure that the error notification includes relevant information for quick diagnosis and resolution.

### Introduction

Error reporting mechanisms are essential for promptly identifying and resolving issues that occur during the execution of your CI/CD pipeline. Integrating error reporting into your pipeline allows you to notify the development team in real-time about any errors or failures, enabling quick diagnosis and resolution.

### Steps

1. Set Up Webhook in Slack or Discord
   Create a webhook in your Slack or Discord workspace that will be used to send error notifications. Follow the platform-specific documentation to create a webhook URL and configure the destination channel.
2. Configure Error Reporting in CI/CD Pipeline
   Modify your CI/CD pipeline configuration file to include error reporting mechanisms. Add steps or scripts that capture error messages and logs during pipeline execution.
3. Send Error Notifications to Slack or Discord
   Write a script or utilize existing tools to send error notifications to the designated Slack or Discord channel. Include relevant information such as error messages, stack traces, affected components, and timestamps.
4. Integrate Error Reporting Script into Pipeline
   Integrate the error reporting script into your CI/CD pipeline workflow. Call the script whenever an error or failure occurs during pipeline execution.
5. Test Error Reporting Integration
   Test the error reporting integration by intentionally triggering errors or failures in your pipeline. Verify that error notifications are sent to the designated Slack or Discord channel with relevant information for diagnosis and resolution.

### Workflow YAML file

```yml
name: Auto test todo-app solution
on: push

env:
  PG_DATABASE: wd-todo-test
  PG_USER: ${{ secrets.PG_USER }}
  PG_PASSWORD: ${{secrets.PG_PASSWORD}}
  SLACK_WEBHOOK_URL: ${{secrets.SLACK_WEBHOOK_URL}}

jobs:
  # Label of the container job
  run-tests:
    # Containers must run in Linux based operating systems
    runs-on: ubuntu-latest
    services:
      # Label used to access the service container
      postgres:
        # Docker Hub image
        image: postgres:11.7
        # Provide the password for postgres
        env:
          POSTGRES_USER: ${{ secrets.PG_USER }}
          POSTGRES_PASSWORD: ${{secrets.PG_PASSWORD}}
          POSTGRES_DB: wd-todo-test
        # Set health checks to wait until postgres has started
        options: >-
          # Options
        ports:
          # Port number

    steps:
      # Downloads a copy of the code in your repository before running CI tests
      - name: Check out repository code
        uses: actions/checkout@v3

      # Performs a clean installation of all dependencies in the `package.json` file
      # For more information, see https://docs.npmjs.com/cli/ci.html
      - name: Install dependencies
        run: cd todo-app && npm ci

      # Tests
      - name: Run unit tests
        run: cd todo-app && npm test

      # YAML Workflow for default message to slack channel #web-development
      - name: Slack Notify
        uses: act10ns/slack@v1
        with:
          status: ${{ job.status}}
          steps: ${{toJson(steps)}}
          channel: "#web-development"
        if: always()

      # YAML Workflow for success of the pipeline
      - name: Success Notify
        if: success()
        run: |
          curl -X POST -H 'Content-type: application/json' --data '{"text":"✨Commit has been successful✅"}' ${{secrets.SLACK_WEBHOOK_URL}} # SLACK web hook url is stored in secrets

      # YAML Workflow for failure of the pipeline
      - name: Faliure Notify
        if: failure()
        run: |
          curl -X POST -H 'Content-type: application/json' --data '{"text":"⚠️Error: The pipeline has failed❗"}' ${{secrets.SLACK_WEBHOOK_URL}}

      - name: Run the app
        id: run-app
        run: |
          # Commands for run the app

  # Deployment steps in CI-CD Pipeline
  deploy:
    # Steps for deployment
```

### Output

![image](https://github.com/Rishith25/gitflow/assets/119791436/671b6dbe-cf5c-410d-8130-6f86a360f3cf)

- If an error occurs the message will be as follows:

![image](https://github.com/Rishith25/gitflow/assets/119791436/c6b7ab7f-49e1-44b1-969d-1352e3d01394)

- If Github Actions Workflow has no errors:

![image](https://github.com/Rishith25/gitflow/assets/119791436/7f8507a9-ea03-4144-9f1a-3823fe84f801)

## Screen Record

[Video](https://www.loom.com/share/584c06b2859843fabff4aff09e3e8a96?sid=c31d8d2d-5d59-4f2a-90c6-04b0982eb076)

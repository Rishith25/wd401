# WD401 Level-7 Submission Documentation

## Problem Statement: Dockerizing and Deploying a Node.js Application with CICD Pipeline

You have to containerize a Node.js application using Docker, configuring environment variables within the Docker containers, defining a Docker Compose file for multiple services (including a database service), and setting up a Continuous Integration and Continuous Deployment (CICD) pipeline to deploy the Dockerized application on a server.

## 1. Dockerize the Application:

### Introduction to Docker

`Docker` is an open-source platform used to automate the deployment of applications within software containers. Containers package up code and all its dependencies, allowing applications to run quickly and reliably across different computing environments.

`Docker` is a leading containerization platform that allows you to package applications and their dependencies into `containers`. These containers are lightweight, portable, and `isolated from the host system` and other containers. Docker simplifies the process of building, deploying, and managing applications by encapsulating them in containers.

### Dockerfile Contents

```Dockerfile
FROM --platform=$BUILDPLATFORM node:lts-alpine as base
WORKDIR /app
COPY todo-app/package.json /app/
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm install -g husky && pm2 -g
COPY . /app
CMD pm2 start index.js -i max --log ./logs/app.log

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /app
CMD npm run start
```

`FROM --platform=$BUILDPLATFORM node:lts-alpine as base`

> This line specifies the base image for the Dockerfile. The --platform=$BUILDPLATFORM flag is used to specify the platform for which the image is being built. In this case, it is set to the value of the BUILDPLATFORM build argument. The node:lts-alpine image is used as the base image for the application.

`WORKDIR /app`

> This line sets the working directory for the application to /app.

`COPY todo-app/package.json /app/`

> This line copies the `package.json` file from the `todo-app` directory on the host machine to the `/app/` directory in the Docker image.

`EXPOSE 3000`

> This line exposes `port 3000` on the Docker container, allowing external connections to reach the application running inside the container.

`FROM base as production`

> This line specifies a new stage in the `Dockerfile` called `production` that is based on the base stage. This stage is used for building the production image of the application.

`ENV NODE_ENV=production`

> This line sets the `NODE_ENV` environment variable to production.

`RUN npm install -g husky && pm2 -g`

> This line installs the `husky` package globally for Git hooks and the `pm2` process manager.

`COPY . /app`

> This line copies the application files from the host machine to the `/app` directory in the Docker image.

`CMD pm2 start index.js -i max --log ./logs/app.log`

> This line specifies the command to run the application in the production image using PM2 in clustered mode, logging to `./logs/app.log`.

`FROM base as dev`

> This line specifies a new stage in the `Dockerfile` called `dev` that is based on the base stage. This stage is used for building the development image of the application.

`ENV NODE_ENV=development`

> This line sets the `NODE_ENV` environment variable to development.

`RUN npm install -g nodemon && npm install`

> This line installs the `nodemon` package globally for automatic server restarting during development and installs the dependencies specified in the `package.json` file.

`COPY . /app`

> This line copies the application files from the host machine to the /app directory in the `Docker image`.

`CMD npm run start`

> This line specifies the command to run the application in the development image using `npm run start`.

## 2. Configure Environment Variables in Docker:

### Following are the environment variables used:

```bash
####### development #######
NODE_ENV=development
DEV_USERNAME=postgres
DEV_PASSWORD=rishith
DEV_DATABASE=todo
DEV_HOST=db
DEV_DIALECT=postgres
```

#### Explanation of Environment Variables:

1. `NODE_ENV`:

   > **Purpose**: Specifies the environment in which the application is running.
   > **Expected Values**: 'production', 'development', or 'test'.

2. `DEV_HOST`:

   > **Purpose**: Specifies the host address of the database server.
   > **Expected Values**: Hostname or IP address of the database server.

3. `DEV_USERNAME and DEV_PASSWORD`:

   > **Purpose**: Credentials for accessing the database.
   > **Expected Values**: Username and password for authenticating with the database server.

4. `DEV_DATABASE`:

   > **Purpose**: Name of the database
   > **Expected Values**: String of letters (e.g. ‘todo’)

5. `DEV_DIALECT`:

   > **Purpose**: Dialect of the database. (e.g., 'postgres' for PostgreSQL)

### Secure Practices for Managing Sensitive Information:

- Ensure that sensitive information like passwords and usernames are not hardcoded directly into the Dockerfile or application code.
- Utilize Docker's secrets management feature or external tools to securely manage and access sensitive information.
- Encrypt environment variables at rest and in transit to prevent unauthorized access.
- Restrict access to environment variables only to authorized users or processes within the container.
- Regularly rotate credentials to minimize the risk of unauthorized access in case of a security breach.

## 3. Define Docker Compose for Multiple Services:

### Introduction

Docker Compose is a tool used to define and manage multi-container Docker applications. It allows you to define the services, networks, and volumes required for your application in a single YAML file, making it easier to deploy and manage complex applications.

### Docker Compose file

`docker-compose.yml` - development

```yml
version: "3.8"
services:
  app:
    build:
      context: .
      target: dev
    image: todo-app:development
    volumes:
      - .:/app
    ports:
      - 3000:3000
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - pg-dev-data:/var/lib/postgresql/data
    env_file:
      - .env
    environment:
      POSTGRES_USER: $DEV_USERNAME
      POSTGRES_DB: $DEV_DATABASE
      POSTGRES_PASSWORD: $DEV_PASSWORD

volumes:
  pg-dev-data:
```

#### Docker Compose File Explanation:

1. `Version`:

   > Specifies the version of the Docker Compose file format being used.

2. `Services`:

   > Defines multiple services, each representing a Docker container.

3. `Node.js Application Service`:

   > Configures the Node.js application service.
   > Builds the service using the provided Dockerfile (`target: dev`).
   > Sets the image name to `todo-app:development`.
   > Mounts the current directory as a volume to /app in the container.
   > Maps port 3000 of the container to port 3000 of the host machine.
   > Loads environment variables from the .env file.
   > Depends on the db service, ensuring that the database service is started before the application service.

4. `Database Service (Postgres)`:

   > Sets up the database service using the PostgreSQL 15 Docker image.
   > Mounts a volume to persist the database data.
   > Loads environment variables from the `.env` file.
   > Sets the PostgreSQL `user`, `database name`, and `password` using `environment variables`.

5. `Volumes`:

   > Defines a named volume `pg-dev-data` to persist the database data.

![image](https://github.com/Rishith25/gitflow/assets/119791436/7b06b8b2-6729-4475-b96c-c26733f696a5)

![image](https://github.com/Rishith25/gitflow/assets/119791436/e88d5d49-d7b2-4b40-8114-edc72fe6cce5)

![image](https://github.com/Rishith25/gitflow/assets/119791436/00b66368-ff89-4962-99ec-4a09916fedba)

![image](https://github.com/Rishith25/gitflow/assets/119791436/0bb9c21b-b6bb-4bf7-959f-0314718e2d0e)

![image](https://github.com/Rishith25/gitflow/assets/119791436/cfb8c74d-c12b-4893-b706-1a04664e2629)

## 4. Setup CICD Pipeline:

### Introduction:

This CICD pipeline aims to automate the deployment of a Dockerized application, ensuring consistent and reliable delivery of code changes from development to production environments.

### GitHub Actions Workflow:

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

    # Service containers to run with `container-job`
    services:
      # Label used to access the service container
      postgres:
        # Docker Hub image
        image: postgres:11.7
        # Provide the password for postgres using Github Actions Secret Keys
        env:
          POSTGRES_USER: ${{ secrets.PG_USER }}
          POSTGRES_PASSWORD: ${{secrets.PG_PASSWORD}}
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

      # - name: Run integration tests
      #   run: |
      #     cd todo
      #     npm install cypress cypress-json-results
      #     npx cypress run --env STUDENT_SUBMISSION_URL="http://localhost:3000/"

      - name: Slack Notify
        uses: act10ns/slack@v1
        with:
          status: ${{ job.status}}
          steps: ${{toJson(steps)}}
          channel: "#web-development"
        if: always()

      - name: Success Notify
        if: success()
        run: |
          curl -X POST -H 'Content-type: application/json' --data '{"text":"✨Commit has been successful✅"}' ${{secrets.SLACK_WEBHOOK_URL}}

      - name: Faliure Notify
        if: failure()
        run: |
          curl -X POST -H 'Content-type: application/json' --data '{"text":"⚠️Error: The pipeline has failed❗"}' ${{secrets.SLACK_WEBHOOK_URL}}

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

  build:
    runs-on: ubuntu-latest
    needs: deploy

    steps:
      - uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build the Docker image
        run: docker build . --file todo-app/Dockerfile --tag ${{ secrets.DOCKER_USERNAME }}/wd-to-do-application

      - name: Docker Push
        run: docker push ${{ secrets.DOCKER_USERNAME }}/wd-to-do-application
```

#### Explanation of the Build Section:

1. `runs-on`: Specifies that the job will run on an Ubuntu latest runner.

2. `needs`: Indicates that this job depends on the successful completion of the `deploy` job.

3. `steps`:
   • actions/checkout: Checks out the code from the repository.
   • docker/login-action: Logs in to Docker Hub using the provided Docker username and password stored as secrets in GitHub Actions.
   • docker/setup-buildx-action: Sets up the Docker `Buildx` builder.
   • Run Docker Build: Executes the Docker build command to build the Docker image. It specifies the Dockerfile location and tags the image with the repository's name.
   • Docker Push: Pushes the built Docker image to the Docker Hub repository associated with the provided Docker username.

This section of the pipeline automates the building and pushing of the Docker image to Docker Hub whenever changes are pushed to the repository. It ensures that the latest version of the application is available as a Docker image for deployment.

### Output:

![image](https://github.com/Rishith25/gitflow/assets/119791436/dd8d77a0-c02e-431d-a745-94f499518cde)

![image](https://github.com/Rishith25/gitflow/assets/119791436/500ad363-f006-41f1-8c5a-aa731fa3b028)

![image](https://github.com/Rishith25/gitflow/assets/119791436/66471975-c60e-424e-81d7-1a5533c4bbb5)

![image](https://github.com/Rishith25/gitflow/assets/119791436/731ff194-1415-452b-8691-a8aeccd409ef)

## 5. Video Demonstration:

[Video-1](https://www.loom.com/share/94574c262bba4a2299cb0fd54ed07ce6)

[Video-2](https://www.loom.com/share/3626fbeb433f44e8a27275ca3c654ad7)

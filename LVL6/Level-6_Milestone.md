# WD401 Level-6 Submission Documentation

## 1. Environment Variable Configuration:

- Set up environment variables for your Node.js application to accommodate both development and production environments.
- Clearly document the purpose of each environment variable and its expected values.
- Ensure sensitive information, such as API keys or database credentials, is appropriately managed using environment variables.

### Introduction

Environments are digital spaces where the development, testing and publishing of a website or web app is taking place. It’s a collection of resources that host a website or web app.
Generally, app environments can be divided into three main categories, with each their own unique purpose and functionalities: the development environment, the staging or testing environment and the production environment.

1. Development Environment: A local development environment is where programmers initially build the features of an application. In a local development environment, a programmer can work on their feature without worrying about, or potentially breaking, what other developers may be working on.
2. Staging Environment: The staging environment is an environment that attempts to match production as closely as possible in terms of resources used including computational load, hardware, and architecture. This means that when an application is in staging, it should be able to handle the amount of work it is expected to be doing in production.
3. Production Environment: When the development team, product owners, and end-users have thoroughly tested the product in the staging environment, the app is pushed to the production environment. The production environment contains live data, and it is accessible to its end-users.

- **Development Environment Variables**

  - NODE_ENV
    > Purpose: Specifies the current environment as development.
    > Expected Values: development
    > Usage: Used to differentiate development environment from other environments.
  - DEV_DATABASE_URL
    > Purpose: Specifies the URL for the development database.
    > Expected Values: postgres://username:password@hostname:port/database
    > Usage: Used by the application to connect to the development database.
  - DEV_API_KEY
    > Purpose: Specifies the API key for development APIs.
    > Expected Values: <your-development-api-key>
    > Usage: Used by the application to authenticate requests to development APIs.

- **Production Environment Variables**

  - NODE_ENV
    > Purpose: Specifies the current environment as production.
    > Expected Values: production
    > Usage: Used to differentiate production environment from other environments.
  - PROD_DATABASE_URL
    > Purpose: Specifies the URL for the production database.
    > Expected Values: postgres://username:password@hostname:port/database
    > Usage: Used by the application to connect to the production database.
  - PROD_API_KEY
    > Purpose: Specifies the API key for production APIs.
    > Expected Values: <your-production-api-key>
    > Usage: Used by the application to authenticate requests to production APIs.

### DockerFile

```Dockerfile
FROM --platform=$BUILDPLATFORM node:lts-alpine as base
WORKDIR /app
COPY package.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm install -g husky
COPY . /app
CMD node index.js

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /app
CMD npm run start
```

`docker-compose.yml`

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

`docker-compose-prod.yml`

```yml
version: "3.8"
services:
  app:
    build:
      context: .
      target: production
    image: todo-app:production
    ports:
      - 3010:3000
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - pg-prod-data:/var/lib/postgresql/data
    env_file:
      - .env
    environment:
      POSTGRES_USER: $PROD_USERNAME
      POSTGRES_DB: $PROD_DATABASE
      POSTGRES_PASSWORD: $PROD_PASSWORD

volumes:
  pg-prod-data:
```

`.env`

```.env
####### production #######
NODE_ENV=production
PROD_USERNAME=postgres
PROD_PASSWORD=rishith
PROD_DATABASE=todo
PROD_HOST=db
PROD_DIALECT=postgres

####### development #######
NODE_ENV=development
DEV_USERNAME=postgres
DEV_PASSWORD=rishith
DEV_DATABASE=todo
DEV_HOST=db
DEV_DIALECT=postgres
```

Here's the purpose and expected values of each environment variable used in the provided Docker Compose files:
**For Development Environment**:

1. DEV_USERNAME: Username for the development PostgreSQL database.
   • Expected Value: Username for the PostgreSQL database in development.
2. DEV_DATABASE: Name of the development PostgreSQL database.
   • Expected Value: Name of the PostgreSQL database in development.
3. DEV_PASSWORD: Password for the development PostgreSQL database.
   • Expected Value: Password for the PostgreSQL database in development.

**For Production Environment**:

1. PROD_USERNAME: Username for the production PostgreSQL database.
   • Expected Value: Username for the PostgreSQL database in production.
2. PROD_DATABASE: Name of the production PostgreSQL database.
   • Expected Value: Name of the PostgreSQL database in production.
3. PROD_PASSWORD: Password for the production PostgreSQL database.
   • Expected Value: Password for the PostgreSQL database in production.

### Docker Desktop

![image](https://github.com/Rishith25/gitflow/assets/119791436/25aecc0d-7618-4e7e-b3a2-b77eeedea8be)

![image](https://github.com/Rishith25/gitflow/assets/119791436/0aa9657b-2ea5-43d3-a171-90a720dae8c4)

![image](https://github.com/Rishith25/gitflow/assets/119791436/5edb3d8d-f67c-493a-a528-9453172c43a5)

### Output

**When Development environment is executed:**

![image](https://github.com/Rishith25/gitflow/assets/119791436/41ce56b9-8367-4e88-bf59-82a91306664e)

**When Production environment is executed:**

![image](https://github.com/Rishith25/gitflow/assets/119791436/24bc85b2-e594-4e2e-a3d9-9bff61787682)

## 2. PM2 Cluster Mode Deployment:

- Utilize PM2 to deploy your Node.js application in cluster mode.
- Document the configuration parameters used for PM2 deployment.
- Make sure the application logs gets saved properly.

To deploy a Node.js application in cluster mode using PM2 and ensure that the application logs are saved properly, follow these steps:

**Step 1: Install PM2**

If you haven't already installed PM2, you can install it globally using npm:

```bash
npm install -g pm2
```

**Step 2: Start your application in cluster mode**

Navigate to your application directory and start your Node.js application using PM2 in cluster mode:

```bash
pm2 start index.js -i max
```

In this command, `index.js` is the entry point of your application, and `-i max` tells PM2 to start as many instances of your application as there are CPU cores available.

- To start an application:

```bash
pm2 start <app_name> -I max
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/c2e78b1b-017e-4820-8c71-c1f6b9d69ce3)

- To view logs:

```bash
pm2 logs
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/64a208cd-08aa-4f3c-9452-8de88328f168)

- To stop an application:

```bash
pm2 stop <app_name_or_id>
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/5860e528-a747-4e5e-bdfc-49e643ac8c72)

- To restart an application:

```bash
pm2 restart <app_name_or_id>
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/98381f7c-54b2-41bb-b8e0-2c7c0cd4decd)

- To delete an application:

```bash
pm2 delete <app_name_or_id>
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/7eaff006-01eb-479e-82c8-436a5c98d8dd)

In docker file we can modify the production code as follows:

```Dockerfile
FROM base as production
ENV NODE_ENV=production
RUN npm install -g husky && pm2
COPY . /app
CMD pm2 start index.js -i max --log ./logs/app.log
```

When we run the docker-compose-prod.yml file we get the following result:

![image](https://github.com/Rishith25/gitflow/assets/119791436/8488a881-5c5a-4aec-a9d1-a077491bf778)

The logs in the Docker Desktop Application are as follows:

![image](https://github.com/Rishith25/gitflow/assets/119791436/775757a7-ee91-4ace-8eaf-40391d832e13)

The Application is running in `http://localhost:3010`

![image](https://github.com/Rishith25/gitflow/assets/119791436/7020309f-5096-4055-8344-90cf42b2fdc9)

## 3. Security Measures: Implement security measures to fortify your Node.js application:

- Apply best practices for securing environment variables, ensuring they are not exposed unintentionally.
- Employ HTTPS to encrypt data in transit, utilizing a valid SSL certificate (optional).

### Securing your Node.js application is crucial to protect sensitive data and prevent unauthorized access. Here are some security measures you can implement:

1. **Secure Environment Variables:**

   > Avoid hardcoding sensitive information like database credentials, API keys, and secret keys directly into your code.
   > Use environment variables to store these sensitive data.
   > Ensure that environment variables are not exposed unintentionally. This can be achieved by:
   > Keeping your environment configuration files (.env files) out of version control.
   > Using tools like dotenv to manage environment variables locally.
   > Restricting access to environment variables on your hosting platform.

2. **HTTPS Implementation:**

   > Use HTTPS to encrypt data in transit between the client and the server.
   > Obtain a valid SSL certificate from a trusted Certificate Authority (CA). You can use services like Let's Encrypt to get free SSL certificates.
   > Configure your Node.js application to use HTTPS instead of HTTP.
   > Redirect HTTP traffic to HTTPS to ensure all communications are encrypted.

3. **Input Validation and Sanitization:**

   > Validate and sanitize user inputs to prevent common security vulnerabilities such as XSS (Cross-Site Scripting) and SQL Injection attacks.
   > Use libraries like Express Validator or JOI for input validation.
   > Sanitize user inputs to remove any potentially dangerous characters or scripts.

4. **Implement Authentication and Authorization:**

   > Use secure authentication methods such as JWT (JSON Web Tokens) or OAuth for user authentication.
   > Implement proper session management and use secure cookies with HttpOnly and Secure flags.
   > Apply role-based access control (RBAC) to restrict access to certain routes or resources based on user roles and permissions.

5. **Secure Dependencies:**

   > Regularly update your dependencies to ensure you are not using outdated or vulnerable packages.
   > Use tools like npm audit to identify and fix vulnerabilities in your dependencies.
   > Consider using package-lock.json or yarn.lock to lock dependency versions and prevent unexpected updates.

6. **Logging and Monitoring:**

   > Implement logging mechanisms to track and monitor application activities.
   > Log security-related events such as failed login attempts, access control failures, and potential security threats.
   > Set up alerts and notifications to be informed about security incidents in real-time.

- Implementation of SSL Certificate

```js
const sslServer = https.createServer(
  {
    key: "<your_ssl_key>",
    cert: "<your_cert>",
  },
  app
);

sslServer.listen(3000, () => {
  console.log("Started express server at port 3000");
});
```

By implementing these security measures, you can fortify your Node.js application and reduce the risk of security breaches and data leaks. Remember that security is an ongoing process, so regularly review and update your security practices to stay ahead of potential threats.

## Screen Record

[Video](https://www.loom.com/share/f0e92de330244be9b8da5a32216d2c66?sid=8ea36d73-ccc7-4a91-b2e8-2eb4c1525e75)

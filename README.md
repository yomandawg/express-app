# Express.js Application
> Express.js backend building practice (Node.js v12.16)


## Setup
### **Requirements**
```bash
Express.js
TypeScript
Swagger-UI
Docker
```

### **Initiation**
* `npm init`
  - create a `pacage.json` file
* `npm install express`
* `npm install typescript`
  - `npm install typescript --save-dev` for development dependencies
  - `npm install typescript --save-prod` for production
* `npx tsc src/main.ts`
  - compile the TS file to `main.js`

### **Launch**
* `node src/main.js`
  - `node dist/main.js` for running distribution version


## Config
### TypeScript
```javascript
// src/tsconfig.json
{
    "compilerOptions": {
        "experimentalDecorators": true, // option added after TSOA controller setup
        "outDir": "../dist",
        "baseUrl": "",
        "module": "commonjs"
    }
}
```
* `npx tsc -p src` to create a distribution folder &rarr; `/dist/*`

### TSOA
> TypeScript OpenAPI\
> generate OpenAPI-compatible **REST** endpoints
* `npm install tsoa --save-dev`
  * `npm install tsoa --save-prod`
* `npm install @types/node --save-dev`
  * `npm install @types/node --save-prod`

#### Controllers
* make use of experimental decorator `@`
  * `tsconfig.json` option needed
```javascript
// src/controllers/index.controller.ts
import { Controller, Get, Route } from 'tsoa';

@Route('')
export class IndexController extends Controller {
    @Get('') // experimental decorator
    public async index() {
        return { msg: 'Hello World!' };
    }

    @Get('/msg')
    public msg() {
        return { msg: 'This is a message' };
    }
}
```
* Add TSOA config
```javascript
// ./tsoa.json
{
  "swagger": {
    "basePath": "/api/v1", // base path to call REST API
    "entryFile": "./src/main.ts",
    "specVersion": 3,
    "outputDirectory": "./api/dist",
    "controllerPathGlobs": [
      "./src/controllers/**/*controller.ts"
    ]
  },
  "routes": {
    "basePath": "/api/v1", // base path to call REST API
    "entryFile": "./src/main.ts",
    "routesDir": "./src/routes",
    "middleware": "express"
  }
}
```

### Router
* `mkdir -p src/routes`
* `npx tsoa routes` - automatically setup the router
```javascript
// ./main.ts
import { RegisterRoutes } from './routes/routes'; // TSOA Routes
...
RegisterRoutes(app); // Route the app right away
```

* `npx tsc -p --experimentalDecorators src` - compile with options &rarr; `dist/*`

### API testing
* `node dist/main.js`
* `curl localhost:3000/api/v1/`
* `curl localhost:3000/api/v1/msg/`


## Swagger
> API documentation and design tools ~= similar to Django REST Framework
* `mkdir -p api && mkdir -p api/dist`
* `npx tsoa swagger` - create a swagger mount with docker

### Swagger UI with Docker
* `docker run -p 8080:8080 -v ${PWD}/api/dist:/swagger -e SWAGGER_JSON=/swagger/swagger.json swaggerapi/swagger-ui`
  * docker run at > port 8080 > with volume set to swagger container > set container environment variable SWAGGER_JSON > swagger-ui docker image

### Build TSOA
* `npx tsoa routes`, `npx tsoa swagger` `npx tsc -p src`
* build automation for container management
```json
// package.json
  "scripts": {
    "build:routes": "mkdir -p src/routes && tsoa routes",
    "build:swagger": "mkdir -p api && mkdir -p api/dist && tsoa swagger",
    "build:ts": "tsc -p src",
    "build:all": "npm run build:routes && npm run build:swagger && npm run build:ts",
    "server": "node dist/main.js",
    "lint": "tslint -c tslint.json 'src/**/*.ts'"
  },
```


## HTTPS
* create a SSL certificate to use HTTPS at [Let's Encrypt](https://letsencrypt.org/)
* add your `crt` and *private key* file into a hidden subfolder
```javascript
// src/main.ts
import * as fs from 'fs';
import * as https from 'https';

const privateKey = fs.readFileSync('cert/cert.key');
const certificate = fs.readFileSync('cert/cert.crt');
const credentials = {key: privateKey, cert: certificate};
...
const httpServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
  // Do Something
})
```


## Docker with Express.js
```dockerfile
FROM node:12.16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build:all

ENV NODE_ENV docker

EXPOSE 3000

CMD [ "npm", "run", "server" ]
```
* build to Docker daemon - `docker build -t ${USER}/express-test .
* try running thenimage - `docker run -p 3000:3000 ${USER}/express-test .`
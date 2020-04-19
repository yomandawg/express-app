# Express.js Application
> Express.js backend building practice


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
* `npx tsc -p src` to create a distribution folder

### TSOA
> TypeScript OpenAPI\
> generate OpenAPI-compatible REST endpoints
* `npm install tsoa --save-dev`
* `npm install @types/node --save-dev`

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
```javascript
// ./tsoa.json
{
  "swagger": {
    "basePath": "/api/v1",
    "entryFile": "./src/main.ts",
    "specVersion": 3,
    "outputDirectory": "./api/dist",
    "controllerPathGlobs": [
      "./src/controllers/**/*controller.ts"
    ]
  },
  "routes": {
    "basePath": "/api/v1",
    "entryFile": "./src/main.ts",
    "routesDir": "./src/routes",
    "middleware": "express"
  }
}
```
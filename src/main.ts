import * as express from 'express';
import { RegisterRoutes } from './routes/routes'; // TSOA Routes

const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })
// .listen(port, () => {
//     console.log(`Server listening to port ${port}`);
// })

RegisterRoutes(app);

app.listen(port, () => {
    console.log(`Server started listening to port ${port}`);
})
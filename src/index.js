import express from 'express';
import { engine } from 'express-handlebars';
import routes from './resources/routes/index.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express()

app.engine('handlebars', engine({
  defaultLayout: false,
}));

app.use(express.json())
app.set('view engine', 'handlebars');
app.set('views', './src/resources/views');
const port = 3002
 console.log(process.env.MONGO_DB)

mongoose.connect(process.env.MONGO_DB)
 .then(()=>{
  console.log("connect thanh cong")
 })
 .catch((error)=>{
  console.log(error)
 })
routes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
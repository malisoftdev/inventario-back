import express,{Application} from 'express'
import routes from './routes'
import morgan from 'morgan'
import cors from "cors"

const app:Application=express();

//settings
app.set('port', process.env.PORT || 3500);

//middlawares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.use("/api",routes);

export default app;
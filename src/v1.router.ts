import express from 'express';
import { generatorRoute } from "./routes/generator.router";

const router = express.Router();

router.use('/generator', generatorRoute);

export {router as v1router}

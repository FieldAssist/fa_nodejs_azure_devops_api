import {  sprint } from "../controllers/generator.controller";
import express from 'express';

const router = express.Router();

// router.get('/epic', epic)
router.get('/sprint', sprint);

export { router as generatorRoute };
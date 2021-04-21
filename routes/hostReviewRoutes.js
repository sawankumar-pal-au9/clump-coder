import express from 'express';
const hostRouter = express.Router();
import { addNew, getReview } from '../controllers/hostReviewController.js';

hostRouter.post('/add', addNew);
hostRouter.get('/:id', getReview);

export default hostRouter;
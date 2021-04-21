import express from 'express';
const guestRouter = express.Router();
import { addNew, getReview } from '../controllers/guestReviewController.js';

guestRouter.post('/add', addNew);
guestRouter.get('/:id', getReview);

export default guestRouter;
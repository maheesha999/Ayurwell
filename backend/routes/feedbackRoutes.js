import express from 'express';
import {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getFeedbacks);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

export default router;

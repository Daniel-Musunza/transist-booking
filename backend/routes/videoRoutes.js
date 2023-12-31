const express = require('express');
const router = express.Router();
const {
  addkcsevideo,
  getkcsevideos,
  editkcsevideo
} = require('../controllers/videoController');

const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.route('/').get(getkcsevideos).post(protect, upload.single('answerFile'), addkcsevideo);
router
  .route('/:id')
  .put(protect, upload.single('answerFile'), editkcsevideo);

module.exports = router;

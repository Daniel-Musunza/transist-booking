const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/uploadMiddleware');

router.post('/', upload.single('coverPhoto'), registerUser)
router.post('/login', loginUser)
router.get('/getUsers', getUsers)
router.get('/me', protect, getMe)
router.route('/:id').put(protect, upload.single('coverPhoto'), updateUser);

module.exports = router

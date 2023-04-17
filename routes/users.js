const router = require('express').Router();
const { validateUserInfo } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserInfo, updateCurrentUser);

module.exports = router;

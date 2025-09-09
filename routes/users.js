const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateProfile } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateProfile, updateProfile);
module.exports = router;

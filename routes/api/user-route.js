const router = require("express").Router();
const {
	getAllUser,
	getUserById,
	createUser,
	updateUser,
	addNewFriend,
	removeUser,
  } = require('../../controllers/user-controller');

router.route("/").get(getAllUser).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(removeUser);

router.route("/:userId/friends/:friendId").post(addNewFriend);

module.exports = router;

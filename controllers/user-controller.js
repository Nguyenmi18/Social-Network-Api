const { User } = require("../models");
const { populate } = require("../models/user");

const userController = {
  // get all pizzas
  getAllUser(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $set: body },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // add new friend to user's friendlist
  addNewFriend({ params, body }, res) {
    console.log(params);
    User.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "No new friend found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //remove a friend from a user's friend list
  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.UserId })
      .then((deletedUser) => {
        if (!deletedUser) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        return userId.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { user: params.userId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;

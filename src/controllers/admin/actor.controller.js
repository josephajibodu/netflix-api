const User = require("../../models/User");

class ActorController {
    static async index(req, res) {
        const users = await User.find({});
        if (!users) {
            return res
                .status(404)
                .json({ status: false, message: "Users not found" });
        }

        res.json({ status: true, data: users });
    }

    static async show(req, res) {
        const user = await User.findById({ _id: req.params.id });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        res.json({ status: true, data: user });
    }

    static async create(req, res) {
        const data = req.body;
        data.role = 'movie-actor';

        const user = await User.findOne({ email: data.email });
        if (user) {
            return res.status(400).send("User with the same email already exist");
        }
        const newUser = new User(data);
        await newUser.save();

        res.status(201).json({ _id: newUser.insertedId, ...data });
    }

    static async update(req, res) {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const data = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params.id },
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(201).json({ status: true, data: updatedUser });
    }

    static async delete(req, res) {
        const user = await User.findById({ _id: req.params.id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        await User.deleteOne({ _id: req.params.id });
        res.status(204).json({ status: true, message: "User deleted" });
    }
}

module.exports = ActorController;
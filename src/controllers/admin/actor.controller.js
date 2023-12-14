const ActorService = require("../../services/admin/actor.service");
const { StatusCodes } = require("http-status-codes");

class ActorController {
  static async index(req, res) {
    try {
      const actor = await ActorService.index();
      res.json({ status: true, data: actor });
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: false, message: error.message });
    }
  }

  static async show(req, res) {
    try {
      const actor = await ActorService.show(req.params.id);
      res.json({ status: true, data: actor });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ status: false, message: error });
    }
  }

  static async create(req, res) {
    const data = req.body;
    data.role = "movie-actor";
    try {
      const user = await ActorService.create({ email: data.email });
      res
        .status(StatusCodes.CREATED)
        .json({ _id: newUser.insertedId, ...data });
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: false, message: error.message });
    }
  }

  static async update(req, res) {
    const body = req.body;
    const id = req.params.id;
    try {
      const updatedUser = await ActorService.update(id, body);
      res.status(StatusCodes.CREATED).json({ status: true, data: updatedUser });
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: false, message: error.message });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    try {
      await ActorService.delete(id);
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ status: true, message: "User deleted" });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ status: false, message: error });
    }
  }
}

module.exports = ActorController;
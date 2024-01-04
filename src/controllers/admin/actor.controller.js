const { matchedData } = require("express-validator");
const ActorService = require("../../services/admin/actor.service");
const { StatusCodes } = require("http-status-codes");

class ActorController {
  static async index(req, res, next) {
    try {
      const actor = await ActorService.index();
      res.json({ status: true, data: actor });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const actor = await ActorService.show(req.params.id);
      res.json({ status: true, data: actor });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const data = req.body;
    data.role = "movie-actor";
    try {
      const user = await ActorService.create({ email: data.email });
      res
        .status(StatusCodes.CREATED)
        .json({ _id: newUser.insertedId, ...data });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const body = matchedData(req);
    const id = req.params.id;
    try {
      const updatedUser = await ActorService.update(id, body);
      res.status(StatusCodes.CREATED).json({ status: true, data: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      await ActorService.delete(id);
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ status: true, message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ActorController;

const User = require("../../models/User");
const Exception = require("../../exceptions");
const { StatusCodes } = require("http-status-codes");

class ActorService {
  static async index() {
    const actors = await User.find({});
    if (!actors) {
      throw new Exception("actors not found", StatusCodes.NOT_FOUND);
    }
    return actors;
  }

  static async show(id) {
    const actor = await User.findById({ _id: id });
    if (!actor) {
      throw new Exception("actor not found", StatusCodes.NOT_FOUND);
    }
    return actor;
  }
  static async create({ data }) {
    const actor = await User.findOne({ email: data.email });
    if (actor) {
      throw new Exception(
        "actor already exist in the database",
        StatusCodes.BAD_REQUEST
      );
    }
    const newActor = new User(data);
    await newActor.save();
    return newActor;
  }

  static async update({ id, body }) {
    const actor = await User.findById({ _id: id });
    if (!actor) {
      throw new Exception("actor not found", StatusCodes.NOT_FOUND);
    }
    Object.assign(actor, body);
    await actor.save();
    return actor;
  }
  static async delete(id) {
    const actor = await User.findById({ _id: id });
    if (!actor) {
      throw new Exception("actor not found");
    }
    await User.deleteOne({ _id: id });
  }
}

module.exports = ActorService;

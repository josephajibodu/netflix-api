const User = require("../../models/User");

class ActorService {
  static async index() {
    const actors = await User.find({});
    if (!actors) {
      throw new Error("Actors not found");
    }
    return actors;
  }

  static async show(id) {
    const actor = await User.findById({ _id: id });
    if (!actor) {
      throw new Error("Actor not found");
    }
    return actor;
  }
  static async create({ data }) {
    const actor = await User.findOne({ email: data.email });
    if (actor) {
      throw new Error("Actor already exist in the database");
    }
    const newActor = new User(data);
    await newActor.save();
    return newActor;
  }

  static async update({ id, body }) {
    const actor = await User.findById({ _id: id });
    if (!actor) {
      throw new Error("Actor not found");
    }
    Object.assign(actor, body);
    await actor.save();
    return actor;
  }
  static async delete(id) {
    const actor = await User.findById({ _id: id });
    if (!actor) {
      throw new Error("Actor not found");
    }
    await User.deleteOne({ _id: id });
  }
}

module.exports = ActorService;
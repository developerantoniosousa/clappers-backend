const Collaborator = require("../models/CollaboratorModel");

class CollaboratorController {
  async store(request, response) {
    const collabortor = await Collaborator.create(request.body);
    return response.json(collabortor);
  }

  async list(request, response) {
    const userIdLogged = request.userIdLogged;
    const { name, page = 1 } = request.query;
    const filter =
      name == null
        ? { user: { $ne: userIdLogged } }
        : { name: new RegExp(name, "i"), user: { $ne: userIdLogged } };
    const collaborators = await Collaborator.paginate(filter, {
      page: Math.abs(page),
    });
    return response.json(collaborators);
  }
}

module.exports = new CollaboratorController();

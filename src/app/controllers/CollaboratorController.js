const Collaborator = require("../models/CollaboratorModel");

class CollaboratorController {
  async store(request, response) {
    const collabortor = await Collaborator.create(request.body);
    return response.json(collabortor);
  }

  async list(request, response) {
    const { name, page = 1 } = request.query;
    const filter = name == null ? {} : { name: new RegExp(name, "i") };
    const collaborators = await Collaborator.paginate(filter, { page: Math.abs(page) });
    return response.json(collaborators);
  }
}

module.exports = new CollaboratorController();

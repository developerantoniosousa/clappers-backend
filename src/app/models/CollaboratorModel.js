const mongoose = require("mongoose");

const CollaboratorSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  }
);

module.exports = mongoose.model("Collaborator", CollaboratorSchema);

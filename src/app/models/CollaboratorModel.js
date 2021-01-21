const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CollaboratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collaborator",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  own_claps: {
    type: Number,
    default: 0,
  },
  available_claps: {
    type: Number,
    default: 0,
  },
});

CollaboratorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Collaborator", CollaboratorSchema);

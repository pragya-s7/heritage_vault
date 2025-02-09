const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], default: ['viewer'] },
  connectedVaults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyVault' }],
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);
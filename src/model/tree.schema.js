const mongoose = require('mongoose');

const itemDesignSchema = mongoose.Schema({
  backgroundImage: {
    type: String,
    trim: true,
  },
  backgroundColor: {
    type: String,
    trim: true,
  },
  textColor: {
    type: String,
    trim: true,
  },
});

const linkItemSchema = mongoose.Schema({
  thumb: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  alias: {
    type: String,
    required: true,
    trim: true,
  },
  design: itemDesignSchema,
});

const treeSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  links: [linkItemSchema],
  social: [linkItemSchema],
  design: {
    backgroundImage: {
      type: String,
      trim: true,
    },
    backgroundColor: {
      type: String,
      trim: true,
    },
  },
});

const TreeModel = mongoose.model('Tree', treeSchema);

module.exports = TreeModel;
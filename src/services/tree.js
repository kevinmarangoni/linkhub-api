const TreeModel = require("../model/tree.schema.js");
const { v4: uuidv4 } = require('uuid');
const generateShort = require("../helper/slug.js")

class TreeService {
    async createTree(treeData) {
      const treeWithId = { ...treeData, id: uuidv4(), slug: generateShort(12) };
      return await TreeModel.create(treeWithId);
    }
  
    async getTreeById(treeId) {
      return await TreeModel.findOne({ id: treeId });
    }
  
    async updateTree(treeId, updatedTreeData) {
      return await TreeModel.findOneAndUpdate({ id: treeId }, updatedTreeData, { new: true });
    }
  
    async softDeleteTree(treeId) {
      const updatedData = { active: false };
      return await TreeModel.findOneAndUpdate({ id: treeId }, updatedData, { new: true });
    }

    async getTreesByOwner(owner) {
        return await TreeModel.find({ owner });
      }

    async getTreeBySlug(slug){
      return await TreeModel.findOne({ slug: slug });
    }
  }

  module.exports = new TreeService()
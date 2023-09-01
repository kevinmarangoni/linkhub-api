const TreeModel = require("../model/tree.schema.js");
const { v4: uuidv4 } = require('uuid');

class TreeService {
    async createTree(treeData) {
      const treeWithId = { ...treeData, id: uuidv4() };
      return await TreeModel.create(treeWithId);
    }
  
    async getTreeById(treeId) {
      return await TreeModel.findOne({ id: treeId }); // Busca pelo campo 'id' em vez de '_id'
    }
  
    async updateTree(treeId, updatedTreeData) {
      return await TreeModel.findOneAndUpdate({ id: treeId }, updatedTreeData, { new: true });
    }
  
    async softDeleteTree(treeId) {
      const updatedData = { active: false }; // Desativa a árvore em vez de excluí-la
      return await TreeModel.findOneAndUpdate({ id: treeId }, updatedData, { new: true });
    }

    async getTreesByOwner(owner) {
        return await TreeModel.find({ owner }); // Busca todas as árvores do owner específico
      }
  }

  module.exports = new TreeService()
const TreeService = require("../services/tree");
const httpStatus = require("http-status");

class TreeController {
  async createTree(req, res) {
    const treeData = req.body;

    if (!treeData) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing tree data" });
      return;
    }

    const { title, owner, links, social, design } = treeData;

    if (!title || typeof title !== "string") {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid or missing title" });
      return;
    }

    if (!owner || typeof owner !== "string") {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid or missing owner" });
      return;
    }

    if (!Array.isArray(links) || !Array.isArray(social)) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Links and social must be arrays" });
      return;
    }

    const isValidDesign = (design) => {
      if (!design) return true; // Design is optional

      return (
        typeof design === "object" &&
        (typeof design.backgroundImage === "string" || typeof design.backgroundColor === "string")
      );
    };

    if (!isValidDesign(design)) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid design object" });
      return;
    }

    try {
      const createdTree = await TreeService.createTree(treeData);
      res.status(httpStatus.CREATED).json(createdTree);
    } catch (error) {
        console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async getTreeById(req, res) {
    const treeId = req.params.treeId;

    if (!treeId) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing tree ID" });
      return;
    }

    try {
      const tree = await TreeService.getTreeById(treeId);
      if (!tree) {
        res.status(httpStatus.NOT_FOUND).json({ error: "Tree not found" });
        return;
      }
      res.status(httpStatus.OK).json(tree);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async updateTree(req, res) {
    const treeId = req.params.treeId;
    const updatedTreeData = req.body.tree;

    if (!treeId) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing tree ID" });
      return;
    }

    if (!updatedTreeData) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing updated tree data" });
      return;
    }

    try {
      const updatedTree = await TreeService.updateTree(treeId, updatedTreeData);
      if (!updatedTree) {
        res.status(httpStatus.NOT_FOUND).json({ error: "Tree not found" });
        return;
      }
      res.status(httpStatus.OK).json(updatedTree);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async softDeleteTree(req, res) {
    const treeId = req.params.treeId;

    if (!treeId) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing tree ID" });
      return;
    }

    try {
      const deletedTree = await TreeService.softDeleteTree(treeId);
      if (!deletedTree) {
        res.status(httpStatus.NOT_FOUND).json({ error: "Tree not found" });
        return;
      }
      res.status(httpStatus.OK).json(deletedTree);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async getTreesByOwner(req, res) {
    const owner = req.params.owner;

    if (!owner) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing owner parameter" });
      return;
    }

    try {
      const trees = await TreeService.getTreesByOwner(owner);
      res.status(httpStatus.OK).json(trees);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }
}

module.exports = new TreeController();
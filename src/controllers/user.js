const UserService = require("../services/user");
const httpStatus = require("http-status");

class UserController {

  async handleUserOAuthLogin(req, res) {
    const userData = req.body;
    if (!userData) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing user data" });
      return;
    }

    try {
      const user = await UserService.handleUserOAuthLogin(userData);
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    const userData = req.body;

    if (!userData) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing user data" });
      return;
    }

    try {
      const updatedUser = await UserService.updateUser(userData);
      res.status(httpStatus.OK).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async inactivateUser(req, res) {
    const userData = req.body;

    if (!userData) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing user data" });
      return;
    }

    try {
      const result = await UserService.inactivateUser(userData);
      res.status(httpStatus.OK).json(result);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async activateUser(req, res) {
    const userData = req.body;

    if (!userData) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing user data" });
      return;
    }

    try {
      const result = await UserService.activateUser(userData);
      res.status(httpStatus.OK).json(result);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }
  async getUserById(req, res) {
    const userId = req.params.userId;

    if (!userId) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing user ID" });
      return;
    }

    try {
      const user = await UserService.getUserById(userId);

      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({ error: "User not found" });
        return;
      }

      res.status(httpStatus.OK).json(user);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async getUserByEmail(req, res) {
    const email = req.params.email;

    if (!email) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Missing email parameter" });
      return;
    }

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({ error: "User not found" });
        return;
      }

      res.status(httpStatus.OK).json(user);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async getAllActiveUsers(req, res) {
    try {
      const activeUsers = await UserService.getAllActiveUsers();
      res.status(httpStatus.OK).json(activeUsers);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async getInactiveUsers(req, res) {
    try {
      const inactiveUsers = await UserService.getInactiveUsers();
      res.status(httpStatus.OK).json(inactiveUsers);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      res.status(httpStatus.OK).json(allUsers);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }
}

module.exports = new UserController();

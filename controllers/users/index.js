const { usersService } = require("../../services");

const service = new usersService();

class usersController {
  signup = async (req, res) => {
    const result = await service.createUser(req.body);

    res.status(200).json({ status: "success", code: 200, result });
  };

  login = async (req, res) => {
    const result = await service.loginUser(req.body);

    res.status(200).json({ status: "success", code: 200, result });
  };
}

module.exports = usersController;

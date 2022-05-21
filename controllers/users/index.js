const { usersService } = require("../../services");
const { resizeAvatar } = require("../../helpers");

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

  current = async (req, res) => {
    const { email, subscription } = req.user;

    res.status(200).json({
      status: "success",
      code: 200,
      result: {
        email,
        subscription,
      },
    });
  };

  logout = async (req, res) => {
    await service.logoutUser({ _id: req.user._id });

    res.status(204).json();
  };

  updateAvatar = async (req, res) => {
    const avatarPath = await resizeAvatar(req.file);

    const result = await service.patchUserAvatar(
      { _id: req.user._id },
      avatarPath
    );

    res.status(200).json({
      status: "success",
      code: 200,
      result,
    });
  };
}

module.exports = usersController;

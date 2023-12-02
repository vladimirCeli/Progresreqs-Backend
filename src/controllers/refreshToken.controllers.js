const Person = require("../model/Person.model");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const handleRefreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies?.token || req.cookies?.ugid;

    if (!refresh_token) {
      return res.sendStatus(401); // Agrega un manejo adecuado para el caso de falta de token
    }

    const foundUser = await Person.findOne({ where: { refresh_token } });

    if (!foundUser) {
      return res.sendStatus(403);
    }

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            rol_id: foundUser.rol_id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      );

      res.json({
        username: foundUser.username,
        rol_id: foundUser.rol_id,
        token: accessToken,
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { handleRefreshToken };
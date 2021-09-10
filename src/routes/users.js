const router = require("express").Router();
require("../database");

const { User, userProps } = require("../models/users");

// retornar todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("posts");

    res.json({
      msg: "everything ok",
      users,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// retornar usuario
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(400).json({
      error: "Usuario no encontrado",
    });
  }

  res.json({
    user,
  });
});

// retornar usuario por id
router.get("/byid/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      error: "Usuario no encontrado",
    });
  }

  res.json({
    user,
  });
});

// crear usuario
router.post("/", async (req, res) => {
  const { body } = req;

  if (!body.username) {
    return res.status(400).json({ error: "no ha enviado los datos validos" });
  }

  try {
    const user = new User(body);
    const creado = await user.save();
    res.status(201).json({
      msg: "Usuario creado",
      usuario: creado,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.put("/:username", getUser, async (req, res) => {
  const { body } = req;

  let faltan = [];
  userProps.forEach((key) => {
    if (!body.hasOwnProperty(key)) {
      faltan.push(key);
    }
    res.user[key] = body[key];
  });
  if (faltan.length !== 0) {
    return res.status(400).json({
      error: "faltan propiedades de el usuario",
      faltan,
    });
  }

  const updated = await res.user.save();
  res.json({
    msg: "Usuario actualizado con exito",
    user: updated,
  });
});

router.delete("/:username", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({
      msg: "usuario eliminado",
      user: res.user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function getUser(req, res, next) {
  const { username } = req.params;
  let user;
  try {
    user = await User.findOne({ username }).exec();
    if (user == null) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
}

module.exports = router;

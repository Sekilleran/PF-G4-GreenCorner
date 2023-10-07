const { User, Favorite, Product } = require("../db");
const { Op } = require("sequelize");

//CREA NUEVO USUARIO
const createUser = async (nickname, email, picture) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        [Op.or]: [{ nickname }, { email }],
      },
      defaults: {
        nickname,
        email,
        picture,
      },
    });

    if (created) {
      console.log("Nuevo usuario creado:", user.dataValues);
    } else {
      console.log("El usuario ya existe:", user.dataValues);
    }

    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//OBTIENE USUARIO POR ID
const getUserById = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//ACTUALIZA USUARIO
const updateUser = async (userId, userData) => {
  try {
    const [updatedCount, updatedUser] = await User.update(userData, {
      where: { id: userId },
      returning: true, // Para obtener el registro actualizado
    });

    if (updatedCount === 0) {
      throw new Error("User not found or no changes made.");
    }

    return updatedUser[0]; // Devuelve el usuario actualizado
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      include: [
        {
          model: Product,
          required: true,
        },
      ],
    });
    return favorites;
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
const postFavorite = async (product) => {
  try {
    const { product_id, email } = product;

    const newFavorite = await Favorite.create({
      product_id,
      email,
    });

    return newFavorite;
  } catch (error) {
    console.error("Error en postFavorite:", error.message);
    throw new Error("Error en el servidor");
  }
};

const getUserbyName = async (name) => {
  const userName = name;
  try {
    const user = await User.findOne({
      where: { nickname: userName },
    });
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    if (!users) {
      return "There is no users yet";
    }
    return users;
  } catch (error) {
    console.log(error.message);
  }
};

const getByRol = async (rol) => {
  const userRol = rol;
  try {
    const user = await User.findAll({
      where: { role: userRol },
    });
    if (!user) {
      return `No ${rol} yet`;
    }
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    let userFromDb = await User.find({
      where: {
        email: email,
      },
    });
    console.log("El usuario encontrado en el controler", userFromDb);
    return userFromDb;
  } catch (error) {
    console.error("Error en getProductCart:", error.message);
    res.status(500).json({ error: "Error en" });
  }
};

const deleteUser = async (id) => {
  const idUser = id;
  try {
    const deleter = User.destroy({
      where: {
        id: idUser,
      },
    });
    if (deleter) {
      return idUser;
    } else {
      return "This user doesn't exist";
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllUsers,
  getByRol,
  getUserById,
  getUserbyName,
  getAllFavorites,
  postFavorite,
  createUser,
  deleteUser,
  updateUser,
  getUserByEmail,
};

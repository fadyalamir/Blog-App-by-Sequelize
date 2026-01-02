import { Op } from "sequelize";
import UserModel from "../../../DB/model/User.model.js";
import { errorHandling } from "../../../utils/errorHandling.js"
import Blog from "../../../DB/model/Blog.model.js";

// export const userList = async (req, res, next) => {
//   try {
//     const users = await UserModel.findAll({
//       where:{
//         // id: 5,
//         // gender: "female"
//         // [Op.and]:[
//         //   {
//         //     id: 1
//         //   },
//         //   {
//         //     gender: "female"
//         //   }
//         // ]
//         // [Op.and]:[
//         //   {gender: 'male'},
//         //   {
//         //     [Op.or]: [
//         //       {
//         //         id: 8
//         //       },
//         //       {
//         //         id: 3
//         //       }
//         //     ]
//         //   }
//         // ]
//         // firstName:{
//         //   [Op.like]:'%a%'
//         // }
//         // firstName:{
//         //   [Op.startsWith]:"f"
//         // }
//         firstName:{
//           [Op.substring]:"d"
//         }
//       },
//       // attributes:['email', 'gender']
//       attributes:{
//         exclude:['password']
//       }
//     });
//     return res.status(200).json({ message: "Done", users });
//   } catch (error) {
//     await errorHandling(error);
//   }
// }

export const userList = async (req, res, next) => {
  try {
    // const users = await UserModel.findAndCountAll({
    //   where:{
    //     gender: 'female'
    //   },
    //   offset: 2,
    //   limit: 3
    // });
    const users = await UserModel.findAll({paranoid:false});
    return res.status(200).json({ message: "Done", users });
  } catch (error) {
    await errorHandling(error);
  }
}

export const userProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findByPk(req.params.id, {
      include: [{
        model: Blog
      }],
      attributes: { exclude: ['password'] }
    });
    return res.status(200).json({ message: "Done", user });
  } catch (error) {
    await errorHandling(error);
  }
}

export const userHome = async (req, res, next) => {
  try {
    // const user = await UserModel.findOne({id: req.params.id, attributes:{ exclude: ['password'] }});
    const user = await UserModel.findOne({
      where:{
        id: req.params.id
      },
      attributes:{ exclude: ['password'] }
    });
    return res.status(200).json({ message: "Done", user });
  } catch (error) {
    await errorHandling(error);
  }
}

export const updateUserProfile = async (req, res, next) => {
  try {
    const { DOB, gender } = req.body;
    const { id } = req.params;
    // const user = await UserModel.update({DOB, gender}, {
    //   where: {
    //     id
    //   }
    // })
    // return user[0] ? res.status(200).json({ message: "Done", user }) : res.status(404).json({ message: "In-valid account Id"});

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "In-valid account Id"});
    }
    user.DOB = DOB;
    user.gender = gender;
    await user.save();
    return res.status(200).json({ message: "Done", user });
  } catch (error) {
    await errorHandling(error);
  }
}

export const deleteUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.destroy({
      where: {
        id
      },
      // force:true
    })

    // const user = await UserModel.destroy({
    //   truncate: true,
    //   force: true
    // })
    return user ? res.status(200).json({ message: "Done", user }) : res.status(404).json({ message: "In-valid account Id"});
  } catch (error) {
    await errorHandling(error);
  }
}
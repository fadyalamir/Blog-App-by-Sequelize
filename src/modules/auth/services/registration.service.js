import UserModel from "../../../DB/model/User.model.js";
import { errorHandling } from "../../../utils/errorHandling.js";

// export const signup = async(req, res, next) => {
//   try {
//     // const user = await UserModel.create(req.body, {validate: true});
//     // const user = await UserModel.findAll();
//     const {fullName, email, password} = req.body;

//     // const user = new UserModel({fullName:fullName, email, password});
//     // user.gender = "female";
//     // await user.save({validate: false});

//     // const user = UserModel.build({fullName:fullName, email, password});
//     // user.gender = "female";
//     // await user.save({validate: false});

//     // const user = await UserModel.create({fullName, email, password}, {validate: true});
//     // const user = await UserModel.create(req.body, { fields: ['firstName', 'lastName', 'email','password'],validate: true});

//     // const user = await UserModel.bulkCreate(req.body.users, { validate: true });

//     const user = await UserModel.upsert(req.body, { validate: true });

//     // return user[1] ? res.status(201).json({ message: "Signup page", user }) : res.status(400).json({ message: "Fail" });

    
//   } catch(error) {
//     await errorHandling(error, res);
//   }
// }

// export const signup = async(req, res, next) => {
//   try {
//     const {userName, email, password} = req.body;
//     const user = await UserModel.findOrCreate({
//       where:{
//         email
//       },
//       defaults:{userName, email, password}
//     });
//     return user[1] ? res.status(201).json({message: "Signup", user}) : res.status(409).json({message: "Email exist"})
//   } catch(error) {
//     await errorHandling(error, res);
//   }
// }

export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    // 1. التأكد أولاً إذا كان المستخدم موجوداً
    const isExist = await UserModel.findOne({ where: { email } });
    
    if (isExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 2. إنشاء المستخدم الجديد
    const user = await UserModel.create({ userName, email, password });

    return res.status(201).json({ message: "Signup Successful", user });
    
  } catch (error) {
    // نمرر الخطأ للـ global error handling
    await errorHandling(error, res);
  }
};

export const login = async(req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({
      where:{
        email, password
      },
    });
    return user ? res.status(200).json({message: "login", user}) : res.status(404).json({message: "In-valid email or password"})
  } catch(error) {
    await errorHandling(error, res);
  }
}
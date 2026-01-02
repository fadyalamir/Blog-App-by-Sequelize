import Blog from "../../../DB/model/Blog.model.js";
import UserModel from "../../../DB/model/User.model.js";
import { errorHandling } from "../../../utils/errorHandling.js"

export const blogList = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: [{
        model: UserModel,
        // attributes: ['email', 'firstName'],
        attributes: {exclude: 'password'}
      }]
    });
    return res.status(200).json({message: "Done", blogs})
  } catch (error) {
    await errorHandling(error, res);
  }
}

export const createBlog = async (req, res, next) => {
  try {
    // const blog = new Blog({});
    // blog.title = req.body.title;
    // blog.content = req.body.content;
    // console.log(blog.getCustomTitle());
    // await blog.save();
    const blog = await Blog.create(req.body);
    return res.status(200).json({ message: "Done", blog })
  } catch (error) {
    await errorHandling(error, res);
  }
}
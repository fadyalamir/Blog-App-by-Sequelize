import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import UserModel from "./User.model.js";

// class Blog extends Model {
//   title; // Shadowing
//   getCustomTitle() {
//     return this.title + " " + "lolololololol"
//   }
// }

// Blog.init({
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   content: {
//     type: DataTypes.STRING(5000),
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'BLOGS'
// })

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(5000),
    allowNull: false
  }
}, {

})

Blog.belongsTo(UserModel, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {
    allowNull: false
  }
})

UserModel.hasMany(Blog)

export default Blog;
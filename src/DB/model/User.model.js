import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'u_id',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'u_firstName',
    validate: {
      notEmpty: true,
      len: [2, 50]
    },
    get() {
      // return this.getDataValue('firstName').toUpperCase();
      return this.gender == 'male' ? 'MR:' + this.getDataValue('firstName')?.toUpperCase() : "Mrs:" + this.getDataValue('firstName')?.toUpperCase();
    }
  },
  lastName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'u_lastName',
    // validate: {
    //   checkLastName() {
    //     if (this.lastName == 'admin') {
    //       throw new Error('lastName can not be equal to admin');
    //     }
    //   }
    // },
    // set(value) {
    //   return this.setDataValue('lastName', value.trim());
    // },
  },
  userName: {
    type: DataTypes.VIRTUAL,
    set(value) {
      console.log({ value });
      console.log(value.split(" "));
      const [firstNameValue, lastNameValue] = value.split(" ");
      this.setDataValue('firstName', firstNameValue);
      this.setDataValue('lastName', lastNameValue);
    },
    get() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'u_email',
    comment: 'this is user email has unique value',
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'u_password'
  },
  gender: {
    type: DataTypes.ENUM(['male', 'female']),
    defaultValue: 'male',
    field: 'u_gender'
  },
  DOB: {
    type: DataTypes.STRING,
    field: 'u_DOB'
  },
  confirmEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'u_confirmEmail'
  },
}, {
  // freezeTableName: true,
  // tableName: 'myUsers',
  timestamps: true,
  createdAt: 'u_createdAt',
  updatedAt: 'u_updatedAt',
  validate: {
    checkLastName() {
      if (this.lastName == 'admin') {
        throw new Error('lastName can not be equal to admin');
      }
    }
  },
  paranoid: true
});

export default UserModel
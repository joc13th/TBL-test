const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = sequelize => {
    const User = sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
          beforeUpdate: (User) =>
            (User.password = bcrypt.hashSync(
              User.password,
              bcrypt.genSaltSync(10),
              null
            )),
          beforeCreate: (User) =>
            (User.password = bcrypt.hashSync(
              user.password,
              bcrypt.genSaltSync(10),
              null
            )),
        },
      }
    );
    user.prototype.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password);
    };
  
    return User;
};
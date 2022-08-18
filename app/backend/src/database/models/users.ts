import { Model, INTEGER, STRING, DATE } from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DATE,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'example',
  timestamps: false,
});

export default Users;

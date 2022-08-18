import { Model, INTEGER, STRING, DATE } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!: number;
  public homeTeam!: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
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
  modelName: 'teams',
  timestamps: false,
});

export default Teams;

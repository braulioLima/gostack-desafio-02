import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Recipient from '../app/models/Recipient';
import User from '../app/models/User';

const models = [Recipient, User];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {}
}

export default new Database();

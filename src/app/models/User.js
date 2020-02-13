import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/**
 * This class is responsible to be model representation of User
 */
class User extends Model {
  /**
   * Init method of User model
   * @param {Sequelize} sequelize
   */
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    /**
     * Make the encryptation of the password
     */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /**
   * Check if the password is valid
   * @param {String} password
   */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

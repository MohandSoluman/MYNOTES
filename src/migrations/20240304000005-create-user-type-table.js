"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
    });

    // Add some default user types
    await queryInterface.bulkInsert("user_types", [
      { name: "Administrator", code: "ADMIN" },
      { name: "Regular User", code: "USER" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_types");
  },
};

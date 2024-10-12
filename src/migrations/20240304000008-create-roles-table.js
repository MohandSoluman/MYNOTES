"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("roles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    });

    // Add some default roles
    await queryInterface.bulkInsert("roles", [
      { role_name: "CREATE_USER" },
      { role_name: "UPDATE_USER" },
      { role_name: "DELETE_USER" },
      { role_name: "VIEW_USER" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("roles");
  },
};

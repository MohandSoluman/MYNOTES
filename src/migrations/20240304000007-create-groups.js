"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("groups", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      group_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    });

    // Add some default groups
    await queryInterface.bulkInsert("groups", [
      { group_name: "Administrators" },
      { group_name: "Users" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("groups");
  },
};

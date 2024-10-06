"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "stores",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      isBn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      publisher: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("books", ["created_at"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("books");
  },
};

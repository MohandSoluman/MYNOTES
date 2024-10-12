"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("group_role", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    // Add unique constraint to prevent duplicate group-role assignments
    await queryInterface.addConstraint("group_role", {
      fields: ["group_id", "role_id"],
      type: "unique",
      name: "unique_group_role",
    });

    // Add indexes
    await queryInterface.addIndex("group_role", ["group_id"]);
    await queryInterface.addIndex("group_role", ["role_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("group_role");
  },
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_group", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    // Add unique constraint to prevent duplicate user-group assignments
    await queryInterface.addConstraint("user_group", {
      fields: ["user_id", "group_id"],
      type: "unique",
      name: "unique_user_group",
    });

    // Add indexes
    await queryInterface.addIndex("user_group", ["user_id"]);
    await queryInterface.addIndex("user_group", ["group_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_group");
  },
};

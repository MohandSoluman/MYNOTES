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

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("audit_logs", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      entity_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE"),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      old_values: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      new_values: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // Add indexes for better query performance
    await queryInterface.addIndex("audit_logs", ["entity_type", "entity_id"]);
    await queryInterface.addIndex("audit_logs", ["user_id"]);
    await queryInterface.addIndex("audit_logs", ["created_at"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("audit_logs");
  },
};

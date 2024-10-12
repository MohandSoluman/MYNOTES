"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create admin user
    const adminUser = await queryInterface.bulkInsert(
      "users",
      [
        {
          user_name: "admin",
          user_type_code: "ADMIN",
          email: "admin@example.com",
          password: await bcrypt.hash("admin123", 10),
          isActive: true,
          create_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Get the Administrators group
    const [adminGroup] = await queryInterface.sequelize.query(
      `SELECT id FROM "groups" WHERE group_name = 'Administrators'`
    );
    const adminGroupId = adminGroup[0].id;

    // Assign admin user to Administrators group
    await queryInterface.bulkInsert("user_group", [
      {
        user_id: adminUser[0].id,
        group_id: adminGroupId,
      },
    ]);

    // Get all role IDs
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM roles`
    );

    // Assign all roles to Administrators group
    await queryInterface.bulkInsert(
      "group_role",
      roles.map((role) => ({
        group_id: adminGroupId,
        role_id: role.id,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", { user_name: "admin" });
  },
};

import { pgPool } from "../config/pg.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginUser = async (username, password) => {
  const result = await pgPool.query(
    `SELECT * FROM public.users WHERE username = $1 `,
    [username]
  );
  if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  const user = result.rows[0];
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }
  if (user.status !== "active") {
    throw new Error("User is not active");
  }

  const token = jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      username: user.username,
      status: user.status,
      role: user.role,
      profile: user.profile,
      notes: user.notes,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

const createUser = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    username,
    password,
    status,
    role,
    profile,
    notes,
  } = userData;

  const existingUser = await pgPool.query(
    `SELECT * FROM users WHERE username = $1 OR email = $2`,
    [username, email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pgPool.query(
    `INSERT INTO users (first_name , last_name , email, phone, username, password, status, role, profile, notes , joining) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10 , $11) RETURNING id`,
    [
      first_name,
      last_name,
      email,
      phone,
      username,
      hashedPassword,
      status,
      role,
      profile,
      notes,
      new Date(),
    ]
  );

  return {
    message: "User created successfully",
    userId: result.rows[0].id,
  };
};

const editUser = async (id, userData) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    username,
    password,
    status,
    role,
    profile,
    notes,
  } = userData;

  const existingUser = await pgPool.query(`SELECT * FROM users WHERE id = $1`, [
    id,
  ]);
  if (existingUser.rows.length === 0) {
    throw new Error("User not found");
  }

  let hashedPassword = existingUser.rows[0].password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const checks = [
    { field: "username", value: username, error: "Username already exists" },
    { field: "email", value: email, error: "Email already exists" },
  ];

  for (const check of checks) {
    if (check.value) {
      const existing = await pgPool.query(
        `SELECT * FROM users WHERE ${check.field} = $1 AND id != $2`,
        [check.value, id]
      );
      if (existing.rows.length > 0) {
        throw new Error(check.error);
      }
    }
  }

  const result = await pgPool.query(
    `UPDATE users SET 
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        phone = COALESCE($4, phone),
        username = COALESCE($5, username),
        password = COALESCE($6, password),
        status = COALESCE($7, status),
        role = COALESCE($8, role),
        profile = COALESCE($9, profile),
        notes = COALESCE($10, notes)
      WHERE id = $11 RETURNING id`,
    [
      first_name,
      last_name,
      email,
      phone,
      username,
      hashedPassword,
      status,
      role,
      profile,
      notes,
      id,
    ]
  );

  return { message: "User updated successfully", userId: result.rows[0].id };
};

const getUsers = async () => {
  const result = await pgPool.query(`SELECT * FROM users`);
  return result.rows;
};

export default { loginUser, getUsers, createUser, editUser };

import fs from "fs";
import { join } from "path";
import { databaseUploadFile, databaseUser } from "../types/types";

const savingDir = join(process.cwd(), "src/data");
const dbPath = join(savingDir, "mockDB.json");
console.log("Mock database located at:", dbPath);

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

//FILES
export function getFiles(): databaseUploadFile[] {
  const db = readDB();
  return db.files;
}

export function addFile(file: databaseUploadFile) {
  const db = readDB();
  db.files.push(file);

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

//USERS

export function getUsers(): databaseUser[] {
  const db = readDB();
  return db.users;
}

export function addUser(user: databaseUser) {
  const db = readDB();
  db.users.push(user);

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

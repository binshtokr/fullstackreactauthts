// utils/dbUtils.ts
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Utility function to open the database connection
export const openDatabase = async (): Promise<Database> => {
    return await open({
        filename: './userDatabase.db',
        driver: sqlite3.Database,
    });
};

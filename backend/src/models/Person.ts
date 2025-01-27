
import { openDatabase } from "../utils/dbUtils";
import PersonModel from "../Interfaces/PersonModel";

export async function initDatabase(): Promise<void> {
    try {
        const db = await openDatabase();
        console.log("Database connected successfully");

        await db.run(`
      CREATE TABLE IF NOT EXISTS persons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        passwd TEXT
      )
    `);
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

export async function createPerson(person: PersonModel): Promise<PersonModel> {
    try {
        const db = await openDatabase();

        const result = await db.run(
            `INSERT INTO persons (name, email, passwd) VALUES (?, ?, ?)`,
            [person.name, person.email, person.passwd]
        );

        const createdPerson = await db.get<PersonModel>(
            `SELECT id, name, email, passwd FROM persons WHERE id = ?`,
            [result.lastID]
        );

        if (!createdPerson) {
            throw new Error(`Failed to retrieve the newly created person with ID: ${result.lastID}`);
        }

        console.log(`Person added with ID: ${result.lastID}`);
        return createdPerson;
    } catch (err) {
        console.error("Error adding person:", err);
        throw err;
    }
}



export async function checkPersonInDb(person: PersonModel): Promise<PersonModel | null> {
    try {
        const db = await openDatabase();

        const row = await db.get<PersonModel>(
            `SELECT id, name, email, passwd FROM persons WHERE email = ? AND passwd = ?`,
            [person.email, person.passwd]
        );
        return row || null;
    } catch (err) {
        console.error("Error checking person in DB:", err);
        return null;
    }
}

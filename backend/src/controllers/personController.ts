import { Request, Response } from 'express';
import { createPerson, checkPersonInDb } from '../models/Person';
import PersonModel from '../Interfaces/PersonModel';

export const addPerson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, passwd }: { name: string; email: string; passwd: string } = req.body;

        if (!name || !email || !passwd) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const newPerson: PersonModel = {
            name, email, passwd,
            length: 0
        };
        const createdPerson = await createPerson(newPerson);

        res.status(201).json({
            message: "Person added successfully",
            person: createdPerson,
        });
    } catch (error) {
        console.error("Error adding person:", error);
        res.status(500).send("Error adding person");
    }
};

export const checkPerson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, passwd }: { email: string; passwd: string } = req.body;

        if (!email || !passwd) {
            res.status(400).json({ message: 'Missing email or password' });
            return;
        }

        const foundPerson = await checkPersonInDb({
            email, passwd,
            length: 0
        });

        if (!foundPerson) {
            res.status(404).json({ message: 'Person not found' });
            return;
        }

        res.status(200).json({
            message: 'Person found successfully',
            person: foundPerson,
        });
    } catch (error) {
        console.error("Error checking person:", error);
        res.status(500).send("Error checking person");
    }
};

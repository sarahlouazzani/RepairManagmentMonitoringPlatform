import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppDataSource from '../config/database';
import User from '../models/User';

const userRepository = AppDataSource.getRepository(User);

// Signup handler
export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await userRepository.findOne({ where: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = userRepository.create({ username, email, password: hashedPassword });
        await userRepository.save(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Login handler
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Profile handler
export const getProfile = async (req: Request, res: Response) => {
    const userId = req.user.id;

    try {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
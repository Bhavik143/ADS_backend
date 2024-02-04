import pool from '../Database/db.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const [user] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ? AND role = ?', [username, password, role]);

        if (user.length > 0) {
            const token = jwt.sign({ username: user[0].username, role: user[0].role }, 'Sirius', { expiresIn: '1h' });
            res.status(200).json({ token, user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const signup = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await pool.query('Insert into users (username, password, role) values (?, ?, ?)', [username, password, role]);

        res.status(200).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { login, signup };
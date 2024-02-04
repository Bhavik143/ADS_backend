import pool from '../Database/db.js'

const createForm = async (req, res) => {
    const { name, prn, year, branch, activities, achievements, email, phone } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO form (name, prn, year, branch, activities, achievements, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, prn, year, branch, activities, achievements, email, phone]
        );

        res.json({ message: "Filled form successfully", insertedId: result.insertId })
    }
    catch (error) {
        console.log("An error occured", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const getAllForms = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM form'
        );

        res.json(result)
    }
    catch (error) {
        console.log("An error occured");
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const getFormById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM form WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Form not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateFormById = async (req, res) => {
    const { id } = req.params;
    const { name, prn, year, branch, activities, achievements, email, phone } = req.body;

    try {
        await pool.query(
            'UPDATE form SET name = ?, prn = ?, year = ?, branch = ?, activities = ?, achievements = ?,email = ?, phone = ? WHERE id = ?',
            [name, prn, year, branch, activities, achievements, email, phone, id]
        );

        res.json({ message: 'Form updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteFormById = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM form WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Form not found' });
        } else {
            res.json({ message: 'Form deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { createForm, getAllForms, getFormById, updateFormById, deleteFormById }
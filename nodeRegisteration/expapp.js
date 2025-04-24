const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const app = express();
const PORT = 4004;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required." });
        }

        const fdata = await fs.readFile('student.json', { encoding: 'utf-8' });
        const users = JSON.parse(fdata || "[]");

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ msg: "Invalid email or password." });
        }

        res.status(200).json({ message: `Welcome back, ${user.name}!` });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        let arr = [];
        try {
            const fdata = await fs.readFile('student.json', { encoding: 'utf-8' });
            arr = JSON.parse(fdata || "[]");
        } catch (err) {
            arr = [];
        }

        const result = arr.find(ele => ele.email === email);
        if (result) {
            return res.status(409).json({ msg: "This email is already registered." });
        }

        arr.push({ name, email, password });
        await fs.writeFile('student.json', JSON.stringify(arr, null, 2));

        res.status(201).json({ message: "Registration successful!" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});


app.listen(PORT, () => {
    console.log("Express running at port " + PORT);
});

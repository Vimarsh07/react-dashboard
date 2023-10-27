const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Saves uploaded files in an "uploads" directory
const { exec } = require('child_process');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Endpoint for uploading and predicting defect rate
app.post('/predict-defect-rate', upload.single('file'), (req, res) => {
    const csvFilePath = req.file.path;
    const pythonScriptPath = 'D:\\Vimarsh\\Illinois Institute of Tech\\F23\\ASE\\Project\\ASE Project\\Python Models\\defect_rate_and_cost_prediction.py';
    const command = `python "${pythonScriptPath}" "${csvFilePath}"`;

    exec(command, (error, stdout, stderr) => {
        fs.unlink(csvFilePath, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            }
        });

        if (error) {
            console.error(`Python Error: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`Python Stderr: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const lines = stdout.trim().split('\n');
        const defectRate = parseFloat(lines[0].split(":")[1]);
        const costToSolve = parseFloat(lines[1].split(":")[1].replace('$', ''));

        return res.json({ defectRate, costToSolve });
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

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

app.post('/predict-loc-complexity', upload.single('file'), (req, res) => {
    const csvFilePath = req.file.path;
    const pythonScriptPath = 'D:\\Vimarsh\\Illinois Institute of Tech\\F23\\ASE\\Project\\ASE Project\\Python Models\\loc_complexity.py';
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

        // Assuming your Python script for LOC & code complexity outputs two lines: one for predicted lines of code and one for code complexity
        const predictedLOC = parseFloat(lines[0].split(":")[1]);
        const codeComplexity = parseFloat(lines[1].split(":")[1]);

        const plotFilePath = lines[2].slice(lines[2].indexOf(':') + 2); // Extracting the plot file path

        // Option 1: Send back Base64 encoded image
        const imageAsBase64 = fs.readFileSync(plotFilePath+".png", 'base64');
        fs.unlink(plotFilePath+".png", (err) => {
            if (err) console.error("Error deleting the plot file:", err);
        });
        return res.json({ predictedLOC, codeComplexity, plotImage: imageAsBase64 });

        // Option 2: If you have a static folder set up to serve images
        // const imageUrl = 'your_server_url/' + path.basename(plotFilePath);
        // return res.json({ predictedLOC, codeComplexity, plotImageUrl: imageUrl });

        
    });
});


app.post('/predict-software-cost', upload.single('file'), (req, res) => {
    const csvFilePath = req.file.path;
    const pythonScriptPath = 'D:\\Vimarsh\\Illinois Institute of Tech\\F23\\ASE\\Project\\ASE Project\\Python Models\\software_cost.py';
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

        // Assuming your Python script for software cost prediction outputs a single line with the predicted cost
        const softwareCost = parseFloat(lines[0].split(":")[1].replace('$', ''));

        return res.json({ softwareCost });
    });
});


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
        const plotFilePath = lines[2].slice(lines[2].indexOf(':') + 2); // Extracting the plot file path

        // Option 1: Send back Base64 encoded image
        const imageAsBase64 = fs.readFileSync(plotFilePath+".png", 'base64');
        fs.unlink(plotFilePath+".png", (err) => {
            if (err) console.error("Error deleting the plot file:", err);
        });
        return res.json({ defectRate, costToSolve, plotImage: imageAsBase64 });

        // Option 2: If you have a static folder set up to serve images
        // const imageUrl = 'your_server_url/' + path.basename(plotFilePath);
        // return res.json({ defectRate, costToSolve, plotImageUrl: imageUrl });

        
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

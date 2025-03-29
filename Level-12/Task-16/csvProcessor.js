const fs = require('fs');
const path = require('path');

// File paths
const inputFile = 'data.csv';
const outputFile = 'results.txt';

// Read the CSV file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`❌ Error reading file:`, err);
        return;
    }

    // Split CSV data by lines
    const lines = data.trim().split('\n');

    // Extract headers and data
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(row => row.split(','));

    // Process data: Calculate averages, max, and min values
    const subjectStats = {};

    headers.slice(1).forEach((subject, index) => {
        const scores = rows.map(row => parseFloat(row[index + 1])); // Extract scores
        const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
        const max = Math.max(...scores);
        const min = Math.min(...scores);

        subjectStats[subject] = {
            average: avg,
            max: max,
            min: min
        };
    });

    // Generate results text
    let resultText = '📊 CSV Data Analysis Results 📊\n\n';
    for (const [subject, stats] of Object.entries(subjectStats)) {
        resultText += `📘 ${subject}\n`;
        resultText += `   ➤ Average: ${stats.average}\n`;
        resultText += `   ➤ Max Score: ${stats.max}\n`;
        resultText += `   ➤ Min Score: ${stats.min}\n\n`;
    }

    // Write results to a new file
    fs.writeFile(outputFile, resultText, (err) => {
        if (err) {
            console.error(`❌ Error writing file:`, err);
        } else {
            console.log(`✅ Results successfully written to "${outputFile}"`);
        }
    });

    console.log(resultText);
});

const fs = require('fs');
const path = require('path');

// Directory containing the fact files
const directoryPath = path.join(__dirname, 'facts');
console.log(`Reading files from directory: ${directoryPath}`);

// Function to read and parse all fact files
function readFactFiles(directory) {
    const files = fs.readdirSync(directory);
    const factData = {};

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim());

        factData[file] = {};

        lines.forEach(line => {
            const [factName, factValue] = line.split(':').map(part => part.trim());
            factData[file][factName] = factValue;
        });
    });

    return factData;
}

// Function to identify anomalies
function identifyAnomalies(factData) {
    const factValues = {};

    // Aggregate facts
    Object.keys(factData).forEach(machine => {
        Object.keys(factData[machine]).forEach(factName => {
            if (factName === 'Serial') {
                return; // Ignore the Serial fact
            }
            if (!factValues[factName]) {
                factValues[factName] = {};
            }
            const factValue = factData[machine][factName];
            if (!factValues[factName][factValue]) {
                factValues[factName][factValue] = [];
            }
            factValues[factName][factValue].push(machine);
        });
    });

    // Identify anomalies
    const anomalies = [];

    Object.keys(factValues).forEach(factName => {
        const values = Object.keys(factValues[factName]);
        values.forEach(value => {
            const machines = factValues[factName][value];
            // A value is considered anomalous only if it appears in 5 or fewer machines
            if (machines.length <= 5) {
                anomalies.push({
                    fact: factName,
                    value: value,
                    machines: machines
                });
            }
        });
    });

    return anomalies;
}

// Main function to execute the anomaly detection
function main() {
    const factData = readFactFiles(directoryPath);
    const anomalies = identifyAnomalies(factData);

    if (anomalies.length > 0) {
        const machineAnomalies = {};

        anomalies.forEach(anomaly => {
            anomaly.machines.forEach(machine => {
                if (!machineAnomalies[machine]) {
                    machineAnomalies[machine] = [];
                }
                machineAnomalies[machine].push({
                    fact: anomaly.fact,
                    value: anomaly.value
                });
            });
        });

        console.log('Anomalies detected:');
        Object.keys(machineAnomalies).forEach(machine => {
            console.log(`Machine: ${machine}`);
            machineAnomalies[machine].forEach(anomaly => {
                console.log(`  Fact: ${anomaly.fact}, Value: ${anomaly.value}`);
            });
        });
    } else {
        console.log('No anomalies detected.');
    }
}

main();

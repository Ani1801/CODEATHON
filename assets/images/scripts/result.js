// Data simulation (You can replace this with actual data)
const totalPackages = 15;
const unshippedPackages = [
    { id: "PKG001", reason: "Exceeded capacity" },
    { id: "PKG003", reason: "Exceeded priority capacity" }
];
const totalContainers = 3;
const containerData = [
    { containerId: "C01", weight: 100, priority: 80 },
    { containerId: "C02", weight: 150, priority: 120 },
    { containerId: "C03", weight: 200, priority: 150 }
];

// Update the Summary Section
document.getElementById('total-packages').innerText = totalPackages;
document.getElementById('unshipped-packages').innerText = unshippedPackages.length;
document.getElementById('total-containers').innerText = totalContainers;

// Populate Unshipped Packages Table
const unshippedTable = document.getElementById('unshipped-table').getElementsByTagName('tbody')[0];
unshippedPackages.forEach(pkg => {
    const row = unshippedTable.insertRow();
    row.innerHTML = `<td>${pkg.id}</td><td>${pkg.reason}</td>`;
});

// Create Bar Chart for Container Utilization
const ctx = document.getElementById('chart-container').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: containerData.map(container => container.containerId),
        datasets: [
            {
                label: 'Weight (kg)',
                data: containerData.map(container => container.weight),
                backgroundColor: '#6C63FF',
                borderColor: '#574BFF',
                borderWidth: 1
            },
            {
                label: 'Priority (kg)',
                data: containerData.map(container => container.priority),
                backgroundColor: '#E0E0E0',
                borderColor: '#C5C5C5',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...containerData.map(container => container.weight)) + 50
            }
        }
    }
});

// Download CSV Functionality
document.getElementById('download-csv').addEventListener('click', function () {
    const csvData = "Package ID, Reason\n" + unshippedPackages.map(pkg => `${pkg.id}, ${pkg.reason}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unshipped_packages.csv';
    a.click();
    URL.revokeObjectURL(url);
});

// Download PDF Functionality (Using jsPDF)
document.getElementById('download-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Unshipped Packages', 20, 20);
    doc.autoTable({
        head: [['Package ID', 'Reason']],
        body: unshippedPackages.map(pkg => [pkg.id, pkg.reason]),
        startY: 30
    });

    doc.save('unshipped_packages.pdf');
});

document.getElementById('submit-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission

    const packageForm = document.getElementById('package-form');
    const containerForm = document.getElementById('container-form');
    
    // Create FormData objects for both package and container forms
    const packageData = new FormData(packageForm);
    const containerData = new FormData(containerForm);
    
    // Convert FormData objects to plain objects
    const packageObj = {};
    const containerObj = {};

    packageData.forEach((value, key) => {
        if (!packageObj[key]) {
            packageObj[key] = [];
        }
        packageObj[key].push(value);
    });

    containerData.forEach((value, key) => {
        if (!containerObj[key]) {
            containerObj[key] = [];
        }
        containerObj[key].push(value);
    });

    // Prepare payload to send to the backend
    const payload = {
        packageData: packageObj,
        containerData: containerObj
    };

    // Send data to the backend via POST request
    fetch('http://localhost:5000/api/submit-package', { // Replace with your backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Ensure data is sent as JSON
        },
        body: JSON.stringify(payload) // Convert payload to JSON
    })
    .then(response => response.json()) // Handle JSON response
    .then(data => {
        console.log('Success:', data); // Log success message from backend
        alert('Data submitted successfully!');
        window.location.href = './result.html';  // Redirect to result page
    })
    .catch((error) => {
        console.error('Error:', error); // Log any errors
        alert('Something went wrong!');
    });
});

// Function to add new rows for packages dynamically
document.getElementById('add-package').addEventListener('click', function () {
    const packageTable = document.getElementById('package-table');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><input type="text" name="package-id[]" placeholder="Package ID" required></td>
        <td><input type="number" name="weight[]" placeholder="Weight" required></td>
        <td>
            <select name="priority[]" required>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </td>
    `;
    packageTable.appendChild(newRow); // Append the new row to the table
});

// Function to add new container input fields dynamically
document.getElementById('add-container').addEventListener('click', function () {
    const containerForm = document.getElementById('container-form');
    
    const newContainerInput = document.createElement('div');
    newContainerInput.classList.add('input-group');
    newContainerInput.innerHTML = `
        <label for="container-id">Container ID</label>
        <input type="text" name="container-id[]" placeholder="Container ID" required>
        <label for="container-capacity">Container Capacity</label>
        <input type="number" name="container-capacity[]" placeholder="Container Capacity (kg)" required>
    `;
    containerForm.appendChild(newContainerInput); // Append the new input fields to the container form
});

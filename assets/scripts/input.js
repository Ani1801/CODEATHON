// Function to add new rows for packages
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
    packageTable.appendChild(newRow);
});

// Function to add new container input fields
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
    containerForm.querySelector('.scrollable-wrapper').appendChild(newContainerInput);
});

// Function to handle form submission
document.getElementById('submit-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission
    
    const packageForm = document.getElementById('package-form');
    const containerForm = document.getElementById('container-form');
    
    // Create FormData objects for both package and container forms
    const packageData = new FormData(packageForm);
    const containerData = new FormData(containerForm);
    
    // Convert FormData objects to plain objects for easy logging
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

    // Simulate form submission with console log
    console.log("Package Data:", packageObj);
    console.log("Container Data:", containerObj);
    
    alert('Data submitted successfully!');
});

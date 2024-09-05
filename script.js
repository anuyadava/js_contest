document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const messageDiv = document.getElementById('message');
    const employeesList = document.getElementById('employeesList');

    let employees = [];
    let idCounter = 1;

    function renderEmployees() {
        employeesList.innerHTML = '';
        employees.forEach(employee => {
            const employeeDiv = document.createElement('div');
            employeeDiv.className = 'employee-item';
            employeeDiv.innerHTML = `
                <div>${employee.name} - ${employee.profession} - ${employee.age}</div>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
            `;
            employeesList.appendChild(employeeDiv);
        });
    }

    function showMessage(type, text) {
        messageDiv.className = `visible ${type}`;
        messageDiv.textContent = text;
    }

    function hideMessage() {
        messageDiv.className = 'hidden';
    }

    addEmployeeBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const profession = document.getElementById('profession').value.trim();
        const age = document.getElementById('age').value.trim();

        if (!name || !profession || !age) {
            showMessage('error', 'All fields are required.');
            return;
        }

        const newEmployee = {
            id: idCounter++,
            name: name,
            profession: profession,
            age: parseInt(age, 10)
        };

        employees.push(newEmployee);
        renderEmployees();
        showMessage('success', 'Employee added successfully.');
        employeeForm.reset();
    });

    employeesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const employeeId = parseInt(event.target.getAttribute('data-id'), 10);
            employees = employees.filter(employee => employee.id !== employeeId);
            renderEmployees();
            showMessage('success', 'Employee deleted successfully.');
        }
    });
});

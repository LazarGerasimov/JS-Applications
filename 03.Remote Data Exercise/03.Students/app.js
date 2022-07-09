

async function solve() {

    const url = `http://localhost:3030/jsonstore/collections/students`;

    const table = document.querySelector('#results tbody');

    const submitBtn = document.getElementById('submit');

    const response = await fetch(url)

    const data = await response.json();

    let parsedData = Object.values(data).forEach(s => {
        //{firstName, lastName, facultyNumber, grade, id} = {s.firstName, s.lastName, } 
        let [firstName, lastName, facultyNumber, grade, id] = [s.firstName, s.lastName, s.facultyNumber, s.grade, s._id];
        grade = Number(grade);

        let tr = document.createElement('tr');
        tr.setAttribute('id', id);

        const firstNameCell = tr.insertCell(0);
        firstNameCell.textContent = firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.textContent = lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.textContent = facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.textContent = grade;

        table.appendChild(tr);
    })

    submitBtn.addEventListener('click', onSubmit);

    async function onSubmit(e) {
        e.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (isNaN(facultyNumberInput.value) || isNaN(gradeInput.value)) {
            return alert('Wrong input data');
        }

        if (firstNameInput.value == '' || lastNameInput.value == '' || facultyNumberInput.value == '' || gradeInput.value == '') {
            return alert('All fields must be filled!!!')
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: Number(facultyNumberInput.value),
                grade: Number(gradeInput.value)
            })
        });

        const tr = document.createElement('tr');
        table.appendChild(tr);

        const firstNameCell = tr.insertCell(0);
        firstNameCell.textContent = firstNameInput.value;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.textContent = lastNameInput.value;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.textContent = Number(facultyNumberInput.value);

        const gradeCell = tr.insertCell(3);
        gradeCell.textContent = Number(gradeInput.value);

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';

    }
    
}
solve()
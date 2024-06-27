const changePictureBtn = document.getElementById('change-picture-btn');
const editPictureBtn = document.getElementById('edit-picture-btn');
const fileInput = document.getElementById('file-input');
const profilePicture = document.getElementById('profile-picture');

changePictureBtn.addEventListener('click', function() {
    fileInput.click();
});

editPictureBtn.addEventListener('click', function() {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            profilePicture.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});


const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const patientList = document.getElementById('patient-list');

searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const patients = patientList.getElementsByTagName('tr');
    
    Array.from(patients).forEach(function(patient) {
        const patientName = patient.getElementsByTagName('td')[0].innerText.toLowerCase();
        if (patientName.includes(searchTerm)) {
            patient.style.display = 'table-row';
        } else {
            patient.style.display = 'none';
        }
    });
});


const addPatientBtn = document.getElementById('add-patient-btn');

addPatientBtn.addEventListener('click', function() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Nome do Paciente"></td>
        <td><input type="number" placeholder="Pontuação"></td>
        <td>
            <button class="save-btn">Salvar</button>
            <button class="delete-btn">Excluir</button>
        </td>
    `;
    patientList.appendChild(newRow);

    newRow.querySelector('.save-btn').addEventListener('click', function() {
        const inputs = newRow.querySelectorAll('input');
        newRow.innerHTML = `
            <td>${inputs[0].value}</td>
            <td>${inputs[1].value}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;
        addEditAndDeleteEvents(newRow);
    });

    newRow.querySelector('.delete-btn').addEventListener('click', function() {
        patientList.removeChild(newRow);
    });
});

function addEditAndDeleteEvents(row) {
    row.querySelector('.edit-btn').addEventListener('click', function() {
        const cells = row.querySelectorAll('td');
        const name = cells[0].innerText;
        const score = cells[1].innerText;

        row.innerHTML = `
            <td><input type="text" value="${name}"></td>
            <td><input type="number" value="${score}"></td>
            <td>
                <button class="save-btn">Salvar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;

        row.querySelector('.save-btn').addEventListener('click', function() {
            const inputs = row.querySelectorAll('input');
            row.innerHTML = `
                <td>${inputs[0].value}</td>
                <td>${inputs[1].value}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
            addEditAndDeleteEvents(row);
        });

        row.querySelector('.delete-btn').addEventListener('click', function() {
            patientList.removeChild(row);
        });
    });

    row.querySelector('.delete-btn').addEventListener('click', function() {
        patientList.removeChild(row);
    });
}


document.querySelectorAll('#patient-list tr').forEach(addEditAndDeleteEvents);


const addConsultationBtn = document.getElementById('add-consultation-btn');
const consultationList = document.getElementById('consultation-list');

addConsultationBtn.addEventListener('click', function() {
    const newConsultation = document.createElement('li');
    newConsultation.innerHTML = `
        <input type="time" placeholder="Horário" required>
        <button class="save-btn">Salvar</button>
        <button class="delete-btn">Excluir</button>
    `;
    consultationList.appendChild(newConsultation);

    newConsultation.querySelector('.save-btn').addEventListener('click', function() {
        const inputs = newConsultation.querySelectorAll('input');
        newConsultation.innerHTML = `
            <span>${inputs[0].value}</span>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        `;
        addEditAndDeleteConsultationEvents(newConsultation);
    });

    newConsultation.querySelector('.delete-btn').addEventListener('click', function() {
        consultationList.removeChild(newConsultation);
    });
});

function addEditAndDeleteConsultationEvents(item) {
    item.querySelector('.edit-btn').addEventListener('click', function() {
        const time = item.querySelector('span').innerText;
        item.innerHTML = `
            <input type="time" value="${time}" required>
            <button class="save-btn">Salvar</button>
            <button class="delete-btn">Excluir</button>
        `;

        item.querySelector('.save-btn').addEventListener('click', function() {
            const inputs = item.querySelectorAll('input');
            item.innerHTML = `
                <span>${inputs[0].value}</span>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            `;
            addEditAndDeleteConsultationEvents(item);
        });

        item.querySelector('.delete-btn').addEventListener('click', function() {
            consultationList.removeChild(item);
        });
    });

    item.querySelector('.delete-btn').addEventListener('click', function() {
        consultationList.removeChild(item);
    });
}

document.querySelectorAll('#consultation-list li').forEach(addEditAndDeleteConsultationEvents);

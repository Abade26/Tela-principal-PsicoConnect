const changePictureBtn = document.getElementById('change-picture-btn');
const fileInput = document.getElementById('file-input');
const profilePicture = document.getElementById('profile-picture');

changePictureBtn.addEventListener('click', function() {
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

// Botão Alterar Foto de Perfil
const editPictureBtn = document.getElementById('edit-picture-btn');
const psychologistProfilePicture = document.getElementById('psychologist-profile-picture');

editPictureBtn.addEventListener('click', function() {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            psychologistProfilePicture.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

// Barra de Pesquisa
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

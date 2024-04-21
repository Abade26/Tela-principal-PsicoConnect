$(document).ready(function() {
    $('#mobile_btn').click(function() {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-x');
    });
     
    const sections = $('section');
    

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();
    });
});

function changeActive(clickedItem) {

    const navItems = document.querySelectorAll('.nav_item')

    navItems.forEach((item) => {
        item.classList.remove('active')
    })

    clickedItem.classList.add('active')
    
}

// Função para abrir o popup
function openPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
}

// Função para fechar o popup
function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}
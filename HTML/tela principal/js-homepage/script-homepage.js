$(document).ready(function() {
    $('#mobile_btn').click(function() {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-x');
    });
     
    const sections = $('section');
    const navItms = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();
    });
});

const bgDark = document.getElementById('bg-dark')
const modal = document.getElementById('modal')

function changeActive(clickedItem) {

    const navItems = document.querySelectorAll('.nav_item')

    navItems.forEach((item) => {
        item.classList.remove('active')
    })

    clickedItem.classList.add('active')
    
}

let cards = document.querySelectorAll('.card')
for (let i = 0; i <= cards.length-1; i++){
    let button = document.querySelectorAll('.card .btn-default')[i]
    button.addEventListener('click', () =>{
        document.body.style.overflow = 'hidden';  // Desabilita o scroll

        modal.style.top = `${window.scrollY + window.innerHeight / 5}px`;
        
        bgDark.style.top = `${window.scrollY + window.innerHeight / 20000}px`;

        bgDark.style.visibility = 'visible'
        modal.style.visibility = 'visible'

        let img = document.querySelectorAll('.card .psycho-image')[i]
        let name = document.querySelectorAll('.card h3')[i]
        let description = document.querySelectorAll('.card .psycho-description')[i]
        let rate = document.querySelectorAll('.card .psycho-rate')[i]
        let price = document.querySelectorAll('.card .psycho-price h4')[i]

        modal.innerHTML = `
            <div class="psycho-brain">
                <i class="fa-solid fa-brain" ></i>
            </div>
        
            <img src="${img.src}" class="psycho-image" alt="berg">
            <h3 class="psycho-title">
                ${name.innerText}
            </h3>
            <span class="psycho-description">
                ${description.innerHTML}
            </span>

            <div class="psycho-rate">
                ${rate.innerHTML}
            </div>

            <div class="psycho-price">
                <h4>${price.innerText}</h4>
                <a href="http://127.0.0.1:5500/HTML/Chat/index.html" class = "chat-btn"><button class="btn-default" onclick="">
                    Chat
                </button></a>  
                 <button class="btn-default" onclick="modalOut()">
                    Cancelar
                </button>   
            </div>
        `
    })
}
/* */
bgDark.addEventListener('click', modalOut);

function modalOut(){
    modal.style.visibility = 'hidden'
    bgDark.style.visibility = 'hidden'
    document.body.style.overflow = 'auto';
    
}

function toggleEspecialidades() {
        var elemento = document.getElementById('especialidades_list');
        if (elemento.classList.contains('escondido')) {
          elemento.classList.remove('escondido');
        } else {
          elemento.classList.add('escondido');
        }
}
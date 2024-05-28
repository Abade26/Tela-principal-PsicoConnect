document.getElementById('botao').addEventListener('click', function() {
    var elemento = document.getElementById('conteudo');
    if (elemento.classList.contains('escondido')) {
      elemento.classList.remove('escondido');
    } else {
      elemento.classList.add('escondido');
    }
  });
  
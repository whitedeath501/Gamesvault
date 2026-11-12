// pega os favoritos e as notas que ficaram salvos no navegador
var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
var notas = JSON.parse(localStorage.getItem("notas")) || {};

// ---------- funções para salvar ----------
function salvar() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    localStorage.setItem("notas", JSON.stringify(notas));
}

// ---------- capa do jogo ----------
// se a imagem não carregar, aparece o emoji com a cor do jogo
function criarCapa(jogo) {
    var url = "https://cdn.akamai.steamstatic.com/steam/apps/" + jogo.steam + "/header.jpg";
    return '<div class="capa" style="background-color:' + jogo.cor + '">' +
        '<span>' + jogo.emoji + '</span>' +
        '<img src="' + url + '" alt="Capa de ' + jogo.nome + '" onerror="this.remove()">' +
        '</div>';
}

// ---------- cria o HTML de um card ----------
function criarCard(jogo) {
    var ehFavorito = favoritos.includes(jogo.id);
    var textoFav = ehFavorito ? "💔 Remover" : "❤️ Favoritar";

    return '<div class="card">' +
        criarCapa(jogo) +
        '<h4>' + jogo.nome + '</h4>' +
        '<p>' + jogo.genero + ' | ⭐ ' + jogo.nota + '</p>' +
        '<button onclick="abrirDetalhes(' + jogo.id + ')">Detalhes</button>' +
        '<button onclick="favoritar(' + jogo.id + ')">' + textoFav + '</button>' +
        '</div>';
}

function mostrarLista(idDiv, lista, mensagemVazia) {
    var html = "";
    for (var i = 0; i < lista.length; i++) {
        html += criarCard(lista[i]);
    }
    if (lista.length == 0) {
        html = "<p>" + mensagemVazia + "</p>";
    }
    document.getElementById(idDiv).innerHTML = html;
}

// ---------- início ----------
function mostrarInicio() {
    // destaque = jogo com a maior nota
    var melhor = jogos[0];
    for (var i = 1; i < jogos.length; i++) {
        if (jogos[i].nota > melhor.nota) {
            melhor = jogos[i];
        }
    }
    document.getElementById("destaque").innerHTML = criarCard(melhor);

    // lançamentos = 4 jogos mais novos
    var ordenados = jogos.slice().sort(function (a, b) {
        return b.ano - a.ano;
    });
    mostrarLista("lancamentos", ordenados.slice(0, 4), "");
}

// ---------- catálogo (pesquisa e filtro) ----------
function preencherGeneros() {
    var select = document.getElementById("genero");
    var generos = [];
    for (var i = 0; i < jogos.length; i++) {
        if (!generos.includes(jogos[i].genero)) {
            generos.push(jogos[i].genero);
        }
    }
    for (var j = 0; j < generos.length; j++) {
        select.innerHTML += '<option value="' + generos[j] + '">' + generos[j] + '</option>';
    }
}

function mostrarCatalogo() {
    var texto = document.getElementById("busca").value.toLowerCase();
    var genero = document.getElementById("genero").value;
    var resultado = [];

    for (var i = 0; i < jogos.length; i++) {
        var nomeCombina = jogos[i].nome.toLowerCase().includes(texto);
        var generoCombina = (genero == "todos" || jogos[i].genero == genero);
        if (nomeCombina && generoCombina) {
            resultado.push(jogos[i]);
        }
    }
    mostrarLista("lista-jogos", resultado, "Nenhum jogo encontrado.");
}

// ---------- favoritos ----------
function favoritar(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(function (f) {
            return f != id;
        });
    } else {
        favoritos.push(id);
    }
    salvar();
    atualizarTudo();
}

function mostrarFavoritos() {
    var lista = jogos.filter(function (j) {
        return favoritos.includes(j.id);
    });
    mostrarLista("lista-fav", lista, "Você ainda não favoritou nenhum jogo.");
}

// ---------- recomendações ----------
function mostrarRecomendados() {
    // gêneros dos jogos favoritos ou que receberam nota 4 ou 5
    var generosGostados = [];
    for (var i = 0; i < jogos.length; i++) {
        var gostou = favoritos.includes(jogos[i].id) || notas[jogos[i].id] >= 4;
        if (gostou && !generosGostados.includes(jogos[i].genero)) {
            generosGostados.push(jogos[i].genero);
        }
    }

    var lista = [];
    if (generosGostados.length == 0) {
        document.getElementById("texto-reco").innerText = "Favorite ou avalie jogos para ver recomendações melhores. Por enquanto, estes são os mais bem avaliados:";
        lista = jogos.slice().sort(function (a, b) {
            return b.nota - a.nota;
        }).slice(0, 4);
    } else {
        document.getElementById("texto-reco").innerText = "Porque você gosta de: " + generosGostados.join(", ");
        lista = jogos.filter(function (j) {
            return generosGostados.includes(j.genero) && !favoritos.includes(j.id);
        });
    }
    mostrarLista("lista-reco", lista, "Você já favoritou todos os jogos desses gêneros!");
}

// ---------- detalhes e avaliação ----------
function abrirDetalhes(id) {
    var jogo = jogos.find(function (j) {
        return j.id == id;
    });
    var minhaNota = notas[id] || "";

    var html = criarCapa(jogo) +
        '<h3>' + jogo.nome + '</h3>' +
        '<p>Gênero: ' + jogo.genero + '</p>' +
        '<p>Ano: ' + jogo.ano + '</p>' +
        '<p>Nota média: ⭐ ' + jogo.nota + '</p>' +
        '<p>' + jogo.descricao + '</p>' +
        '<p>Sua nota: <select id="minha-nota" onchange="avaliar(' + id + ')">' +
        '<option value="">Avaliar</option>';
    for (var n = 1; n <= 5; n++) {
        var marcado = (minhaNota == n) ? " selected" : "";
        html += '<option value="' + n + '"' + marcado + '>' + n + ' estrela(s)</option>';
    }
    html += '</select></p>';

    document.getElementById("conteudo-detalhes").innerHTML = html;
    document.getElementById("detalhes").classList.remove("escondido");
    document.getElementById("detalhes").scrollIntoView();
}

function avaliar(id) {
    var valor = document.getElementById("minha-nota").value;
    if (valor == "") {
        delete notas[id];
    } else {
        notas[id] = Number(valor);
    }
    salvar();
    mostrarRecomendados();
}

document.getElementById("fechar-detalhes").onclick = function () {
    document.getElementById("detalhes").classList.add("escondido");
};

// ---------- começa tudo ----------
function atualizarTudo() {
    mostrarInicio();
    mostrarCatalogo();
    mostrarRecomendados();
    mostrarFavoritos();
}

document.getElementById("busca").addEventListener("input", mostrarCatalogo);
document.getElementById("genero").addEventListener("change", mostrarCatalogo);

preencherGeneros();
atualizarTudo();

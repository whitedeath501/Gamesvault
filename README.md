

## HTML

HTML significa HyperText Markup Language (Linguagem de Marcação de Hipertexto). Ele não é uma linguagem de programação, e sim de marcação: serve para montar a estrutura das páginas da web. Isso é feito com tags, que ficam entre os sinais `<` e `>`. Uma tag normalmente tem abertura e fechamento, por exemplo `<p>texto</p>`.

Com o HTML a gente cria títulos (`<h1>` a `<h6>`), parágrafos (`<p>`), links (`<a>`), imagens (`<img>`), listas (`<ul>`, `<ol>`), tabelas (`<table>`) e formulários (`<form>`, `<input>`, `<button>`). Também existem as tags semânticas, como `<header>`, `<nav>`, `<section>` e `<footer>`, que organizam melhor o código e dizem o que cada parte da página representa.

Toda página HTML tem o `<head>`, com informações como título e links para arquivos de CSS e JS, e o `<body>`, com tudo que aparece na tela.

## CSS

CSS significa Cascading Style Sheets (Folhas de Estilo em Cascata). Ele é usado para estilizar o HTML, ou seja, deixar a página com a aparência que a gente quer: cores, fontes, tamanhos, espaçamentos, bordas e posição dos elementos.

O CSS funciona com seletores, que escolhem qual elemento vai receber o estilo (por tag, por classe com `.` ou por id com `#`), e com propriedades e valores, como `color: red;`. Ele pode ser escrito dentro da tag (inline), no `<style>` ou em um arquivo separado `.css`, que é o mais organizado.

Alguns conceitos importantes são o box model (`margin`, `border`, `padding`, `width` e `height`), o Flexbox e o Grid, que servem para alinhar e organizar os elementos na tela, e o `@media`, que permite o site se adaptar a diferentes tamanhos de tela. Isso é chamado de responsividade.

## JavaScript

JavaScript é uma linguagem de programação que deixa a página interativa. Enquanto o HTML cria a estrutura e o CSS faz o visual, o JS faz as coisas acontecerem, como reagir a cliques, validar formulários, mostrar e esconder elementos e alterar o conteúdo sem recarregar a página.

Ele tem variáveis (`var`, `let`, `const`), tipos de dados (`string`, `number`, `boolean`, `array` e objeto), condicionais (`if/else`), laços de repetição (`for`, `while`) e funções. Também trabalha com o DOM (Document Object Model), que é a representação da página que o JS consegue acessar e modificar, usando comandos como `document.getElementById()` e `innerHTML`. Para reagir às ações do usuário ele usa eventos, como `onclick` e `input`.

Outro recurso é o `localStorage`, que guarda dados no navegador mesmo depois de fechar a página.

## Bootstrap

Bootstrap é um framework front-end de CSS e JS. Um framework é um conjunto de código pronto que ajuda a desenvolver mais rápido. O Bootstrap já traz estilos e componentes prontos, como botões, cards, barras de navegação, formulários, alertas e modais, que são usados apenas colocando as classes nas tags HTML (por exemplo, `btn btn-primary`).

Ele também tem um sistema de grid com 12 colunas (`container`, `row`, `col-`), que facilita criar sites responsivos. Para usar, basta colocar o link do CDN no `<head>` da página.

A vantagem é ganhar tempo e manter um padrão visual. A desvantagem é que muitos sites feitos com Bootstrap acabam ficando parecidos.

## GitHub e GitHub Pages

O Git é um sistema que controla as versões do código, guardando o histórico das alterações. O GitHub é a plataforma onde os projetos ficam armazenados na internet, em repositórios. O GitHub Pages é um serviço gratuito do GitHub que hospeda sites estáticos (feitos só com HTML, CSS e JS), gerando um link público para o site acessar de qualquer lugar.

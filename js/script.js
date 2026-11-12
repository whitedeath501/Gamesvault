// GAMEVAULT — catálogo, busca, favoritos, recomendações e avaliações
const games = [
 {id:1,name:"The Witcher 3",genre:"RPG",year:2015,score:9.7,platform:"PC • PlayStation • Xbox",image:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85",description:"Explore um vasto mundo de fantasia como Geralt de Rívia, um caçador de monstros em busca de respostas e de pessoas importantes para seu destino."},
 {id:2,name:"Red Dead Redemption 2",genre:"Aventura",year:2018,score:9.8,platform:"PC • PlayStation • Xbox",image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85",description:"Viva uma jornada pelo Velho Oeste em um mundo aberto cheio de personagens, escolhas e histórias marcantes."},
 {id:3,name:"God of War",genre:"Ação",year:2018,score:9.5,platform:"PC • PlayStation",image:"https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=800&q=85",description:"Acompanhe Kratos e Atreus em uma jornada pela mitologia nórdica, combinando combate intenso e uma história emocionante."},
 {id:4,name:"Minecraft",genre:"Sobrevivência",year:2011,score:9.3,platform:"PC • Console • Mobile",image:"https://images.unsplash.com/photo-1607513746994-51f730a44832?auto=format&fit=crop&w=800&q=85",description:"Construa, explore e sobreviva em mundos gerados de forma procedural. A criatividade é o único limite."},
 {id:5,name:"Elden Ring",genre:"RPG",year:2022,score:9.6,platform:"PC • PlayStation • Xbox",image:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=85",description:"Descubra as Terras Intermédias em uma aventura desafiadora, repleta de segredos, criaturas e possibilidades."},
 {id:6,name:"Forza Horizon 5",genre:"Esporte",year:2021,score:9.1,platform:"PC • Xbox",image:"https://images.unsplash.com/photo-1503734132-3c2c2c2c2c2c?auto=format&fit=crop&w=800&q=85",description:"Dirija centenas de carros em paisagens inspiradas no México, participe de eventos e personalize sua experiência."},
 {id:7,name:"The Last of Us",genre:"Aventura",year:2013,score:9.6,platform:"PC • PlayStation",image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=85",description:"Uma história intensa sobre sobrevivência, confiança e humanidade em um mundo transformado por uma pandemia."},
 {id:8,name:"Stardew Valley",genre:"Estratégia",year:2016,score:9.4,platform:"PC • Console • Mobile",image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=85",description:"Cuide de uma fazenda, conheça os moradores do vale, explore cavernas e construa sua própria rotina."},
 {id:9,name:"Resident Evil 4",genre:"Ação",year:2023,score:9.2,platform:"PC • PlayStation • Xbox",image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85",description:"Enfrente perigos e mistérios em uma missão de resgate que mistura ação, exploração e suspense."},
 {id:10,name:"Civilization VI",genre:"Estratégia",year:2016,score:8.9,platform:"PC • Console • Mobile",image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=85",description:"Construa uma civilização ao longo da história, desenvolva cidades, pesquise tecnologias e faça alianças."},
 {id:11,name:"Subnautica",genre:"Sobrevivência",year:2018,score:9.0,platform:"PC • PlayStation • Xbox",image:"https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=800&q=85",description:"Explore um oceano alienígena, descubra ecossistemas e reúna recursos para sobreviver em um planeta desconhecido."},
 {id:12,name:"FIFA 23",genre:"Esporte",year:2022,score:8.4,platform:"PC • PlayStation • Xbox",image:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=85",description:"Monte seu time, dispute partidas e experimente diferentes modos de futebol."}
];

const $ = (selector) => document.querySelector(selector);
const readStore = (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
let favorites = readStore("gamevault-favorites");
let userRatings = JSON.parse(localStorage.getItem("gamevault-ratings") || "{}");
let toastTimer;

function saveData(){localStorage.setItem("gamevault-favorites",JSON.stringify(favorites));localStorage.setItem("gamevault-ratings",JSON.stringify(userRatings));}
function currentScore(game){return userRatings[game.id] || game.score;}
function cardTemplate(game){
 const favorite=favorites.includes(game.id);
 return `<article class="game-card">
  <div class="game-image"><img src="${game.image}" alt="Imagem ilustrativa de ${game.name}" loading="lazy" onerror="this.src='https://placehold.co/600x400/171d2b/aaa?text=GameVault'">
   <span class="game-tag">${game.genre.toUpperCase()}</span>
   <button class="favorite-button ${favorite?'is-favorite':''}" data-favorite="${game.id}" aria-label="${favorite?'Remover':'Adicionar'} ${game.name} ${favorite?'dos':'aos'} favoritos">${favorite?'♥':'♡'}</button>
  </div>
  <div class="game-info"><div class="game-title-row"><strong class="game-title">${game.name}</strong><span class="rating">★ ${currentScore(game).toFixed(1)}</span></div>
   <p class="game-meta">${game.year} &nbsp;•&nbsp; ${game.genre}</p>
   <div class="card-bottom"><span>${game.platform.split(" • ")[0]}</span><button class="details-button" data-details="${game.id}">Ver detalhes ↗</button></div>
  </div>
 </article>`;
}
function renderGames(){
 const term=$("#searchInput").value.trim().toLowerCase(),genre=$("#genreFilter").value,sort=$("#sortFilter").value;
 let filtered=games.filter(g=>(g.name.toLowerCase().includes(term)||g.genre.toLowerCase().includes(term))&&(genre==="Todos"||g.genre===genre));
 if(sort==="rating")filtered.sort((a,b)=>currentScore(b)-currentScore(a));
 if(sort==="az")filtered.sort((a,b)=>a.name.localeCompare(b.name));
 $("#gameGrid").innerHTML=filtered.map(cardTemplate).join("");
 $("#resultCount").textContent=`${filtered.length} ${filtered.length===1?"jogo encontrado":"jogos encontrados"}`;
 $("#emptyState").classList.toggle("hidden",filtered.length!==0);
 renderFavorites();updateCounts();
}
function renderFavorites(){
 const list=games.filter(g=>favorites.includes(g.id));
 $("#favoriteGrid").innerHTML=list.map(cardTemplate).join("");
 $("#favoriteEmpty").classList.toggle("hidden",list.length!==0);
 $("#libraryCount").textContent=`${list.length} ${list.length===1?"favorito":"favoritos"}`;
}
function updateCounts(){$("#favoriteCount").textContent=favorites.length;$("#gameTotal").textContent=games.length;}
function showToast(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);}
function toggleFavorite(id){
 if(favorites.includes(id)){favorites=favorites.filter(x=>x!==id);showToast("Jogo removido da sua biblioteca.");}
 else{favorites.push(id);showToast("Jogo adicionado à sua biblioteca!");}
 saveData();renderGames();
}
function openDetails(id){
 const game=games.find(g=>g.id===id);if(!game)return;
 const rating=userRatings[id]||0;
 $("#dialogContent").innerHTML=`<img class="dialog-image" src="${game.image}" alt="Imagem ilustrativa de ${game.name}">
 <div class="dialog-body"><p class="eyebrow">${game.genre.toUpperCase()} • ${game.year}</p><h2>${game.name}</h2><div class="dialog-rating"><span class="rating">★ ${currentScore(game).toFixed(1)} / 10</span><span class="game-meta">${game.platform}</span></div>
 <p>${game.description}</p><div class="dialog-rating"><strong>Sua avaliação:</strong><div class="rating-input" aria-label="Avaliar de 1 a 5 estrelas">${[1,2,3,4,5].map(n=>`<button class="${n<=rating?'selected':''}" data-rate="${n}" aria-label="${n} estrelas">★</button>`).join("")}</div></div>
 <button class="button button-primary" data-favorite="${game.id}">${favorites.includes(game.id)?"♥ Remover dos favoritos":"♡ Adicionar aos favoritos"}</button></div>`;
 $("#gameDialog").showModal();
}
function recommend(){
 const pool=games.filter(g=>!favorites.includes(g.id));
 const game=(pool.length?pool:games)[Math.floor(Math.random()*(pool.length?pool.length:games.length))];
 $("#recommendResult").innerHTML=`<div class="recommend-icon">✦</div><span>SUA RECOMENDAÇÃO</span><strong>${game.name}</strong><small>${game.genre} • ${game.year} • ★ ${currentScore(game).toFixed(1)}</small><button class="details-button" style="margin-top:13px" data-details="${game.id}">Conhecer jogo ↗</button>`;
}
$("#gameGrid").addEventListener("click",handleGridClick);
$("#favoriteGrid").addEventListener("click",handleGridClick);
function handleGridClick(event){
 const favorite=event.target.closest("[data-favorite]"),details=event.target.closest("[data-details]");
 if(favorite)toggleFavorite(Number(favorite.dataset.favorite));
 if(details)openDetails(Number(details.dataset.details));
}
$("#dialogContent").addEventListener("click",event=>{
 const favorite=event.target.closest("[data-favorite]"),rate=event.target.closest("[data-rate]");
 if(favorite){toggleFavorite(Number(favorite.dataset.favorite));openDetails(Number(favorite.dataset.favorite));}
 if(rate){const id=Number($("#dialogContent").querySelector("[data-favorite]")?.dataset.favorite);userRatings[id]=Number(rate.dataset.rate);saveData();openDetails(id);renderGames();showToast("Sua avaliação foi salva!");}
});
$("#searchInput").addEventListener("input",renderGames);
$("#genreFilter").addEventListener("change",renderGames);
$("#sortFilter").addEventListener("change",renderGames);
$("#surpriseButton").addEventListener("click",recommend);
$("#dialogClose").addEventListener("click",()=>$("#gameDialog").close());
$("#gameDialog").addEventListener("click",event=>{if(event.target===$("#gameDialog"))$("#gameDialog").close();});
$("#menuToggle").addEventListener("click",()=>{
 const open=$("#mainNav").classList.toggle("open");
 $("#menuToggle").setAttribute("aria-expanded",String(open));
 $("#menuToggle").setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
});
document.querySelectorAll(".main-nav a").forEach(link=>link.addEventListener("click",()=>$("#mainNav").classList.remove("open")));
$("#year").textContent=new Date().getFullYear();
renderGames();

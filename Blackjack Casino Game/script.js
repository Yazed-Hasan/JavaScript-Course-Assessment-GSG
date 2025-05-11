const suits = ['♥', '♦', '♣', '♠'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck, player, dealer, playing;

function newDeck() {
  let deckOfCards = [];
  for (let suit of suits) {
    for (let value of values) {
      deckOfCards.push({suit: suit, value: value});
    }
  }
  return deckOfCards.sort(() => Math.random() - 0.5);
}

function cardValue(card) {
  if (card.value === 'A') {
    return 11;
  } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
    return 10;
  } else {
    return parseInt(card.value);
  }
}

function handScore(hand) {
  let score = 0;
  let aceCount = 0;
  for (let card of hand) {
    score += cardValue(card);
    if (card.value === 'A') {
      aceCount++;
    }
  }
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }
  return score;
}

function show() {
  let playerCardsHTML = '';
  for (const card of player) {
    playerCardsHTML += cardHTML(card);
  }
  document.getElementById('player-cards').innerHTML = playerCardsHTML;
  document.getElementById('player-score').textContent = handScore(player);

  const dealerCardsElement = document.getElementById('dealer-cards');
  const dealerScoreElement = document.getElementById('dealer-score');
  let dealerCardsHTML = '';

  if (playing) {
    if (dealer.length > 0) {
        dealerCardsHTML = cardHTML(dealer[0]) + '<div class="card">?</div>';
    } else {
        dealerCardsHTML = '<div class="card">?</div><div class="card">?</div>';
    }
    dealerCardsElement.innerHTML = dealerCardsHTML;
    dealerScoreElement.textContent = '?';
  } else {
    for (const card of dealer) {
      dealerCardsHTML += cardHTML(card);
    }
    dealerCardsElement.innerHTML = dealerCardsHTML;
    dealerScoreElement.textContent = handScore(dealer);
  }
}

function cardHTML(card) {
  let color;
  if (card.suit === '♥' || card.suit === '♦') {
    color = 'red';
  } else {
    color = 'black';
  }
  return `<div class="card ${color}"><span>${card.value}</span><span>${card.suit}</span></div>`;
}

function message(msg) {
  document.getElementById('message').textContent = msg;
}

function start() {
  deck = newDeck();
  player = [deck.pop(), deck.pop()];
  dealer = [deck.pop(), deck.pop()];
  playing = true;
  show();
  message('Your turn!');
  document.getElementById('hit-button').disabled = false;
  document.getElementById('stand-button').disabled = false;
}

function hit() {
  if (!playing) return;
  player.push(deck.pop());
  show();
  if (handScore(player) > 21) {
    playing = false;
    message('You busted!');
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    show();
  }
}

function stand() {
  if (!playing) return;
  playing = false;
  while (handScore(dealer) < 17) dealer.push(deck.pop());
  show();
  let ps = handScore(player), ds = handScore(dealer);
  if (ds > 21) message('Dealer busted! You win!');
  else if (ps > ds) message('You win!');
  else if (ds > ps) message('Dealer wins!');
  else message('Push!');
  document.getElementById('hit-button').disabled = true;
  document.getElementById('stand-button').disabled = true;
}

document.getElementById('hit-button').onclick = hit;
document.getElementById('stand-button').onclick = stand;
document.getElementById('new-game-button').onclick = start;

start();

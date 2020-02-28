console.log('BISMILLAH');

//game requirement
let suits = ['Hearts','Diamonds','Clubs','Spades'],
    values = ['Ace','King','Queen','Jack',
              'Ten','Nine','Eight','Seven',
              'Six','Five','Four','Three','Two'
             ];

//html Elements
let strt = document.getElementById('newGame'),
    hit = document.getElementById('hit'),
    stand = document.getElementById('stand'),
    dealer_cards = document.querySelector('.dealer-cards'),
    player_cards = document.querySelector('.player-cards'),
    dealerMsg = document.querySelector('.dealer-score'),
    playerMsg = document.querySelector('.player-score');

    let dealerPlay = true,  //when game is start its very important to kwow
    deck = [],
    playerCards = [],  
    dealerCards = [],
    dealerScore = 0 , playerScore = 0;   

hit.style.display = "none";
stand.style.display = "none";
showCards();

strt.addEventListener('click',function () {
    // dealerPlay = true;
    document.querySelector('#inner-area').style.display = 'block';
    deck = createCards();      //generate cards
    randomCards(deck);             //change createCards to random
    dealerCards = [getNextCard(),getNextCard()];
    playerCards = [getNextCard(),getNextCard()];   //we show initialy two cards to start the game
    strt.style.display = "none";
    hit.style.display = "inline";
    stand.style.display = "inline";
    dealer_cards.innerHTML = ""; 
    player_cards.innerHTML = ""; 
    player_cards.style.display = 'block';
    dealer_cards.style.display = 'block';
    dealerPlay = false;
    showCards();                //print cards
});

hit.addEventListener('click',function(){
    dealer_cards.innerHTML = ""; 
    player_cards.innerHTML = ""; 
    playerCards.push(getNextCard());
    dealerPlay = false;
    showCards();
});

stand.addEventListener('click',function(){
    dealer_cards.classList.remove('cover');
    while(dealerScore < 17 ){
        dealerCards.push(getNextCard());
        dealer_cards.innerHTML=""; 
        player_cards.innerHTML=""; 
        dealerPlay = true;
        showCards();
    }
});

function createCards(){
    let deck = [];
    for(let suitIdx = 0 ; suitIdx < suits.length ; suitIdx++){
        for(let val = 0 ; val < values.length ; val++){
            let card = {
                suit: suits[suitIdx],
                value: values[val]
            };
            deck.push( card );
        }
    }
    return deck;
}

function getDealersCard(card){
    if(dealerPlay){
    dealer_cards.innerHTML += '<img calss="cards-pic" src = "./Cards-pics/'+card.value + ' of ' + card.suit+'.png" />';
    }
    else{
        dealer_cards.innerHTML = '<img calss="cards-pic cover" src = "./Cards-pics/Back cover.png" />';
        dealer_cards.innerHTML += '<img calss="cards-pic" src = "./Cards-pics/'+card.value + ' of ' + card.suit+'.png" />';
    }
}

function getPlayersCard(card){
    player_cards.innerHTML += '<img calss="cards-pic" src = "./Cards-pics/'+card.value + ' of ' + card.suit+'.png" />';
}

function randomCards(deck){               //get deck array and change indexes by generating random values
    for(let i = 0; i < deck.length ; i++){
        let randCrd = Math.trunc(Math.random() * deck.length);
        let temp = deck[randCrd];
        deck[randCrd] = deck[i];
        deck[i] = temp;
    }
}

function getNextCard(){
    return deck.shift(); //Removes the first element from an array and returns it.No Duplicate of card
}

function showCards(){
    dealerScore = 0 , playerScore = 0;
    for(let i = 0 ; i < dealerCards.length ; i++){
        getDealersCard(dealerCards[i]);
        if(dealerPlay) dealerScore += getScore(dealerCards[i]);
        else dealerScore = getScore(dealerCards[i]);
    }
    for(let i = 0 ; i < playerCards.length ; i++){
        getPlayersCard(playerCards[i]);
        playerScore += getScore(playerCards[i]);
    }
    dealerMsg.innerText = 'Dealer : (Score : '+ dealerScore + ')';
    playerMsg.innerText = 'Player : (Score : '+ playerScore + ')';
    checkForWin();
}

function checkForWin(){
    if(dealerScore >= 17 && dealerScore < 22 ){
        dealerMsg.innerText = 'Dealer\'s Wins! (Score : '+dealerScore+")";
        player_cards.style.display = 'none';
        dispNewGame();
    }
    else if(playerScore == 21 || dealerScore > 21){
        playerMsg.innerText = 'Player\'s Wins! (Score : '+playerScore+")";
        dealer_cards.style.display = 'none';
        dispNewGame();
    }
    else if(dealerScore < 21 && playerScore > 21){
        dealerMsg.innerText = "Dealer\'s Wins! (Score:"+ dealerScore + ")";
        playerMsg.innerText = 'You Bust! \n(Score : ' + playerScore + ")";
        dealer_cards.style.display = 'none';
        dispNewGame();
    }
}

function dispNewGame(){
    strt.style.display = "inline";
    hit.style.display = "none";
    stand.style.display = "none";
}

function getScore(card){
    switch(card.value){
        case 'Ace':
            return 1;
        case 'King' || 'Queen' || 'Jack' || 'Ten':
            return 10;
        case 'Nine':
            return 9;
        case 'Eight':
            return 8;
        case 'Seven':
            return 7;
        case 'Six':
            return 6;
        case 'Five':
            return 5;
        case 'Four':
            return 4;
        case 'Three':
            return 3;
        case 'Two':
            return 2;
        default:
            return 10;
    }
}
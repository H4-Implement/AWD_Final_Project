let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'ITEM 1',
        image: '1.PNG',
        price: 200
    },
    {
        id: 2,
        name: 'ITEM 2',
        image: '2.PNG',
        price: 300
    },
    {
        id: 3,
        name: 'ITEM 3',
        image: '3.PNG',
        price: 300
    },
    {
        id: 4,
        name: 'ITEM 4',
        image: '4.PNG',
        price: 600
    },
    {
        id: 5,
        name: 'ITEM 5',
        image: '5.PNG',
        price: 260
    },
    {
        id: 6,
        name: 'ITEM 6',
        image: '6.PNG',
        price: 210
    },
    {
        id: 7,
        name: 'ITEM 7',
        image: '7.PNG',
        price: 360
    },
    {
        id: 8,
        name: 'ITEM 8',
        image: '8.PNG',
        price: 350
    },
    {
        id: 9,
        name: 'ITEM 9',
        image: '9.PNG',
        price: 100
    },
    {
        id: 10,
        name: 'ITEM 10',
        image: '10.PNG',
        price: 150
    }
    
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            
            <div class="price">₱${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})"><</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">></button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
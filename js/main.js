const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = url => {
    fetch(url)
        .then(result => result.json())
        .then(result => console.log(JSON.stringify(result)))
        .catch(error => console.log('Error'))
}

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }    

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        let buttons = block.querySelectorAll(".buy-btn");
        for(let btn of buttons) {
            btn.addEventListener('click', evt => cart.addProduct(evt.target.parentNode.dataset.id))
        }
    }

    getSumm() {
        let summ = 0;
        for(let product of this.allProducts) {
            summ += product.price;
        }
        return summ;
    }

    getProductById(productId) {
        // console.log(list);
        for(let product of list.allProducts) {
            if(product.id == productId) return product;
        }
    }
}

class ProductItem {
    constructor(product, img="http://placeimg.com/200/150/tech") {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class CartItem {
    constructor(productId) {
        let item = list.getProductById(productId);
        this.id_product = item.id;
        this.product_name = item.title;
        this.price = item.price;
        this.quantity = 1;
    };
    
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                ${this.product_name} ${this.price} RUB - ${this.quantity} pcs.
                <a href="#" class="cart-item-remove">X</a>
                </div>`
    }
}

class Cart {
    constructor() {
        this.amount = 0;
        this.countGoods = 0;
        this.contents = [];
        document.querySelector('.btn-cart').addEventListener('click', evt => {
            document.querySelector('.cart-container').classList.toggle('visually-hidden');
        });
    }

    getItemById(productId) {
        for(let item in cart.contents) {
            if(cart.contents[item].id_product == productId) return item;
        }
        return -1;
    }

    addProduct(productId) {
        this.countGoods++;
        this.counterOnButton(this.countGoods);
        let cartItemIndex = this.getItemById(productId);
        let cartItem;
        
        if( cartItemIndex == -1) {
            cartItem = new CartItem(productId);
            this.contents.push(cartItem);
        } else {
            cartItem = this.contents[cartItemIndex];
            cartItem.quantity++;
        }
        this.amount += cartItem.price; 
        this.render();
    }

    removeProduct(productId) {
        console.log(productId);
        let indexToRemove = this.getItemById(productId);
        if( indexToRemove == -1) return;
        let itemToRemove = this.contents[indexToRemove];
        if(itemToRemove.quantity == 1) {
            this.contents.splice(indexToRemove, 1);
        } else {
            itemToRemove.quantity--;  
        }
        this.counterOnButton(--this.countGoods);
        this.render();
    }

    counterOnButton(quantity) {
        let btn = document.getElementById('btn-cart');
        btn.textContent = quantity ? `(${quantity})` : '';
    }

    render() {
        let block = document.querySelector('.cart');
        block.innerHTML = '';
        for(let item of cart.contents) {
            block.insertAdjacentHTML('beforeend', item.render());
        }
        let delBtns = document.querySelectorAll('.cart-item-remove');
        for(let btn of delBtns) {
            btn.addEventListener('click', evt => cart.removeProduct(evt.target.parentNode.dataset.id));
        }
    }
}

let list = new ProductsList();
getRequest(`${API}/catalogData.json`);
let cart = new Cart();

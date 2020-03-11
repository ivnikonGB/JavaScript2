const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
    }

    getSumm() {
        let summ = 0;
        for(let product of this.allProducts) {
            summ += product.price;
        }
        return summ;
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

let list = new ProductsList();
list.render();
console.log(list.getSumm());

class Cart {
    constructor() {};
    addProduct(productId) {};
    clearCart() {};
    checkoutCart() {};
    getSumm() {};
    render() {};
}

class CartItem {
    constructor() {};
    removeFromCart(productId) {};
    render() {};
}
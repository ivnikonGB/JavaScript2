class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts()
    }

    _fetchProducts() {
        this.goods = [
                {id: 1, title: 'Notebook', price: 2000},
                {id: 2, title: 'Mouse', price: 20},
                {id: 3, title: 'Keyboard', price: 200},
                {id: 4, title: 'Gamepad', price: 50},
            ];
    }

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class ProductItem {
    constructor(product, img="http://placeimg.com/200/150/tech") {
        this.id = product.id;
        this.title = product.title;
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





// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
//     {id: 5, title: 'Test'}
// ];

// const renderProduct = (title="Нет данных", price="н/д") => {
//     return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <img src="http://placeimg.com/200/150/tech">
//                 <p>${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item.title, item.price)).join("");
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList;
// };

// renderPage(products);
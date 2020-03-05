class Hamburger {
    constructor(size, type) {
        this.type = type;
        this.size = size;
        this.recalc();
    }
    price = 0;
    calories = 0;
    toppings = [];
    addTopping(topping) {
        switch(topping) {
            case 'приправа':
                this.price += 15;
                this.toppings.push(topping);
                break;
            case 'майонез':
                this.price += 20;
                this.calories += 5;
                this.toppings.push(topping);
                break;
        }
    }
    recalc() {
        this.price = 0;
        this.calories = 0;
        if(this.size == 'большой') {
            this.price += 100;
            this.calories += 40;
        } else if(this.size == 'маленький') {
            this.price += 50;
            this.calories += 20;
        }
        switch(this.type) {
            case 'с сыром':
                this.price += 10;
                this.calories += 20;
                break;
            case 'с салатом':
                this.price += 20;
                this.calories += 5;
                break;
            case 'с картофелем':
                this.price += 15;
                this.calories += 10;
                break;
        }
        for(let topping of this.toppings) {
            switch(topping) {
                case 'приправа':
                    this.price += 15;
                    break;
                case 'майонез':
                    this.price += 20;
                    this.calories += 5;
                    break;
            }
        }
    }
}


import {settings, select, classNames, templates} from '/js/settings.js';
import utils from '/js/utils.js';
import CartProduct from '/js/components/CartProduct.js';

class Cart{
  constructor(element){
    const thisCart = this;

    thisCart.products = [];
    console.log(' thisCart.products', thisCart.products);

    thisCart.getElements(element);
    thisCart.initActions();
  }

  getElements(element){
    const thisCart = this;

    thisCart.dom = {};

    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = element.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = element.querySelector(select.cart.deliveryFee);
    thisCart.dom.subTotalPrice = element.querySelector(select.cart.subTotalPrice);
    thisCart.dom.totalPrice = element.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = element.querySelector(select.cart.totalNumber);
    thisCart.dom.form = element.querySelector(select.cart.form);
    thisCart.dom.address = element.querySelector(select.cart.address);
    thisCart.dom.phone = element.querySelector(select.cart.phone);
  }
  initActions(){
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function(){
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(){
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    });

  }
  add(menuProduct){
    //debugger;
    const thisCart = this;

    /* generate HTML based on template */
    const generatedHTML = templates.cartProduct(menuProduct);
    /* create element using utils.createElementFromHTML */
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    /* find menu comtainer */
    const cartContainer = thisCart.dom.productList;
    /* add element to menu */
    cartContainer.appendChild(generatedDOM);

    console.log('adding product', menuProduct);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    console.log('thisCart.products', thisCart.products);

    thisCart.update();
  }
  update(){
    const thisCart = this;
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.totalNumber = 0;
    thisCart.subTotalPrice = 0;
    for (let product of thisCart.products){
      thisCart.totalNumber = parseInt(thisCart.totalNumber) + parseInt(product.amount);
      thisCart.subTotalPrice = parseInt(thisCart.subTotalPrice) + parseInt(product.price);
    }
    thisCart.totalPrice = thisCart.subTotalPrice + thisCart.deliveryFee;
    console.log('totalNumber', thisCart.totalNumber);
    console.log('subtotalPrice', thisCart.subTotalPrice);
    console.log('thisCart totalPrice', thisCart.totalPrice);
    thisCart.dom.subTotalPrice.innerHTML = thisCart.subTotalPrice;
    thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
    if (thisCart.subTotalPrice > 0){
      thisCart.dom.deliveryFee.innerHTML = thisCart.deliveryFee;
      for(let totalPrice of thisCart.dom.totalPrice){
        totalPrice.innerHTML = thisCart.totalPrice;
      }
    }else {
      thisCart.dom.deliveryFee.innerHTML = 0;
      for(let totalPrice of thisCart.dom.totalPrice){
        totalPrice.innerHTML = 0;
      }
    }


  }
  remove(cartProduct){
    const thisCart = this;
    const elementIndex = thisCart.products.indexOf(CartProduct);
    thisCart.products.splice(elementIndex, 1);
    cartProduct.dom.wrapper.remove();
    thisCart.update();
  }
  sendOrder(){
    const thisCart = this;

    const url = settings.db.url + '/' + settings.db.order;
    const payload = {};
    payload.address = thisCart.dom.address.value;
    payload.phone = thisCart.dom.phone.value;
    payload.totalPrice = thisCart.totalPrice;
    payload.subTotalPrice = thisCart.subTotalPrice;
    payload.totalNumber = thisCart.totalNumber;
    payload.deliveryFee = thisCart.deliveryFee;
    payload.products = [];
    for(let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }
    console.log('payload', payload);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options);
  }
}
export default Cart;

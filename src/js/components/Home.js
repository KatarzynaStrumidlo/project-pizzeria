import {templates, select} from '../settings.js';
import {app} from '../app.js';

class Home{
  constructor(element){
    const thisHome = this;
    thisHome.render(element);
    thisHome.initCarousel();
    thisHome.initAction();
    thisHome.navigate();
  }

  render(element){
    const thisHome = this;

    const generatedHTML = templates.home();

    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    thisHome.dom.orderOnline = document.querySelector(select.home.orderOnline);
    thisHome.dom.bookTable = document.querySelector(select.home.bookTable);
    thisHome.dom.order = document.querySelector(select.home.orderOnline);
    thisHome.dom.booking = document.querySelector(select.home.bookTable);
  }
  initCarousel(){
    const elem = document.querySelector('.main-carousel');
    new Flickity(elem, { // eslint-disable-line
    // options
      cellAlign: 'left',
      contain: true,
      autoPlay: true,
    });
  }

  initAction(){
    const thisHome = this;
    thisHome.dom.orderOnline.addEventListener('click', function(){
      console.log('clicked orderOnline');
    });

    thisHome.dom.bookTable.addEventListener('click', function(){
      console.log('clicked bookTable');
    });

  }

  navigate() {
    const thisHome = this;
    thisHome.dom.booking.addEventListener('click', function() {
      app.activatePage('booking');
      window.location.hash = '#/booking';
    });
    thisHome.dom.order.addEventListener('click', function() {
      app.activatePage('order');
      window.location.hash = '#/order';
    });
  }
}
export default Home;

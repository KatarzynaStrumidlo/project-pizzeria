import {templates, select} from '/js/settings.js';
import AmountWidget from '/js/components/AmountWidget.js';
import DatePicker from '/js/components/DatePicker.js';
import HourPicker from '/js/components/HourPicker.js';

class Booking{
  constructor(element){
    const thisBooking = this;
    thisBooking.render(element);
    thisBooking.initWidgets();

  }
  render(element){
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = document.querySelector(select.datePicker.wrapper);
    console.log(thisBooking.dom.datePicker);
    thisBooking.dom.hourPicker = document.querySelector(select.hourPicker.wrapper);

  }
  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.dom.peopleAmount.addEventListener('click', function () {

    });

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.dom.hoursAmount.addEventListener('click', function () {

    });

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    // console.log('datePicker', thisBooking.datePicker);
    thisBooking.dom.datePicker.addEventListener('click', function() {

    });

    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    // console.log('hourPicker', thisBooking.hourPicker);
    thisBooking.dom.hourPicker.addEventListener('click', function() {

    });
  }

}

export default Booking;

import React, { useState, useEffect } from 'react';
import '../css/CheckOut.css';
import { FcSimCardChip } from 'react-icons/fc';
import { BsPatchQuestion } from 'react-icons/bs';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { commerce } from '../../lib/commerce';

// Toast Notification
const noInput = () => {
  toast.warn('Please input your Credit Card Info', {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const invalidName = () => {
  toast.warn('Please check your input name', {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const invalidCardNumber = () => {
  toast.warn('Invalid Card Numbers ', {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const invalidCVC = () => {
  toast.warn('Invalid CVC', {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const CheckOut = ({ cart }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { uid } = user;
  const db = getDatabase();

  const history = useHistory();

  const [sumPrice, setsumPrice] = useState(null);
  const [cartId, setCartId] = useState(null);
  console.log(cart.id);
  if (cart.id) {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setsumPrice(token.live.subtotal.formatted_with_symbol);
        setCartId(token.cart_id.slice(5));
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }

  const goNext = () => {
    history.push('/address');
  };

  const input_credit_card = function (input) {
    const format_and_pos = function (char, backspace) {
      let start = 0;
      let end = 0;
      let pos = 0;
      const separator = ' ';
      let { value } = input;

      if (char !== false) {
        start = input.selectionStart;
        end = input.selectionEnd;

        if (backspace && start > 0) {
          // handle backspace onkeydown
          start -= 1;

          if (value[start] === separator) {
            start -= 1;
          }
        }
        // To be able to replace the selection if there is one
        value = value.substring(0, start) + char + value.substring(end);

        pos = start + char.length; // caret position
      }

      let d = 0; // digit count
      let gi = 0; // group index
      let newV = '';
      const groups = /^\D*3[47]/.test(value) // check for American Express
        ? [4, 6, 5]
        : [4, 4, 4, 4];

      for (let i = 0; i < value.length; i += 1) {
        if (/\D/.test(value[i])) {
          if (start > i) {
            pos -= 1;
          }
        } else {
          if (d === groups[gi]) {
            newV += separator;
            d = 0;
            gi += 1;

            if (start >= i) {
              pos += 1;
            }
          }
          newV += value[i];
          d += 1;
        }
        if (d === groups[gi] && groups.length === gi + 1) {
          // max length
          break;
        }
      }
      value = newV;

      if (char !== false) {
        input.setSelectionRange(pos, pos);
      }
    };

    input.addEventListener('keypress', (e) => {
      const code = e.charCode || e.keyCode || e.which;

      // Check for tab and arrow keys (needed in Firefox)
      if (
        code !== 9 && (code < 37 || code > 40) && !(e.ctrlKey && (code === 99 || code === 118))
      ) {
        e.preventDefault();

        const char = String.fromCharCode(code);

        // if the character is non-digit
        // OR
        // if the value already contains 15/16 digits and there is no selection
        // -> return false (the character is not inserted)

        if (
          /\D/.test(char) || (input.selectionStart === input.selectionEnd && input.value.replace(/\D/g, '').length >= (/^\D*3[47]/.test(input.value) ? 15 : 16))
        ) {
          // 15 digits if Amex
          return;
        }
        format_and_pos(char);
      }
    });

    // backspace doesn't fire the keypress event
    input.addEventListener('keydown', (e) => {
      if (e.keyCode === 8 || e.keyCode === 46) {
        // backspace or delete
        e.preventDefault();
        format_and_pos('', input.selectionStart === input.selectionEnd);
      }
    });

    input.addEventListener('paste', () => {
      // A timeout is needed to get the new value pasted
      setTimeout(() => {
        format_and_pos('');
      }, 50);
    });

    input.addEventListener('blur', () => {
      // reformat onblur just in case (optional)
      format_and_pos(this, false);
    });
    // eslint-disable-next-line no-extend-native
    String.prototype.replaceAt = function (index, replacement) {
      if (index >= input.length) {
        return input.valueOf();
      }

      const chars = input.split('');
      chars[index] = replacement;
      return chars.join('');
    };

    input.addEventListener('keyup', () => {
      const card_number = document.querySelector('#card-number');
      let number = `${input.value}`;
      if (input.value === '') {
        card_number.innerHTML = 'Card Number';
      } else
      if (number.length > 7) {
        for (let i = 7; i <= input.value.length - 1; i += 1) {
          if (input.value.charAt(i) !== ' ') {
            if (i < 15) number = number.replaceAt(i, '•');
            else number = number.replaceAt(i, input.value.charAt(i));
          }
        }
        card_number.innerHTML = number;
      } else {
        card_number.innerHTML = input.value;
      }
    });

    const card_name = document.querySelector('#card-name');
    card_name.addEventListener('keyup', () => {
      const name_holder = document.querySelector('.name-holder');
      if (card_name.value === '') {
        name_holder.innerHTML = 'Card Holder Name';
      } else name_holder.innerHTML = card_name.value;
    });

    document.querySelector('#exp-month').addEventListener('keyup', function () {
      document.querySelector('.exp-month').innerHTML = this.value;
    });

    document.querySelector('#exp-year').addEventListener('keyup', function () {
      document.querySelector('.exp-year').innerHTML = this.value;
    });
  };

  const handleSubmit = () => {
    const creditCard = document.querySelector('#credit-card').value;
    const cardHolder = document.querySelector('#card-name').value;
    const expMonth = document.querySelector('#exp-month').value;
    const expYear = document.querySelector('#exp-year').value;

    const hashedCard = CryptoJS.AES.encrypt(
      JSON.stringify(creditCard),
      'sha256'
    ).toString();
    set(ref(db, 'creditCardInfo/' + uid), {
      creditCard: hashedCard,
      cardHolder: cardHolder,
      expMonth: expMonth,
      expYear: expYear,
    });
    goNext();
  };

  useEffect(() => {
    const card_bg = document.querySelector('.card-virtual');
    const credit_card = document.querySelector('#credit-card');
    const month = document.querySelector('.month');
    const year = document.querySelector('.year');
    const exp_month = document.querySelector('.exp-month');
    const exp_year = document.querySelector('.exp-year');
    card_bg.style.backgroundImage =
      'url(https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
      Math.floor(Math.random() * 25 + 1) +
      '.jpeg';
    input_credit_card(credit_card);

    get(child(ref(db), `creditCardInfo/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const bytes = CryptoJS.AES.decrypt(
            snapshot.val().creditCard,
            'sha256'
          );
          const decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

          document.querySelector('#credit-card').value = decrypt;
          document.querySelector('#card-name').value =
            snapshot.val().cardHolder;
          document.querySelector('#exp-month').value = snapshot.val().expMonth;
          document.querySelector('#exp-year').value = snapshot.val().expYear;

          document.querySelector('#card-number').innerHTML =
            document.querySelector('#credit-card').value;
          document.querySelector('.name-holder').innerHTML =
            document.querySelector('#card-name').value;
          exp_month.innerHTML = month.value;
          exp_year.innerHTML = year.value;
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });

    var Minutes = 60 * 3,
      display = document.querySelector('#time');

    startTimer(Minutes, display);

    function startTimer(duration, display) {
      var timer = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds;
        if (--timer < 0) {
          timer = duration;
          window.location.href = '/cart';
        }
      }, 1000);
    }

    month.addEventListener('change', () => {
      month.classList.add('selected');
      console.log(month.value);
      exp_month.innerHTML = month.value;
    });

    year.addEventListener('change', () => {
      year.classList.add('selected');
      exp_year.innerHTML = year.value;
      month.classList.remove('selected');
      if (year.value + '' != num_year + '') {
        setMonth(1, year.value);
      } else setMonth(num_month, year.value);
    });

    var num_month = new Date().getMonth() + 1;
    var num_year = new Date().getFullYear();
    year.innerHTML = '<option value="" disabled selected>YY</option>';

    function setMonth(num_month, year) {
      month.innerHTML = '<option value="" disabled selected>MM</option>';
      exp_month.innerHTML = 'MM';
      for (var i = 1; i <= 12; i++) {
        var monthstr;
        var format_m = '0';
        if (i < 10) {
          if (i < num_month && year + '' == num_year + '') {
            monthstr =
              "<option value='" +
              '0' +
              i +
              "' disabled>" +
              '0' +
              i +
              '</option>';
          } else {
            monthstr =
              "<option value='" + '0' + i + "'>" + '0' + i + '</option>';
          }
        } else {
          if (i < num_month) {
            monthstr = "<option value='" + i + "' disabled>" + i + '</option>';
          } else monthstr = "<option value='" + i + "'>" + i + '</option>';
        }
        month.innerHTML = month.innerHTML + monthstr;
      }
    }

    setMonth(1, num_year);

    for (var i = num_year; i <= num_year + 10; i++) {
      year.innerHTML =
        year.innerHTML + "<option value='" + i + "'>" + i + '</option>';
    }

    const pay = document.querySelector('.pay');
    const popup = document.querySelector('.popup');
    const keep_btn = document.querySelector('.keep-btn');
    const close_btn = document.querySelector('.close-btn');

    pay.addEventListener('click', () => {
      var input = document.querySelectorAll('form input, select');
      var check = true;
      for (var i = 0; i < input.length; i++) {
        if (input[i].value == '') check = false;
      }

      const regex_creditCard =
        /^(5[1-5][0-9]{2}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})$/;
      const regex_cvc = /^[0-9]{3}$/;
      const regex_cardHolder = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
      const creditCard = document.querySelector('#credit-card').value;
      const cardHolder = document.querySelector('#card-name').value;
      const cvc = document.querySelector('#cvc').value;
      const expMonth = document.querySelector('#exp-month').value;
      const expYear = document.querySelector('#exp-year').value;
      if (
        creditCard == '' ||
        cardHolder == '' ||
        expMonth == '' ||
        expYear == '' ||
        cvc == ''
      ) {
        noInput();
        check = false;
      } else if (regex_creditCard.test(creditCard) != true) {
        invalidCardNumber();
        check = false;
      } else if (regex_cvc.test(cvc) != true) {
        invalidCVC();
        check = false;
      } else if (regex_cardHolder.test(cardHolder) != true) {
        invalidName();
        check = false;
      }

      if (check) popup.classList.add('active');
    });
    close_btn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }, []);

  return (
    <div className='main'>
      <div className='navBar'></div>
      <section className='popup'>
        <span className='overlay'></span>
        <div className='model-box'>
          <BsPatchQuestion />
          <h2>Question</h2>
          <h3>
            Do you want to store your credit card for the next payment again?
          </h3>
          <div className='buttons'>
            <button className='keep-btn' onClick={handleSubmit}>
              Keep
            </button>
            <button className='close-btn' onClick={goNext}>
              No!
            </button>
          </div>
        </div>
      </section>
      <div className='container'>
        <div className='outer'>
          <header className='head-item'>
            <div className='logo'>
              <Link to='#'>
                <strong>.zZ</strong>-Commerce
              </Link>
            </div>
            <div className='time-left'>
              <time id='time'> 03:00 </time>
              <span>time left!</span>
            </div>
          </header>
          <section className='payment'>
            <div className='left'>
              <div className='field'>
                <div className='card-number'>
                  <p>Card Number</p>
                  <span>Enter the 16-digit card number on the card</span>
                  <div className='card-number-box form'>
                    <input
                      type='text'
                      id='credit-card'
                      autoComplete='off'
                      placeholder='xxxx - xxxx - xxxx - xxxx'
                    />
                    <span className='cc-logo'></span>
                  </div>
                </div>
                <div className='card-holder'>
                  <div className='text'>
                    <p>Card Name Holder</p>
                    <span>Enter name card holder on the card</span>
                  </div>
                  <div className='input'>
                    <input
                      type='text'
                      id='card-name'
                      placeholder='Ex. John Wick '
                      autoComplete='off'
                      required
                    />
                  </div>
                </div>
                <div className='card-cvc'>
                  <div className='text'>
                    <p>CVC Number</p>
                    <span>Enter the 3 digits number on the card</span>
                  </div>
                  <div className='input'>
                    <input
                      type='password'
                      id='cvc'
                      placeholder='Ex. 232'
                      maxLength={3}
                      required
                    />{' '}
                    {/* use onInput*/}
                  </div>
                </div>
                <div className='card-expiration'>
                  <div className='text'>
                    <p>Expiry Date</p>
                    <span>Enter the expiration date of the card</span>
                  </div>
                  <div className='input_exp'>
                    <select
                      className='select month'
                      id='exp-month'
                      required
                    ></select>
                    <strong> / </strong>
                    <select className='select year' id='exp-year'></select>
                  </div>
                </div>
                <button className='pay'>Pay Now</button>
                <ToastContainer />
              </div>
            </div>
            <div className='right'>
              <div className='card-virtual'>
                <p className='cc-logo'></p>
                <p className='name-holder'>Card Holder Name</p>
                <p className='chip'>
                  <FcSimCardChip />
                </p>
                <p className='highlight'>
                  <span className='last-digit' id='card-number'>
                    Card Number
                  </span>
                  <span className='expiry'>
                    <span className='exp-month'>MM</span>
                    <strong> / </strong>
                    <span className='exp-year'> YY </span>
                  </span>
                </p>
                <div className='card-cover'>
                  <img src='' alt='' />
                </div>
              </div>
              <div className='receipt'>
                <ul>
                  <li>
                    <span>Order Code</span>
                    <span className='orderNum'>{cartId}</span>
                  </li>
                  <li>
                    <span>Product</span>
                    <Link to='/cart' className='products'>
                      Go back to cart
                    </Link>
                  </li>
                  <li>
                    <span>Vat (7%)</span>
                    <span className='vat'>
                      {(parseFloat((sumPrice + '').slice(1)) * 30 * 7) / 100}
                    </span>
                  </li>
                </ul>
                <div className='total'>
                  <p className='price'>
                    <strong id='price'>
                      {parseFloat((sumPrice + '').slice(1)) * 30 +
                        (parseFloat((sumPrice + '').slice(1)) * 30 * 7) /
                          100}{' '}
                    </strong>
                    THB
                  </p>
                  <p>Total you have to pay</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

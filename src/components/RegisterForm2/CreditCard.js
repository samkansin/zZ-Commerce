import React, {useEffect} from 'react';
import '../css/CreditForm.css'

const CreditForm = () => {
    var input_credit_card = function(input){
        var format_and_pos = function(char, backspace)
        {
            var start = 0;
            var end = 0;
            var pos = 0;
            var separator = " ";
            var value = input.value;

            if (char !== false)
            {
                start = input.selectionStart;
                end = input.selectionEnd;

                if (backspace && start > 0) // handle backspace onkeydown
                {
                    start--;

                    if (value[start] == separator)
                    { start--; }
                }
                // To be able to replace the selection if there is one
                value = value.substring(0, start) + char + value.substring(end);

                pos = start + char.length; // caret position
            }

            var d = 0; // digit count
            var dd = 0; // total
            var gi = 0; // group index
            var newV = "";
            var groups = /^\D*3[47]/.test(value) ? // check for American Express
            [4, 6, 5] : [4, 4, 4, 4];

            for (var i = 0; i < value.length; i++)
            {
                if (/\D/.test(value[i]))
                {
                    if (start > i)
                    { pos--; }
                }
                else
                {
                    if (d === groups[gi])
                    {
                        newV += separator;
                        d = 0;
                        gi++;

                        if (start >= i)
                        { pos++; }
                    }
                    newV += value[i];
                    d++;
                    dd++;
                }
                if (d === groups[gi] && groups.length === gi + 1) // max length
                { break; }
            }
            input.value = newV;

            if (char !== false)
            { input.setSelectionRange(pos, pos); }
        };

        input.addEventListener('keypress', function(e)
        {
            var code = e.charCode || e.keyCode || e.which;

            // Check for tab and arrow keys (needed in Firefox)
            if (code !== 9 && (code < 37 || code > 40) &&
            // and CTRL+C / CTRL+V
            !(e.ctrlKey && (code === 99 || code === 118)))
            {
                e.preventDefault();

                var char = String.fromCharCode(code);

                // if the character is non-digit
                // OR
                // if the value already contains 15/16 digits and there is no selection
                // -> return false (the character is not inserted)

                if (/\D/.test(char) || (this.selectionStart === this.selectionEnd &&
                this.value.replace(/\D/g, '').length >=
                (/^\D*3[47]/.test(this.value) ? 15 : 16))) // 15 digits if Amex
                {
                    return false;
                }
                format_and_pos(char);
            }
        });
        
        // backspace doesn't fire the keypress event
        input.addEventListener('keydown', function(e)
        {
            if (e.keyCode === 8 || e.keyCode === 46) // backspace or delete
            {
                e.preventDefault();
                format_and_pos('', this.selectionStart === this.selectionEnd);
            }
        });
        
        input.addEventListener('paste', function()
        {
            // A timeout is needed to get the new value pasted
            setTimeout(function(){ format_and_pos(''); }, 50);
        });
        
        input.addEventListener('blur', function()
        {
            // reformat onblur just in case (optional)
            format_and_pos(this, false);
        });

        String.prototype.replaceAt = function(index, replacement){
            if(index >= this.length){
                return this.valueOf();
            }

            var chars = this.split('');
            chars[index] = replacement;
            return chars.join('');
        }

        input.addEventListener('keyup', function(){
            let card_number = document.querySelector('.card-item__numberItem');
            var number = this.value+"";
            if (input.value == ''){
                card_number.innerHTML = 'Card Number';
            }else {
                if(number.length > 7){
                for(var i = 7; i <= this.value.length-1; i++){
                    if(this.value.charAt(i) != ' '){
                        if(i < 15)
                            number = number.replaceAt(i,'•')
                        else number = number.replaceAt(i, this.value.charAt(i));
                    }
                }
                card_number.innerHTML = number;
            }else{
                card_number.innerHTML = this.value;
                }
            }

        });



    };

    useEffect(()=>{
        const cardCVC = document.querySelector('#cardCVC');
        const CVC = document.querySelector('.CVC')
        const cardNumber = document.querySelector('#cardNumber');
        const cardName = document.querySelector('#cardName')
        const cardMonth = document.querySelector('#cardMonth');
        const cardYear = document.querySelector('#cardYear')
        const cardFocus = document.querySelector('.card-item__focus');
        const Month = document.querySelector('#card_Month');
        const Year = document.querySelector('#card_Year');

        input_credit_card(cardNumber);

        cardCVC.addEventListener('focus', (e)=>{
            document.querySelector('.card-item').classList.add('active');

        })
        cardCVC.addEventListener('focusout', ()=>{
            document.querySelector('.card-item').classList.remove('active');
        })

        cardNumber.addEventListener('focus', (e)=> {
            cardFocus.classList.add('active');
            let link = document.querySelector('[for='+e.target.dataset.ref+"]");
            cardFocus.style.width = link.offsetWidth+"px";
            cardFocus.style.height = link.offsetHeight+"px"
            cardFocus.style.transform = "translateX("+link.offsetLeft+"px) " + "translateY("+link.offsetTop+"px)";
        });

        cardNumber.addEventListener('focusout', ()=>{
            cardFocus.classList.remove('active');
            cardFocus.removeAttribute('style');
        });

        cardName.addEventListener('focus', (e)=> {
            cardFocus.classList.add('active');
            let link = document.querySelector('[for='+e.target.dataset.ref+"]");
            cardFocus.style.width = link.offsetWidth+"px";
            cardFocus.style.height = link.offsetHeight+"px"
            cardFocus.style.transform = "translateX("+link.offsetLeft+"px) " + "translateY("+link.offsetTop+"px)";
        });

        cardName.addEventListener('focusout', ()=>{
            cardFocus.classList.remove('active');
            cardFocus.removeAttribute('style');
        });

        cardMonth.addEventListener('focus', (e)=> {
            cardFocus.classList.add('active');
            let link = document.querySelector('[for='+e.target.dataset.ref+"]");
            cardFocus.style.width = link.offsetWidth+"px";
            cardFocus.style.height = link.offsetHeight+"px"
            cardFocus.style.transform = "translateX("+link.offsetLeft+"px) " + "translateY("+link.offsetTop+"px)";
        });

        cardMonth.addEventListener('focusout', ()=>{
            cardFocus.classList.remove('active');
            cardFocus.removeAttribute('style');
        });

        cardYear.addEventListener('focus', (e)=> {
            cardFocus.classList.add('active');
            let link = document.querySelector('[for='+e.target.dataset.ref+"]");
            cardFocus.style.width = link.offsetWidth+"px";
            cardFocus.style.height = link.offsetHeight+"px"
            cardFocus.style.transform = "translateX("+link.offsetLeft+"px) " + "translateY("+link.offsetTop+"px)";
        });

        cardYear.addEventListener('focusout', ()=>{
            cardFocus.classList.remove('active');
            cardFocus.removeAttribute('style');
        });


        cardMonth.addEventListener('change', () => {
            cardMonth.classList.add('selected');
            console.log(cardMonth.value);
            Month.innerHTML = cardMonth.value;
        });

        cardCVC.addEventListener('keyup', () => {
            var cv = cardCVC.value+"";
            for(var i = 0; i < cardCVC.value.length; i++){
                cv = cv.replaceAt(i,'•');
            }
            CVC.innerHTML = cv;
        })

        var num_month = new Date().getMonth() + 1;
        var num_year = new Date().getFullYear();
        cardYear.innerHTML = '<option value="" disabled selected>YY</option>';

        function setMonth(num_month, year){
            cardMonth.innerHTML = '<option value="" disabled selected>MM</option>';
            Month.innerHTML = 'MM';
            for(var i = 1; i <= 12; i++){
                var monthstr;
                var format_m = "0";
                if(i < 10){
                    if(i < num_month && year+""==num_year+""){
                        monthstr = "<option value='"+'0'+i+"' disabled>"+"0"+i+"</option>";
                    }else {
                        monthstr = "<option value='"+'0'+i+"'>"+"0"+i+"</option>";
                    }
                }else {
                    if(i < num_month){
                        monthstr = "<option value='"+i+"' disabled>"+i+"</option>";
                    }else monthstr = "<option value='"+i+"'>"+i+"</option>";
                }
                cardMonth.innerHTML= cardMonth.innerHTML + monthstr;
            }
        }

        setMonth(1, num_year);

        for(var i = num_year; i <= num_year+10; i++){
            cardYear.innerHTML = cardYear.innerHTML + "<option value='"+i+"'>"+i+"</option>";
        }

        cardYear.addEventListener('change', () => {
            cardYear.classList.add('selected');
            Year.innerHTML = cardYear.value%100;
            cardMonth.classList.remove('selected');
            console.log(Year.value);
            if(cardYear.value+"" != num_year+""){
                setMonth(1,cardYear.value);
            }else setMonth(num_month, cardYear.value);
        });

        const card_name = document.querySelector('#cardName');
        card_name.addEventListener('keyup', function(){
            let name_holder = document.querySelector('.card-item__nameItem');
            if(card_name.value == ''){
                name_holder.innerHTML = 'Full name';
            }else  name_holder.innerHTML = this.value;
        });
    
    },[])

    return (
    <div className="wrapper" id="app">
            <div className="card-form">
                <div className="card-list">
                    <div className="card-item"> {/* Flipped card*/}
                    <div className="card-item__side front">
                        <div className="card-item__focus"></div>
                        <div className="card-item__cover">
                            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/24.jpeg" alt="" className="card-item__bg"/>
                        </div>

                        <div className="card-item__wrapper">
                            <div className="card-item__top">
                                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="" className="card-item__chip"/>
                                <div className="card-item__type">
                                    <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png" alt="" className="card-item__typeImg" />
                                </div>
                            </div>
                            <label htmlFor="cardNumber" className="card-item__number">
                                <p className="card-item__numberItem">Card Number</p>
                            </label>
                            <div className="card-item__content">
                                <label htmlFor="cardName" className="card-item__info">
                                    <div className="card-item__holder">Card Holder</div>
                                    <div className="card-item__name">
                                        <span className="card-item__nameItem">Full Name</span>
                                    </div>
                                
                                </label>
                                <div className="card-item__date" htmlFor="cardDate">
                                    <label htmlFor="cardMonth" className="card-item__dateTitle">Expires</label>
                                    <label htmlFor="cardYear" className="card-item__dateItem">
                                        <span id="card_Month">MM</span>
                                    </label>
                                    /
                                    <label htmlFor="cardYear" className="card-item__dateItem">
                                        <span id="card_Year">YY</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-item__side back">
                        <div className="card-item__cover">
                            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/24.jpeg" alt="" className="card-item__bg"/>
                        </div>
                        <div className="card-item__band"></div>
                        <div className="card-item__CVC">
                            <div className="card-item__CVCTitle">CVC</div>
                            <div className="card-item__CVCBand">
                                <span className="CVC"></span> {/* Follow num of CVC */}
                            </div>
                            <div className="card-item__type">
                                <img src="" alt="" className="card-item__typeImg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-form__inner">
                <div className="card-input form">
                    <div className="tool">Credit card number 16 digit, must start with 51, 52, 53, 54 or 55</div>
                    <label htmlFor="cardNumber" className="card-input__label">Card Number</label>
                    <input type="text" placeholder='xxxx-xxxx-xxxx-xxxx' className="card-input__input" id='cardNumber'name="cardNumber" data-ref="cardNumber" required/>
                </div>
                <div className="card-input form">
                    <div className="tool">Must be English-Alphabet and not more than 20 character</div>
                    <label htmlFor="cardName" className="card-input__label">Card Holder</label>
                    <input type="text" id='cardName' placeholder="Ex. John Wick" className="card-input__input" name="cardName" data-ref="cardName" required/>
                </div>
                <div className="card-form__row">
                    <div className="card-form__col form"><div className="tool">Must not expired</div>
                        <div className="card-form__group">
                            <label htmlFor="cardMonth" className="card-input__label">Expiration Date</label>
                            <select name="cardMonth" id="cardMonth" className="card-input__input select" data-ref="cardDate" required>
                                <option value="" disabled selected>Month</option>
                                {/*use function to append option*/}
                            </select>
                            <select name="cardYear" id="cardYear" className="card-input__input select" data-ref="cardDate" required>
                                <option value="" disabled selected>Year</option>
                                {/*use function to append option*/}
                            </select>
                        </div>
                    </div>
                    <div className="card-form__col CVC">
                        <div className="card-input form">
                            <div className="tool">3 digit number at the back of your card</div>
                            <label htmlFor="cardCVC" className="card-input__label">CVC</label>
                            <input type="password" maxLength={3} className="card-input__input" placeholder="Ex. 123" id="cardCVC" name='cardCVC' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreditForm;
$(document).ready(function () {

    // Sätter upp lite globala variabler
    let display = $('.display');
    let calculator = $('.calc-container');
    let clearBtn = $('[data-btn=clear]');

    //Här tar vi reda på om miniräknaren är på eller av och stylear lite hejvilt
    $('.on-btn').on('click', function () {


        if (display.hasClass('background')) {

            display.removeClass('background');
            $('.on-btn').animate({ left: '10%' }, 500);
            $('.battery').css('background-color', 'rgb(75, 73, 65)');

            clear();

            clearBtn.text('AC');
            display.text(0);

        } else {

            display.addClass('background');
            $('.on-btn').animate({ left: '23%' }, 500);
            $('.error').text('');
            $('.error-arrow').text('');
            $('.battery').css('background-color', 'red');
        }
    });


    //Här är funktioner för miniräknarens knappar
    $('.calc-btn').on('click', function () {

        //Allt ligger inbakat i en check om miniräknaren är på
        if (display.hasClass('background')) {

            let btn = $(this).data('btn');
            let displayedNum = display.text();
            const previousKeyType = calculator[0].dataset.previousKeyType;

            if (btn !== 'clear') {

                clearBtn.text('CE');

            }

            //Om vi klickar på siffror
            if (btn >= 0 && btn <= 9) {

                if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {

                    display.text(btn);

                } else {

                    display.text(displayedNum + btn);

                }

                calculator[0].dataset.previousKeyType = 'number';

                $(this).each(function () {
                    $(' .operator ').removeClass('is-depressed');
                })

                //Om vi klickar på komma
            } else if (btn === '.' && (displayedNum.includes('.') == false)) {

                display.text(displayedNum + '.')

                //För att göra det möjligt att trycka på en operator och få ett decimal-värde från 0
                if (previousKeyType === 'operator') {
                    display.text('0.')
                }

                calculator[0].dataset.previousKeyType = 'decimal';

                //Om vi klickar på likamed
            } else if (btn === '=') {

                let firstValue = calculator[0].dataset.firstValue;
                const operator = calculator[0].dataset.operator;
                let secondValue = displayedNum;

                //Funktion för att kunna vidarkalkulera med knappen '=', med rätt värden
                if (firstValue) {

                    //Om du klickar på '=' två gånger i rad, blir firstValue totalen och secondValue ett -
                    //nysparatvärde just för den här funktionen, som sedan skickas in i calculate funktionen
                    if (previousKeyType === 'calculate') {
                        firstValue = displayedNum;
                        secondValue = calculator[0].dataset.modValue;
                    }

                    display.text(calculate(firstValue, operator, secondValue));
                }

                calculator[0].dataset.modValue = secondValue
                calculator[0].dataset.previousKeyType = 'calculate';

                //Om vi klickar på clear
            } else if (btn === 'clear') {

                if (clearBtn.text().includes('AC')) {

                    clear();

                } else {

                    clearBtn.text('AC');
                }

                display.text(0);
                calculator[0].dataset.previousKeyType = 'clear';

                //Om vi klickar på några av våras operators
            } else {

                const firstValue = calculator[0].dataset.firstValue;
                const operator = calculator[0].dataset.operator;
                const secondValue = displayedNum;

                //Här är en funktion för att möjliggöra kalkuleringar om en operator t.ex. '+' används utan ett '='
                //Lika case  här som med '=' att firstvalue sätts som total för att kunna fortsätta uträkningen
                // previousKeyType !== calculate är satt här eftersom den funktionen redan finns i else if('=')-statementet
                if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {

                    const calcValue = calculate(firstValue, operator, secondValue);

                    display.text(calcValue);

                    calculator[0].dataset.firstValue = calcValue;


                } else {

                    calculator[0].dataset.firstValue = displayedNum;
                }

                $(this).addClass('is-depressed');

                calculator[0].dataset.previousKeyType = 'operator';
                calculator[0].dataset.operator = $(this).data('btn');

            }
            //Om miniräknaren är OFF
        } else {
            $('.error').text('TURN ON!!');
            $('.error-arrow').text('<-');
        }
    });

    //Funktion för utträkningar
    function calculate(n1, operator, n2) {

        switch (operator) {

            case '+':
                total = +n1 + +n2;

                break;

            case '-':
                total = +n1 - +n2;

                break;

            case '*':
                total = +n1 * +n2;

                break;

            case '/':
                total = +n1 / +n2;

                break;

        }
        return total;
    };

    //Funktion för att rensa all data när man klickar på clear
    function clear() {

        calculator[0].dataset.firstValue = '';
        calculator[0].dataset.modValue = '';
        calculator[0].dataset.operator = '';
        calculator[0].dataset.previousKeyType = '';
    };



});
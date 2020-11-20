$(document).ready(function () {


    let display = $('.display');
    let calculator = $('.calc-container');
    let clearBtn = $('[data-btn=clear]');
    

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



    $('.calc-btn').on('click', function () {


        if (display.hasClass('background')) {

            let btn = $(this).data('btn');
            let displayedNum = display.text();
            const previousKeyType = calculator[0].dataset.previousKeyType;

            if (btn !== 'clear') {

                clearBtn.text('CE');

            }

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

            } else if (btn === '.' && (displayedNum.includes('.') == false)) {

                display.text(displayedNum + '.')

                if (previousKeyType === 'operator') {
                    display.text('0.')
                }

                calculator[0].dataset.previousKeyType = 'decimal';

            } else if (btn === '=') {

                let firstValue = calculator[0].dataset.firstValue;
                const operator = calculator[0].dataset.operator;
                let secondValue = displayedNum;


                if (firstValue) {

                    if (previousKeyType === 'calculate') {
                        firstValue = displayedNum;
                        secondValue = calculator[0].dataset.modValue;
                    }

                    display.text(calculate(firstValue, operator, secondValue));
                }

                calculator[0].dataset.modValue = secondValue
                calculator[0].dataset.previousKeyType = 'calculate';


            } else if (btn === 'clear') {

                if (clearBtn.text().includes('AC')) {

                    clear();

                } else {

                    clearBtn.text('AC');
                }

                display.text(0);
                calculator[0].dataset.previousKeyType = 'clear';

            } else {

                const firstValue = calculator[0].dataset.firstValue;
                const operator = calculator[0].dataset.operator;
                const secondValue = displayedNum;

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

        } else {
            $('.error').text('TURN ON!!');
            $('.error-arrow').text('<-');
        }
    });

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

    function clear() {

        calculator[0].dataset.firstValue = '';
        calculator[0].dataset.modValue = '';
        calculator[0].dataset.operator = '';
        calculator[0].dataset.previousKeyType = '';
    };



});
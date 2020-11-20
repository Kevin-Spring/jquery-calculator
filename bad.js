$( document ).ready( function () {

    //Store the calc values
    let num1 = '';
    let num2 = '';
    let operator = '';
    let total = '';

     //Select the buttons
     $( '.calc-btn' ).on( 'click', function () {

        let btn = $( this ).data( 'btn' );

        if ( btn >= 0 && btn <= 9 ) {

            handleNumber( btn );
        } else { 

            handleOperator( btn );

        }

    } )

    //Function for numbers
    function handleNumber( num ) {

        if ( num1 === '' ) {

            num1 = num;
        } else {

            num2 = num;
        }

        display(num);
    }

    //Function for operators
    function handleOperator ( oper ) {

        if ( operator === '' ) {

            operator = oper;
        } else {

            handleTotal();
            operator = oper;
        }
        
    }

    //Total
    function handleTotal () {

        switch( operator ) {

            case '+':
                total = num1 + num2;
                display( total );
            break;

            case '-':
                total = num1 - num2;
                display( total );
            break;

            case '*':
                total = num1 * num2;
                display( total );
            break;

            case '/':
                total = num1 / num2;
                display( total );
            break;

           case '.':
                total = num1 + '.' + num2;
                display( total );
            break;

            case '=':
                display( total );
            break;

            case 'clear':
                clear();
                
            break;
        }

        updateVariables();
        console.log(total);
    }

    //Diplay the numbers
    function display ( btn ) {

        $( '.calc-input' ).val( btn );

    }

    //Update variables to make further calculation available
    function updateVariables() {    
        num1 = total;    
        num2 = ''; 
    }

    function clear() {
        num1 = 0;
        num2 = 0;
        total = 0;
    }
    

})
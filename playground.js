/* TUTORIAL
https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
*/

$( document ).ready( function () {

    let display = $( '.display' );
   
    let calculator = $( '.calc-container' );


    $( '.on-btn' ).on( 'click', function () {

        if ( display.hasClass( 'background' ) ){
    
            display.removeClass( 'background' );
            $( '.on-btn' ).animate({ left: '10%' }, 500);
            $( '.battery' ).css( 'background-color', 'rgb(75, 73, 65)' );
            clear();
            
        } else {
        
            display.addClass( 'background' );
            $( '.on-btn' ).animate( { left: '25%' }, 500 );
            $( '.error' ).text('');
            $( '.error-arrow' ).text('');
            $( '.battery' ).css( 'background-color' , 'red' );
        }
    });

    //Funktion för kalkylatorn
    $( '.calc-btn' ).on( 'click', function () {

            if ( display.hasClass( 'background' ) ){

            let btn = $( this ).data( 'btn' );
            let displayedNum = display.text();
            const previousKeyType = calculator[0].dataset.previousKeyType;
    
            //kollar om vi klickar på en siffra
            if ( btn >= 0 && btn <= 9 ) {
    
                //om displayen är "tom" eller att en operator var förra valet
                if( displayedNum === '0' || previousKeyType === 'operator' )  {
                    
                    //Ersätt displayen med den nya siffran
                    display.text(btn);
    
                //om det finns info i displayen
                } else {
                    
                    //Om det fanns information i displayen som varken var 0 eller att en operator var vald,
                     //fortsätt att lägga in nya siffror i displayen
                    display.text( displayedNum + btn );
                    
                } 
    
                //Var tvungen att lägga in den här för att kunna göra secondValue mer än ett ensiffrigt tal
                calculator[0].dataset.previousKeyType = 'number';
    
                //Ta bort 'is-depressed' klassen från operator
                $( this ).each( function () {
                    $( ' .operator ' ).removeClass( 'is-depressed' );
                })
    
            //För att kunna ha med komma MEN bara ett :D
            } else if ( btn === '.' && (displayedNum.includes( '.' ) == false) ) {
    
                display.text( displayedNum + '.' )     
    
            
            } else if ( btn === '=' ) {
                
                //Sätter värdet från vår data i variabler som sedan skickas in i funktioner
                let firstValue = calculator.data( 'firstValue' );
                let operator = calculator.data( 'operator' );
                let secondValue = displayedNum;
    
                //Ingen krasch om det saknas värde för calculate funktionen
                if( !firstValue || !secondValue  ){
                    return;
                }
                    
                if (firstValue) {
                    if (previousKeyType === 'calculate') {
                      firstValue = displayedNum
                      secondValue = calculator[0].dataset.modValue
                    }
                    
                  display.textContent = calculate(firstValue, operator, secondValue)
                  }
        
                // Set modValue attribute
                calculator[0].dataset.modValue = secondValue;
                calculator[0].dataset.previousKeyType = 'calculate';
            
            } else if( btn === 'clear'){
                

                firstValue = calculator[0].dataset.firstValue = '';
                operator = calculator[0].dataset.operator = '';
                secondValue = calculator[0].dataset.secondValue = '';
                display.text( 0 );
                calculator[0].dataset.previousKeyType = 'clear';
            
            } else {
    
                //Om det är en operator
    
                //Lägger till klass så användaren vet vilken operator som är aktiv
                $( this ).addClass('is-depressed');
    
                //Lägger in värdet av numrerna & operatorn i variabler
                //kommer vara undefined vid första klicket förutom secondValue som är 0
                let firstValue = calculator.data( 'firstValue' );
                let operator = calculator.data( 'operator' );
                let secondValue = displayedNum;
    
                //Kommer räkna totalen om en operator trycks efter två värden och ett tredje läggs till,
                    //kommer inte räkna ut totalen om operatorn väljs flera gånger i rad
                if (firstValue && operator && previousKeyType !== 'operator') {
                    
                    //För att kunna göra det möjligt att räkna totalen genom att använda operators behöver vi sätta firstValue till det totala värdet så uträkningen blir rätt
                        //Annars hade firtvalue blivit vårt displyed num som är secondValue och firstvalue hade alltid varit detsamma
                        //tex 98 - 1 = 97 -> 98 - 2 = 96 -> 98 - 3 = 95
                        //istället för 98 -1 = 97 -> 97 - 2 = 95 -> 95 - 3 = 92 etc
                    const calcValue = calculate(firstValue, operator, secondValue)
                    display.text(calcValue);
                    
                    //Uppdaterar fistValue med totalvärdet 
                    calculator[0].dataset.firstValue = calcValue;

                  } else if( firstValue && operator && previousKeyType === 'operator' ) {

                    const calcValue = calculate(firstValue, operator, secondValue)
                    display.text(calcValue);
                    calculator[0].dataset.firstValue = calcValue;
                    console.log(calcValue, firstValue);

                  } else {
                    //Om det inte finns ett totalvärde, sätt firstValue som displayen innehåll
                    calculator[0].dataset.firstValue = displayedNum
                    console.log( 'hejhpp' )
             
                  }
    
                //Lägg til egen attribut när vi klickar på operators
                calculator[0].dataset.previousKeyType = 'operator';
    
                //Lägger til egna attributer för det första värdet och vilken operator vi använt när vi klickar på en operator.
                //När vi skriver in första numret händer ingenting, men när vi tex klickar på '+' så sätts första numret tillsammans med operatorn som då är '+' i det här fallet
                //calculator[0].dataset.firstValue = displayedNum;
                calculator[0].dataset.operator = $( this ).data( 'btn' ); //eftersom den bara letar efter när vi klickar på operators så kommer $( this ) vara en operator och datan kommer vara vad data-btn innehåller.
            }
    
    
        } else {

            $( '.error' ).text( 'TURN ON!!' );
            $( '.error-arrow' ).text( '<-' );

        } 

    })
    
        //Funktion för uträkningen
        function calculate( n1, operator, n2 ) {
    
            switch( operator ) {
    
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
        }

    

})
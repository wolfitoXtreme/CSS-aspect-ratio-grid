/**@license Copyright (c) 2015 Cesar Candela
* www.cssguy4hire.com 
*/

var debug = false;

$(document).ready(function () {

    var actionButton = $('#removeGrid');


    // button
    var removeText = $(actionButton).attr('data-text'),
        addText = $('span', actionButton).text(),
        gridTarget = $('#drawArea')
    ;
    
    $(actionButton).on({

        'click' : function(event){

            event.preventDefault;

            $('span', this).text($('span', this).text() == removeText ? addText : removeText);

            $(gridTarget).toggleClass('noGrid');

        }

    });
    
    
});



///////////////////////////////////////////////////
//TEST VARS
///////////////////////////////////////////////////
    


//LOG
if (debug) {
    var console_log = console.log.bind(window.console);
}
else {
    console_log = function(){}
}

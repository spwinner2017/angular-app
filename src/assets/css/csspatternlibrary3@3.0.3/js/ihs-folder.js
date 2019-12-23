// ihs-folder 

/*
$(document).ready(function(){
    $('.folder-checkbox').click(function(){
        if($(this).prop("checked") == true){
            alert("Checkbox is checked.");
        }
        else if($(this).prop("checked") == false){
            alert("Checkbox is unchecked.");
        }
    });
});*/

$(function() {
     
     // checkboxes on load and set selected classes   
     $('.folder-top > input[type="checkbox"]').each(function() {
        if($(this).is(':checked')){
                //alert($(this).attr('id') + ' ' + $(this).is(':checked'));
            $(this).parent().parent().addClass('selected');
        }
    });

     // change/click handler
    $('.folder-top > input[type="checkbox"]').change(function(){
        $(this).parent().parent().toggleClass('selected');

    });
});
// Dual List Selector 

$(function () {

    // if using LI .list-group of shuttle version //

    $('body').on('click', '.list-group .list-group-item', function () {
        $(this).toggleClass('active');
        //alert('What side did you choose? ' + $(this).parent().parent().attr('class'));

        if( $(this).parent().parent().attr('class') === 'list-left container') {
            $('.move-right').addClass('active');
        } else {
            $('.move-left').addClass('active');
        }

    });

    $('.list-arrows button').click(function () {
        var $button=$(this), actives='', newActives='';
        if ($button.hasClass('move-left')) {
            actives=$('.list-right ul li.active');
            newActives = actives.clone().prependTo('.list-left ul');
            newActives.removeClass('active',500);
            actives.remove();
            $button.removeClass('active').blur();
       
        } else if ($button.hasClass('move-right')) {
            actives=$('.list-left ul li.active');
            newActives = actives.clone().prependTo('.list-right ul');
            newActives.removeClass('active',500);           
            actives.remove();
            $button.removeClass('active').blur();
        }
    });

    /*

    // if using CHECKBOX shuttle version //
    
    $('.dual-list .selector').click(function () {
        var $checkBox=$(this);
        if (!$checkBox.hasClass('selected')) {
            $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
            $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        } else {
            $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
            $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        }
    });

    $('[name="SearchDualList"]').keyup(function (e) {
        var code=e.keyCode || e.which;
        if (code === '9') 
          return;
        if (code === '27') $(this).val(null);
        var $rows=$(this).closest('.dual-list').find('.list-group li');
        var val=$.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
        $rows.show().filter(function () {
            var text=$(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

    */

    // if using form SELECT shuttle version //

    $('#add').click(function() {  
      return !$('#select1 option:selected').remove().appendTo('#select2');  
     }); 
     $('#add-all').click(function() {  
      return !$('#select1').children().appendTo('#select2');  
     });  
     $('#remove').click(function() {  
      return !$('#select2 option:selected').remove().appendTo('#select1');  
     });  
     $('#remove-all').click(function() {  
      return !$('#select2').children().appendTo('#select1');  
     });  
    
});
   
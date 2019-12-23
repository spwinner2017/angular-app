/*
   */
$(function() {

    var checkin = $('.brand-calendar-input').datepicker().on('changeDate', function(ev) {
        checkin.hide();
    }).data('datepicker');

    $('.brand-calendar-button').on('click', function(ev){
        checkin.show();
    })
    /*
    var nowTemp=new Date();
    var now=new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
 
    var checkin=$('#ew-date-picker').datepicker({
        onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
         }
        }).on('changeDate', function(ev) {
          if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate=new Date(ev.date);
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
          }
         checkin.hide();
   }).data('datepicker');
   
    var checkin = $('#ihs-datepicker').datepicker({
            onRender: function(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function(ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date);
                newDate.setDate(newDate.getDate() + 1);
                checkout.setValue(newDate);
            }
            console.log('It changed date');
            checkin.hide();
            $('#ihs-datepicker')[0].focus();
        }).data('datepicker');
    
    var checkout = $('#ihs-datepicker').datepicker({
            onRender: function(date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function(ev) {
            checkout.hide();
            console.log('it changed date again');
        }).data('datepicker');
        */

}); 
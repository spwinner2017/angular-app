$(function() {

	    // toggle adds 'active' class to bubble or list btn-group
      // this can be used to display different views on page by toggling that view.

      $('.btn-group').on('click', '.btn', function() {
        $(this).addClass('active').siblings().removeClass('active');
      });

});
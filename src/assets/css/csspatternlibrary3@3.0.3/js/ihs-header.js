/// Script to control link from header logo area to go back to home page

/* R.S. 10/23/2017: added callHeader function to show/hide icon-area hover and
   it's related dropdown-menu/navigation panel
*/

	function callHeader(){

		var timer;
		var delay = 500;
		var elementHovered;

		$(".icon-area").hover(function() {
		    //alert("yep here too!");
		    elementHovered = $(this);
		    timer = setTimeout(function(){
		       showMenu(elementHovered)
		    }, delay);

		}, function() {
		    //elementHovered = $(this);
		    clearTimeout(timer);
		    closeMenu(elementHovered);
		});

	}

	function showMenu(item) {

	      item.addClass('delayed-hover');

	      $('> .dropdown-menu', item).css({
	            'display' : 'block',
	      });
	};

	function closeMenu(item) {
	     
	      item.removeClass('delayed-hover');

	      $('> .dropdown-menu', item).css({
	           'display' : 'none',
	       });
	};

	$(".brand").click( function() {
	    window.location = $(this).attr("data-href"); 
	    return false;
	});

	$('.menu-links li a').click(function() {
      $('.dropdown-menu').dropdown('toggle');
    });


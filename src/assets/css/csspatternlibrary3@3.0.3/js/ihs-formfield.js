;(function ($, undefined) {
    $(function () {
        setTimeout(() => {
            ////////// Required Fields //////////
            //var input = '';
            //$('.required').prevAll().append(" found");
            //console.log(required);

            // Look for any required classes and move asterisk to label
            $(".required").each(function () {
                $(this).closest(':has("label")').find('label').addClass("required-add");
                $(this).remove();
            });


            ////////// Clear Field Controls //////////
            /**
             * Keyup handler for all form controls and inputs that have clear field controls.
             */
            $(".form-control-feedback > .brand-icon-x, .form-control-feedback > .ihs-icon-x")
            .closest('.form-group').find('.form-control, input') // .form-control elements with clearField .form-control-feedback
                .keyup(function () {
                    var t = $(this),
                        clearFieldControl = $(this).closest('.form-group').find(".form-control-feedback > .brand-icon-x, .form-control-feedback > .ihs-icon-x");
                    if (!(t.attr('readonly') || t.attr('disabled'))) {
                        // Hides and shows the 'x' icon (clear field control) based on if input field contains a value.
                        clearFieldControl.toggle(Boolean(t.val()));
                    }
                });

            /**
             * Click handler for clear field control that matches the query selector.
             */
            $(".form-control-feedback > .brand-icon-x, .form-control-feedback > .ihs-icon-x")
                .click(function () {
                    var $formControl = $(this).closest('.form-group').find('.form-control, input');
                    $formControl.val('').focus();
                    $(this).hide();
                })
                // TODO: Only initialize as hidden when .form-control is blank.
                .hide(); // Initialize as hidden.

        }, 10);
    });
})(jQuery);

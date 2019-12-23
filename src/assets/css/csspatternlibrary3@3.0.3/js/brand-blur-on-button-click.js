;(function (window, document, undefined) {
    'use strict';

    /**
     * Element.matches() polyfill (simple version)
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
     */
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    /**
     * Establish the Css Pattern Library (CPL) namespace. Add it to the global namespace if necessary.
     */
    var brandcpl;
    brandcpl = window.brandcpl = (typeof(window.brandcpl) !== 'undefined' ? window.brandcpl : {});
    
    /**
     * Handler when the DOM is fully loaded
     */
    function domReadyHandler() {
        addListenersToBlurAllButtonsAfterClick();
    }

    function blurButtonAfterClickEventListener(event){
        setTimeout(function() {
            // If the clicked element no longer has the right selector, bail
            if (!event.target.closest('.btn')) {
                return;
            }

            // Blur SVG icons if they are the click target instead of the button.
            if (!event.target.matches('.btn') || document.activeElement.tagName === 'SVG' || document.activeElement.tagName === 'USE') {
                event.target.blur();
                document.activeElement.blur();
            }
            
            event.target.closest('.btn').blur();
        }, 10);
    }

    /**
     * Find all .btn elements and remove the event listener to blur them (remove focus) after they've been clicked.
     */
    function removeListenersToBlurAllButtonsAfterClick(){
        var buttonElements = document.getElementsByClassName('btn');

        for (var buttonElement of buttonElements) {
            buttonElement.removeEventListener('click', blurButtonAfterClickEventListener);
        }
    }

    /**
     * Find all .btn elements and add an event listener to blur them (remove focus) after they've been clicked.
     */
    function addListenersToBlurAllButtonsAfterClick(){
        var buttonElements = document.getElementsByClassName('btn');

        removeListenersToBlurAllButtonsAfterClick();

        for (var buttonElement of buttonElements) {
            buttonElement.addEventListener('click', blurButtonAfterClickEventListener);
        }
    }

    // Equivalent to jQuery ready method for IE9+. See https://www.sitepoint.com/jquery-document-ready-plain-javascript/
    if (
        document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)
    ) {
        domReadyHandler();
    } else {
        document.addEventListener("DOMContentLoaded", domReadyHandler);
    }

    brandcpl.addListenersToBlurAllButtonsAfterClick = addListenersToBlurAllButtonsAfterClick;
})(window, document);

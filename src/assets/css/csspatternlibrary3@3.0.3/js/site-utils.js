////////// Helper methods //////////
function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className)
    } else {
        var theEl = !!el;
        if (typeof theEl === 'boolean') { // IE 11-
            if (typeof el.className.baseVal.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) !== null) {
                // No match so return false.
                return false;
            } else if (
                typeof el.className.baseVal.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) !== 'undefined' &&
                typeof el.className.baseVal.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))[0] !== 'undefined') {
                return (el.className.baseVal.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))[0].trim()) === className;
            } else { // Fallback
                return false;
            }
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}

function toggleDisplay(isDisplaying, selector) {
    let examplesArray = document.querySelectorAll(selector);
    Array.prototype.forEach.call(examplesArray, function (example) {
        //for(let example of examplesArray) {
        if (isDisplaying) {
            removeClass(example, 'display-none');
            // Animate after
            setTimeout(function () {
                toggleOpacity(isDisplaying, selector);
            }, 200);
        } else {
            // Animate before
            toggleOpacity(isDisplaying, selector, function () {
                addClass(example, 'display-none');
            });
            // addClass(example, 'display-none');
        }
        //}
    });
}

function toggleDisplayByCheckbox(checkboxElement, selector) {
    let isChecked = checkboxElement.checked;
    toggleDisplay(isChecked, selector);
}

function toggleVisibility(isShowing, selector) {
    let examplesArray = document.querySelectorAll(selector);
    Array.prototype.forEach.call(examplesArray, function (example) {
        //for(let example of examplesArray) {
        if (isShowing) {
            removeClass(example, 'visibility-hidden');
        } else {
            addClass(example, 'visibility-hidden');
        }
        //}
    });
}

function toggleVisibilityByCheckbox(checkboxElement, selector) {
    let isChecked = checkboxElement.checked;
    toggleVisibility(isChecked, selector);
}

function runPostTransition(element, animationCompleteCallback) {
    element.removeEventListener("transitionend", runPostTransition);
    if (typeof animationCompleteCallback !== 'undefined') {
        // This setTimout shouldn't be needed. runPostTransition() is being called too soon because transitionend is firing too soon.
        setTimeout(function () {
            animationCompleteCallback();
        }, 500);
    }
}

function toggleOpacity(isShowing, selector, animationCompleteCallback) {
    let examplesArray = document.querySelectorAll(selector);
    Array.prototype.forEach.call(examplesArray, function (example) {
        //for(let example of examplesArray) {
        example.addEventListener("transitionend", runPostTransition(example, animationCompleteCallback));
        if (isShowing) {
            removeClass(example, 'transparent');
        } else {
            addClass(example, 'transparent');
        }
        //}
    });
}

function toggleOpacityByCheckbox(checkboxElement, selector) {
    let isChecked = checkboxElement.checked;
    toggleOpacity(isChecked, selector);
}



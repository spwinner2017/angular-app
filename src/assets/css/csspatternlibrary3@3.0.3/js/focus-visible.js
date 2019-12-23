(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * https://github.com/WICG/focus-ring
 */
function init() {
  // var hadKeyboardEvent = true;
  var hadKeyboardModalityEvent = true; // Defining as - A keyboard initiated event that caused a different element to have and keep focus (keep meaning - focus is maintained while awaiting next user input).
  var hadFocusVisibleRecently = false;
  var hadFocusVisibleRecentlyTimeout = null;
  var elementTypesWhitelist = {
    // A: true,
    checkbox: true,
    // date: true,
    // datetime: true,
    // 'datetime-local': true,
    // email: true,
    // number: true,
    // month: true,
    // password: true,
    radio: true,
    // search: true,
    // tel: true,
    // text: true,
    // TEXTAREA: true
    // time: true,
    // url: true,
    // week: true
  };
  var keyboardNavWhitelist = {
    'ArrowDown': true,
    'ArrowLeft': true,
    'ArrowRight': true,
    'ArrowUp': true,
    'Tab': true
  };
  var modifierKeysWhitelist = {
    'Alt': true,
    'AltGraph': true,
    'CapsLock': true,
    'Control': true,
    'Meta': true,
    'NumLock': true,
    'Shift': true
  }

  /**
   * Helper function for legacy browsers and iframes which sometimes focus
   * elements like document and body.
   * @param {Element} el
   */
  function isValidFocusTarget(el) {
    if (
      el &&
      el !== document &&
      el.nodeName !== 'HTML' &&
      el.nodeName !== 'BODY'
    ) {
      return true;
    }
    return false;
  }

  /**
   * Checks a whitelist to see whether the given element would benefit from the
   * `focus-visible` class being added.
   * @param {Element} el
   * @return {boolean}
   */
  function requiresFocusVisible(el) {
    var type = el.type;
    var tagName = el.tagName;

    if (elementTypesWhitelist[tagName] && !el.readonly) {
      return true;
    } else if (tagName == 'INPUT' && elementTypesWhitelist[type] && !el.readonly) {
      return true;
    } else if (el.contentEditable == 'true') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Add the `focus-visible` class to the given element if it was not added by
   * the author.
   * @param {Element} el
   */
  function addFocusVisibleClass(el) {
    if (el.classList.contains('focus-visible')) {
      return;
    }
    el.classList.add('focus-visible');
    el.setAttribute('data-focus-visible-added', '');
  }

  /**
   * Remove the `focus-visible` class from the given element if it was not
   * originally added by the author.
   * @param {Element} el
   */
  function removeFocusVisibleClass(el) {
    if (!el.hasAttribute('data-focus-visible-added')) {
      return;
    }
    el.classList.remove('focus-visible');
    el.removeAttribute('data-focus-visible-added');
  }

  /**
   * Treat `keydown` as a a possible trigger that the user is entering keyboard modality.
   * Apply `focus-visible` to any current active element and keep track
   * of our keyboard modality state with `hadKeyboardModalityEvent`.
   * @param {Event} e
   */
  function onKeyDown(e) {
    if (isValidFocusTarget(document.activeElement)) {
      if (modifierKeysWhitelist[e.key]) {
        return; // Handle as quickly as possible.
      } else if (document.activeElement.type === 'radio' && e.key !== 'Tab' && (keyboardNavWhitelist[e.key])) {
        // With radio buttons - using the arrow keys should actually addFocusVisibleClass to the soon to be document.activeElement instead of the current document.activeElement.
        setTimeout(function(){
          hadKeyboardModalityEvent = true;
          // addFocusVisibleClass(document.activeElement);
        }, 1);
      } else if (keyboardNavWhitelist[e.key]) {
        hadKeyboardModalityEvent = true;
        // addFocusVisibleClass(document.activeElement);
      } else {
        hadKeyboardModalityEvent = false;
      }
    }

    // hadKeyboardEvent = true;
  }

  /**
   * If at any point a user clicks with a pointing device, ensure that we change
   * the modality away from keyboard.
   * This avoids the situation where a user presses a key on an already focused
   * element, and then clicks on a different element, focusing it with a
   * pointing device, while we still think we're in keyboard modality.
   * @param {Event} e
   */
  function onPointerDown(e) {
    // hadKeyboardEvent = false;
    hadKeyboardModalityEvent = false;
  }

  /**
   * On `focus`, add the `focus-visible` class to the target if:
   * - the target received focus as a result of keyboard navigation, or
   * - the event target is an element that will likely require interaction
   *   via the keyboard (e.g. a text box)
   * @param {Event} e
   */
  function onFocus(e) {
    // Prevent IE from focusing the document or HTML element.
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    // if (hadKeyboardEvent) {
    if (hadKeyboardModalityEvent) {
      if (requiresFocusVisible(e.target)) {
  
        addFocusVisibleClass(e.target);
        // hadKeyboardEvent = false;
        hadKeyboardModalityEvent = false;
      }
    }
  }

  /**
   * On `blur`, remove the `focus-visible` class from the target.
   * @param {Event} e
   */
  function onBlur(e) {
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    if (e.target.classList.contains('focus-visible')) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
        hadFocusVisibleRecently = false;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      }, 100);
      removeFocusVisibleClass(e.target);
    }
  }

  /**
   * If the user changes tabs, keep track of whether or not the previously
   * focused element had .focus-visible.
   * @param {Event} e
   */
  function onVisibilityChange(e) {
    if (document.visibilityState == 'hidden') {
      // If the tab becomes active again, the browser will handle calling focus
      // on the element (Safari actually calls it twice).
      // If this tab change caused a blur on an element with focus-visible,
      // re-apply the class when the user switches back to the tab.
      if (hadFocusVisibleRecently) {
        // hadKeyboardEvent = true;
        hadKeyboardModalityEvent = true;
      }
      addInitialPointerMoveListeners();
    }
  }

  /**
   * Add a group of listeners to detect usage of any pointing devices.
   * These listeners will be added when the polyfill first loads, and anytime
   * the window is blurred, so that they are active when the window regains
   * focus.
   */
  function addInitialPointerMoveListeners() {
    document.addEventListener('mousemove', onInitialPointerMove);
    document.addEventListener('mousedown', onInitialPointerMove);
    document.addEventListener('mouseup', onInitialPointerMove);
    document.addEventListener('pointermove', onInitialPointerMove);
    document.addEventListener('pointerdown', onInitialPointerMove);
    document.addEventListener('pointerup', onInitialPointerMove);
    document.addEventListener('touchmove', onInitialPointerMove);
    document.addEventListener('touchstart', onInitialPointerMove);
    document.addEventListener('touchend', onInitialPointerMove);
  }

  function removeInitialPointerMoveListeners() {
    document.removeEventListener('mousemove', onInitialPointerMove);
    document.removeEventListener('mousedown', onInitialPointerMove);
    document.removeEventListener('mouseup', onInitialPointerMove);
    document.removeEventListener('pointermove', onInitialPointerMove);
    document.removeEventListener('pointerdown', onInitialPointerMove);
    document.removeEventListener('pointerup', onInitialPointerMove);
    document.removeEventListener('touchmove', onInitialPointerMove);
    document.removeEventListener('touchstart', onInitialPointerMove);
    document.removeEventListener('touchend', onInitialPointerMove);
  }

  /**
   * When the polfyill first loads, assume the user is in keyboard modality.
   * If any event is received from a pointing device (e.g. mouse, pointer,
   * touch), turn off keyboard modality.
   * This accounts for situations where focus enters the page from the URL bar.
   * @param {Event} e
   */
  function onInitialPointerMove(e) {
    // Work around a Safari quirk that fires a mousemove on <html> whenever the
    // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
    if (e.target.nodeName.toLowerCase() === 'html') {
      return;
    }

    // hadKeyboardEvent = false;
    hadKeyboardModalityEvent = false;
    removeInitialPointerMoveListeners();
  }

  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mousedown', onPointerDown, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('touchstart', onPointerDown, true);
  document.addEventListener('focus', onFocus, true);
  document.addEventListener('blur', onBlur, true);
  document.addEventListener('visibilitychange', onVisibilityChange, true);
  addInitialPointerMoveListeners();

  document.body.classList.add('js-focus-visible');
}

/**
 * Subscription when the DOM is ready
 * @param {Function} callback
 */
function onDOMReady(callback) {
  var loaded;

  /**
   * Callback wrapper for check loaded state
   */
  function load() {
    if (!loaded) {
      loaded = true;

      callback();
    }
  }

  if (document.readyState === 'complete') {
    callback();
  } else {
    loaded = false;
    document.addEventListener('DOMContentLoaded', load, false);
    window.addEventListener('load', load, false);
  }
}

if (typeof document !== 'undefined') {
  onDOMReady(init);
}

})));

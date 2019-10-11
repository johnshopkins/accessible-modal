/* global module: false */

var $ = require("./shims/jquery");

/**
 * Initialize an accessible modal
 * @param  {array} focusable An array of selectors of focusable objects in the modal
 * @return null
 */
var AccessibleModal = function () {

  this.focusable = [
    "a[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "iframe",
    "object",
    "embed",
    "*[tabindex]",
    "*[contenteditable]",
    "[tabindex]:not([tabindex='-1'])"
  ];

};

/**
 * [open description]
* @param  {jQuery DOM object} beforeOpenFocus The object that had browser focus
 *                     												 before the modal was opened.
 */
AccessibleModal.prototype.saveFocus = function (beforeOpenFocus) {

  this.beforeOpenFocus = beforeOpenFocus;

};

AccessibleModal.prototype.returnFocus = function () {

  if (this.beforeOpenFocus) {
    this.beforeOpenFocus.focus();
    this.beforeOpenFocus = null;
  }

};

/**
 * Set the initial focus on a modal to a particular element
 * @param {jQuery DOM object} el Element to set focus to
 */
AccessibleModal.prototype.setInitialFocus = function (el) {

  if (el.length === 0) return;

  // The menu modal requires a brief timeout in order to be able
  // to focus the first element in the modal. This wasn't a problem
  // for the other modals (profile, division, etc…), but it is for
  // the nav, so making this a global change in case this issue
  // pops up again. ¯\_(ツ)_/¯
  setTimeout(function () {
    el.focus();
  }, 1);

};

/**
 * Get an array of focusable elements
 * within an element
 * @param  {object} el jQuery DOM Object
 * @return {array}
 */
AccessibleModal.prototype.getFocusable = function (el) {

  return el.find(this.focusable.join(",")).filter(":visible").filter(function () {

    // :visible does not remove elements with visibilty:hidden CSS attribute
    if ($(this).css('visibility') === 'hidden') return false;

    // no tabindex, include this element
    if (typeof $(this).attr("tabindex") === "undefined") return true;

    // exclude items with a negative tabindex
    return $(this).attr("tabindex") > -1;

  });

};

/**
 * Trap the tab key within an element (like a modal)
 * @param  {object} el jQuery DOM Object
 * @param  {object} e  Event
 */
AccessibleModal.prototype.trapTab = function (el, e) {

  e.preventDefault();

  var focusable = this.getFocusable(el);        // array of focusable elements
  var focused = focusable.filter(":focus");     // currently focused item
  var focusedIndex = focusable.index(focused);  // index of currently focused element

  var newIndex;

  if (focusedIndex > -1) {

    newIndex = e.shiftKey ? focusedIndex - 1 : focusedIndex + 1;

    if (newIndex > focusable.length - 1) {
      newIndex = 0;
    } else if (newIndex === -1) {
      newIndex = focusable.length - 1;
    }

  } else {
    newIndex = 0;
  }

  focusable.get(newIndex).focus();

};

module.exports = AccessibleModal;

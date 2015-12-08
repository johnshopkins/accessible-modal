# accessible-modal

A module that aids in creating accessibile modals.

### Usage

```JavaScript

var AccessibleModal = require("accessible-modal");

$(function() {

  var accessibleModal = new AccessibleModal();

  // when the user is in the modal, trap the tab in the modal
  var modal = $(".modal");
  accessibleModal.trapTab(modal, e);

  // set focus to an element when modal is opened
  accessibleModal.setInitialFocus($(".modal .close-button"));

  // before the modal is opened, save the focus of the element that triggered opening the modal
  accessibleModal.saveFocus(".modal-trigger");

  // when modal closes, return focus to the element that had focus previously
  accessibleModal.returnFocus();

  });

});
```

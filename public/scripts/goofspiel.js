$(() => {

 $('#deleteCookie').click(function() {
        $.cookie('1', null);
        displayMessage("Cookie 'test' has been deleted.");
      });
}

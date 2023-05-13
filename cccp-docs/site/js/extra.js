$(document).ready(function() {
    // https://clipboardjs.com/
    var selectors = document.querySelectorAll('code');
    var copyButton = '<div class="clipboard"><span class="btn btn-neutral btn-clipboard" title="Copy to clipboard"><span class="icon fa-clone fa-2x" aria-hidden="true"></span></span></div>';
    Array.prototype.forEach.call(selectors, function(selector){
      selector.insertAdjacentHTML('beforebegin', copyButton);
    });
    var clipboard = new Clipboard('.btn-clipboard', {
      target: function (trigger) {
        return trigger.parentNode.nextElementSibling;
      }
    });
  
    clipboard.on('success', function (e) {
      e.clearSelection();
  
      // https://atomiks.github.io/tippyjs/v6/all-props/
      var tippyInstance = tippy(
        e.trigger,
        {
          content: 'Copied',
          showOnCreate: true,
          trigger: 'manual',
        },
      );
      setTimeout(function() { tippyInstance.hide(); }, 1000);
    });
  });
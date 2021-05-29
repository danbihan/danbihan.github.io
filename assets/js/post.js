/*#############################################
  Hide navbar on scroll down; show on scroll up
  #############################################*/
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-58px";
  }
  prevScrollpos = currentScrollPos;
}

/*####################
  Customize ToC plugin
  ####################*/
  $(function() {
    var navSelector = "#toc";
    //var $myNav = $(navSelector);
    Toc.init({
      $nav: $("#toc"),
      $scope: $("h2, h3")
    });
    $("body").scrollspy({
      target: navSelector
    });
  });
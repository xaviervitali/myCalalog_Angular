window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector("header .navbar").style.padding = "0";
    document.querySelector("header .navbar .navbar-brand");
    
  } else {
    document.querySelector("header .navbar").style.padding = "100px 10px";
  }
}

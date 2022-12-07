// Change the arrow character to ASCII if on movile, as it is not supported by most mobile browsers
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    var char = /🠚/g;
    var el = document.body.getElementsByTagName("main");
    var h = el[0].innerHTML.replace(char, '->');
    el[0].innerHTML = h;
}
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            // var clientWidth = docEl.clientWidth;
            var clientWidth = docEl.getBoundingClientRect().width;
            if (!clientWidth) return;
            docEl.style.fontSize = clientWidth / 15 + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
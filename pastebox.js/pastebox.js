;
(function ($) {

    var urlRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            if (typeof (callback) == "function") {
                timer = setTimeout(callback, ms);
            }
        };
    })();

    $.fn.paste = function (callback, timeout) {
        
        var ctrlDown = false;
        var ctrlKey = 17, vKey = 86, cKey = 67;

        return this.each(function (i, elem) {
            $(this).keydown(function (e) {
                if (e.keyCode == ctrlKey) ctrlDown = true;
            }).keyup(function (e) {
                if (e.keyCode == ctrlKey) ctrlDown = false;
            }).keyup(function (e) {
                if (ctrlDown && (e.keyCode == vKey)) {
                    delay(callback(elem.value), 500);
                }
            });
        });
        
    };

    $.fn.pastebox = function (options) {
        
        var settings = $.extend({
            crawlerUrl: null,
            onCrawlDone: null,
            spamTimeout: 500
        }, options);
        
        return this.each(function (i, elem) {
            $(elem).paste(function (url) {
                if (urlRegex.test(url)) {
                    if (typeof (settings.onCrawlDone) == "function") {
                        $.ajax({
                            url: settings.crawlerUrl + "?url=" + encodeURIComponent(url),
                            success: settings.onCrawlDone
                        });
                    }
                }
            }, settings.spamTimeout);
        });
        
    };

})(jQuery);
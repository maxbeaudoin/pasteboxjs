;
(function($) {

    var urlRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    
    /*$.fn.paste = function(callback, timeout) {

        var ctrlDown = false;
        var vKey = 86;

        return this.each(function(i, elem) {

            $(this).keydown(function(e) {
                if (e.ctrlKey || e.metaKey) ctrlDown = true;
            }).keyup(function(e) {
                if (e.ctrlKey || e.metaKey) ctrlDown = false;
            }).keyup(function(e) {
                console.log(ctrlDown);
                console.log(e);
                if (ctrlDown && (e.keyCode == vKey)) {
                    delay(callback(elem.value), 500);
                }
            });
        });
    };*/

    $.fn.pastebox = function(options) {

        var settings = $.extend({
            crawlerUrl: null,
            onCrawlDone: null,
            spamTimeout: 100
        }, options);

        return this.each(function(i, elem) {
            $(elem).bind('paste', function (e) {
                setTimeout(function () {
                    var url = $(elem).val();
                    if (urlRegex.test(url)) {
                        if (typeof(settings.onCrawlDone) == "function") {
                            $.ajax({
                                url: settings.crawlerUrl + "?url=" + encodeURIComponent(url),
                                success: settings.onCrawlDone
                            });
                        }
                    }
                }, settings.spamTimeout);
            });
        });
    };

})(jQuery);
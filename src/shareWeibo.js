define(function (require, exports, module) {
    var shareWeibo = {};
    (function ($) {
        var API = require('seedit/API/0.0.1/API');
        var dialog = require('seedit/dialog/0.0.1/dialog');
        shareWeibo.open = function (options, success, error) {
            var defaults = {
                title: '分享到新浪微博',  // 标题
                successCallback: $.noop,  // 成功回调
                errorCallback: $.noop,  // 失败回调
                content: '', // 分享内容 ,
                placeholder: '填写分享内容哦', // 内容为空时的提示
                limit:140 // 字数限制
            };
            $.extend(defaults, options);
        };
    })(jQuery);
    module.exports = shareWeibo;
});

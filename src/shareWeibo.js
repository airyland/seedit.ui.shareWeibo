define(function (require, exports, module) {
    // @todo 字数限制
    require.async('./shareWeibo.css');
    var shareWeibo = {};
    (function ($) {
        var API = require('seedit/API/0.0.1/API');
        var dialog = require('seedit/dialog/0.0.1/dialog-debug');

        shareWeibo.open = function (options) {
            var defaults = {
                trigger: null, // 触发元素，可为空
                title: '分享到新浪微博自定标题',  // 标题
                successCallback: $.noop,  // 成功回调
                errorCallback: $.noop,  // 失败回调
                content: '', // 分享内容
                placeholder: '填写分享内容哦', // 内容为空时的提示
                limit: 140, // 字数限制
                type:1 // 分享类型，1为送子灵庙，2为播种网，3为其他，3不加积分
            };
            $.extend(defaults, options);

            var openDialog = function () {
                var shareBox = $.dialog('<div class="share-box"><h3>' + defaults.title + '</h3><div class="share-body"><textarea id="share-weibo-textarea" placeholder="请填写分享内容哦~">' + defaults.content + '</textarea></div><div class="share-bottom"><a href="javascript:" id="do_share">分享</a></div></div>', {
                    width: '500px',
                    title: false,
                    border: false,
                    closebtn: true,
                    onshow: function () {
                        $('#wrapClose').click(function(e){
                            e.preventDefault();
                            $(this).closest('.wrap_out').remove();
                        });
                        // 绑定点击事件
                        jQuery('#do_share').click(function (e) {
                            e.preventDefault();
                            console.log($('#share-weibo-textarea').val())
                            API.post('http://account.seedit.com/api/sina_statuses_update.iframe', {
                                status: $('#share-weibo-textarea').val(),
                                type: 1
                            }, function (data) {
                                $('.share-box').closest('.wrap_out').remove();
                                $.dialog.alert('发送成功啦',function(){
                                 $('.wrap_out').remove();
                                });
                            }, function (data) {
                                if (/用户未绑定/.test(data.error_message)) {
                                    $.dialog.alert('您还未绑定新浪微博哦，点确定去绑定', function () {
                                        document.location.href = 'http://account.seedit.com/oauth/bind/type/sina';
                                    }, {icon: 'danger'});
                                } else if (/请重新登录/.test(data.error_message)) {
                                    $.dialog.alert('您的微博授权已经过期了哦，请重新绑定', function () {
                                        document.location.href = 'http://account.seedit.com/oauth/back';
                                    }, {icon: 'danger'});
                                } else if (/其他错误/.test(data.error_message)) {
                                    $.dialog.alert('分享成功', function () {
                                    }, {icon: 'info'});
                                } else {
                                    $.dialog.alert('出错啦,' + data.error_message,null,{icon:'danger'});
                                }
                            });
                        });
                    }
                });
            };

            // 若有触发器
            if (defaults.trigger) {
                $(defaults.trigger).click(openDialog);
            } else {
                openDialog();
            }

        };
    })(jQuery);
    module.exports = shareWeibo;
});

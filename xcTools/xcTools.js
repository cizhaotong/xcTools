(function(window, $){
    "use strict";
    var xc = {};
    /** 工具库 */
    xc.tools = {
        /**
         * @action getUrlParam 获取url参数
         * @param name 参数名称
         * @return  string 参数的值
         */
        getUrlParam: function(name){
            try{
                var webUrl = window.location.href;
                if(webUrl.indexOf('?') === -1) {
                    return '';
                }
                var strs = webUrl.split('?')[1];
                var params = strs.split('&');
                var paramsF = {};
                for(var i in params) {
                    paramsF[params[i].split('=')[0]] = params[i].split('=')[1];
                }
                var resp = paramsF[name] || '';
                return decodeURI(resp);
            }catch(e){
                return '';
            }
        },
        /**
         * @action encode 字符串编码
         * @param e: 未加密的字符串
         * @return string 加密的字符串
         */
        encode: function(e){
            return encodeURIComponent(e || '');
        },
        /**
         * @action decode 字符串解码
         * @param e: 加密的字符串
         * @return string 解密的字符串
         */
        decode: function(e){
            return decodeURIComponent(e || '');
        },
        /**
         * @action alert 弹出框
         * @param text: 弹出框内容
         * @param func: 可选,确认按钮执行方法
         */
        alert: function(text, func){
            if($('.xc-alert').length == 0){
                var str = '';
                str += '<div class="xc-alert">';
                str += '	<div class="xc-alert-con">';
                str += '		<div class="xc-con"></div>';
                str += '		<div class="xc-alert-btn"></div>';
                str += '	</div>';
                str += '</div>';
                $('body').append(str);
                $('.xc-alert-btn').unbind('click').click(function(){
                    $('.xc-alert').hide();
                    $('.xc-alert .xc-con').empty();
                    if(func) func();
                });
            }
            $('.xc-alert .xc-con').html(text);
            $('.xc-alert').show();
            var bodyH = $(window).height() * 0.92;
            var thisH = $('.xc-alert-con').height();
            var marginT = (bodyH - thisH) / 2;
            $('.xc-alert-con').css('margin-top' , marginT + 'px');
        },
        /**
         * @action confirm 选择弹出框
         * @param text: 弹出框内容
         * @param func: 可选,确认按钮执行方法
         * @param cancelFunc: 可选,返回按钮执行方法
         */
        confirm: function(text, func, cancelFunc){
            if($('.xc-confirm').length == 0){
                var str = '';
                str += '<div class="xc-confirm">';
                str += '	<div class="xc-confirm-con">';
                str += '		<div class="xc-con"></div>';
                str += '		<div class="xc-confirm-btn ok"></div>';
                str += '		<div class="xc-confirm-btn cancel"></div>';
                str += '	</div>';
                str += '</div>';
                $('body').append(str);
                $('.xc-confirm-btn').unbind('click').click(function(){
                    $('.xc-confirm').hide();
                    $('.xc-confirm .xc-con').empty();
                    var ok = $(this).hasClass('ok');
                    if(ok && func) func();
                    var cancel = $(this).hasClass('cancel');
                    if(cancel && cancelFunc) cancelFunc();
                });
            }
            $('.xc-confirm .xc-con').html(text);
            $('.xc-confirm').show();
            var bodyH = $(window).height() * 0.92;
            var thisH = $('.xc-confirm-con').height();
            var marginT = (bodyH - thisH) / 2;
            $('.xc-confirm-con').css('margin-top' , marginT + 'px');
        },
        /**
         * @action loading 加载中特效
         * @param o: 操作,open打开,close关闭
         * @param style: 样式,可选
         * @param style.v: 指定父级id,可选
         * @param style.out: 1去除遮罩层阻挡效果, 2点击遮罩层关闭,可选
         * @param style.color: 遮罩层是否显示颜色, 默认false透明,可选true
         * @param style.fillColor: 等待动画图标颜色
         */
        loading: function(o, style){
            style = style || {};
            var $body = $('body');
            if(style.v) $body = $('#' + style.v);
            if($body.children('.xc-loading').length == 0){
                var fillColor = style.fillColor || '#4FC2BF';
                var str = '';
                str += '<div class="xc-loading">';
                str += '	<div class="xc-con">';
                str += '		<svg version="1.1"xmlns="http://www.w3.org/2000/svg">';
                str += '		    <circle cx="47" cy="10" r="10" stroke="none" fill="'+ fillColor +'" opacity="1"/>';
                str += '		    <circle cx="23" cy="16" r="9" stroke="none" fill="'+ fillColor +'" opacity="0.9"/>';
                str += '		    <circle cx="10" cy="33" r="8" stroke="none" fill="'+ fillColor +'" opacity="0.8"/>';
                str += '		    <circle cx="10" cy="51" r="7" stroke="none" fill="'+ fillColor +'" opacity="0.7"/>';
                str += '		    <circle cx="19" cy="66" r="6" stroke="none" fill="'+ fillColor +'" opacity="0.6"/>';
                str += '		    <circle cx="32" cy="74" r="5" stroke="none" fill="'+ fillColor +'" opacity="0.5"/>';
                str += '		    <circle cx="46" cy="75" r="4" stroke="none" fill="'+ fillColor +'" opacity="0.4"/>';
                str += '		    <circle cx="57" cy="72" r="3" stroke="none" fill="'+ fillColor +'" opacity="0.3"/>';
                str += '		    <circle cx="67" cy="65" r="2" stroke="none" fill="'+ fillColor +'" opacity="0.2"/>';
                str += '		    <circle cx="71" cy="57" r="1" stroke="none" fill="'+ fillColor +'" opacity="0.1"/>';
                str += '		</svg">';
                str += '	</div>';
                str += '</div>';
                $body.append(str);
            }
            var $loading = $body.children('.xc-loading');
            if(o == 'open'){
                $loading.show();
            }else if(o == 'close'){
                $loading.hide();
            }else{
                if($loading.is(':hidden')){
                    $loading.show();
                }else{
                    $loading.hide();
                }
            }
            if(style.v){
                var parentPo = $body.css('position');
                if(parentPo != 'absolute' && parentPo != 'fixed'){
                    $body.css('position', 'relative');
                }
                $loading.addClass('xc-loading-po');
            }else {
                $loading.removeClass('xc-loading-po');
            }
            if(style.out == '1'){
                $loading.addClass('xc-loading-out');
            }else if(style.out == '2'){
                $loading.removeClass('xc-loading-out').unbind().click(function(){
                    $(this).hide();
                });
            }else{
                $loading.removeClass('xc-loading-out');
            }
            if(style.color){
                $loading.addClass('xc-loading-bg-color');
            }else {
                $loading.removeClass('xc-loading-bg-color');
            }
        },
        ajaxCountLink: 0,
        ajax: function(url, params, successFunc, errorFunc, async, header){
            var _this = this;
            _this.ajaxCountLink ++;
            _this.loading('open');
            $.ajax({
                url: url,
                type: 'POST',
                timeout: 60000,
                dataType: 'json',
                data: JSON.stringify(params),
                async: async != false,
                contentType: 'application/json',
                beforeSend: function (request) {
                    if(header){
                        for(var key in header){
                            request.setRequestHeader('key', header[key]);
                        }
                    }
                },
                success: function(obj){
                    _this.ajaxCountLink --;
                    if(_this.ajaxCountLink <= 0){
                        _this.ajaxCountLink = 0;
                        _this.loading('close');
                    }
                    if(successFunc){
                        successFunc(obj);
                    }
                },
                error: function(XMLHttpRequest, textstatus){
                    console.log(url + '接口异常请求:' + JSON.stringify(params));
                    console.log(url + '接口异常返回:' + XMLHttpRequest.statusText);
                    _this.ajaxCountLink = 0;
                    _this.loading('close');
                    if(errorFunc){
                        errorFunc(XMLHttpRequest, textstatus);
                    }
                }
            });
        },
        store: {
            set : function(key, value){
                if(value != null){
                    localStorage.setItem(key, JSON.stringify(value));
                }
            },
            get : function(key){
                return JSON.parse(localStorage.getItem(key)) || '';
            },
            remove : function(key){
                localStorage.removeItem(key);
            },
            clear : function(){
                localStorage.clear();
            }
        },
        /**
         * @action cookie 本地存储cookie封装
         * @param cookie.set: 存储
         * @param cookie.get: 获取
         * @param cookie.remove: 删除
         * @param cookie.clear: 清空
         */
        cookie: {
            set : function(key , value){
                if(value != null){
                    document.cookie = key + '=:' + value + ';path=/;';
                }
            },
            get : function(key){
                var cookieList = document.cookie.split('; ');
                for(var i = 0 ; i < cookieList.length ; i ++){
                    if(cookieList[i].split('=:')[0] == key){
                        return cookieList[i].split('=:')[1];
                    }
                }
                return null;
            },
            remove : function(key){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = $.cookie.get(key);
                if(cval != null)
                    document.cookie= key + '=:'+ cval +';expires='+ exp.toUTCString() + ';path=/;';
            },
            clear : function(){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cookieList = document.cookie.split('; ');
                for(var i = 0 ; i < cookieList.length ; i ++){
                    document.cookie= cookieList[i].split('=:')[0] + '=:'+ cookieList[i].split('=:')[1] +';expires='+ exp.toUTCString() + ';path=/;';
                }
            }
        },
        /**
         * @action fitScreen 适应屏幕
         * @param v: 绑定元素id
         * @param screen.width: 屏幕宽度
         * @param screen.height: 屏幕高度
         * @param layout: 布局
         */
        fitScreen: function(v, screen, layout){
            var _this = this;
            var windowHeight = $(window).height();
            $('body').css('min-height', windowHeight);
            _this.countScreen(v, screen, layout);
            $(window).resize(function(){
                if(windowHeight < $(this).height()) {
                    windowHeight = $(this).height();
                    $('body').css('min-height', windowHeight);
                    _this.countScreen(v, screen, layout);
                }
            });
        },
        /**
         * @action fitScreen 计算屏幕比例
         * @param v: 绑定元素id
         * @param screen.width: 屏幕宽度
         * @param screen.height: 屏幕高度
         * @param screen.real: 可选,是否真实尺寸,默认false适应屏幕
         * @param layout: 模块布局
         * @param layout.id: 模块id
         * @param layout.po: 模块位置[x, y];
         * @param layout.size: 模块大小[width, height];
         */
        countScreen: function (v, screen, layout) {
            if(v && screen){
                var windowWidth = $(window).width();
                var windowHeight = $(window).height();
                var screenWidth = parseInt(screen.width) || windowWidth;
                var screenHeight = parseInt(screen.height) || windowHeight;
                var realWidth = windowHeight / screenHeight * screenWidth;
                var realHeight = windowHeight;
                if(screen.real) {
                    realWidth = screenWidth;
                    realHeight = screenHeight;
                }
                $('#' + v).css({
                    display: 'block',
                    margin: '0 auto',
                    overflow: 'hidden',
                    position: 'relative',
                    width: realWidth,
                    height: realHeight
                }).parent().css({
                    overflow: 'auto'
                });
                if(layout && layout.length){
                    for(var i in layout){
                        var layoutId = layout[i].id;
                        var $layoutItem = $('#' + layoutId);
                        if(!$layoutItem.length) continue;
                        $layoutItem.css({
                            position: 'absolute',
                            display: 'block'
                        });
                        var layoutPo = layout[i].po;
                        if(layoutPo && layoutPo.length) {
                            var poLeft = windowHeight / screenHeight * layoutPo[0];
                            var poRight = windowHeight / screenHeight * layoutPo[1];
                            if(screen.real) {
                                poLeft = layoutPo[0];
                                poRight = layoutPo[1];
                            }
                            $layoutItem.css({
                                left: poLeft + 'px',
                                top: poRight + 'px'
                            });
                        }
                        var layoutSize = layout[i].size;
                        if(layoutSize && layoutSize.length) {
                            var sizeWidth = windowHeight / screenHeight * layoutSize[0];
                            var sizeHeight = windowHeight / screenHeight * layoutSize[1];
                            if(screen.real) {
                                sizeWidth = layoutSize[0];
                                sizeHeight = layoutSize[1];
                            }
                            $layoutItem.css({
                                width: sizeWidth + 'px',
                                height: sizeHeight + 'px'
                            });
                        }
                    }
                }
            }
        }
    };

    /** 图表库 */
    xc.charts = {

    };
    window.$xc = xc.tools;
    window.$xc.charts = xc.charts;
}(window, jQuery));

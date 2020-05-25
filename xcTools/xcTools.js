(function(window, $, Highcharts){
    "use strict";
    var xc = {};
    /** 工具库 */
    xc.tools = {
        /**
         * @action getCurrentUrl 获取当前js路径
         * @return  string 路径
         */
        getCurrentUrl: function(){
            var stack;
            try{
                null.split();
            }catch(e){
                stack = e.stack;
            }
            var rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/;
            var absPath = rExtractUri.exec(stack);
            absPath = absPath[0].split('/');
            absPath.splice(absPath.length - 1, 1);
            absPath = absPath.join('/');
            return absPath;
        },
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
                var str = '';
                str += '<div class="xc-loading">';
                str += '	<div class="xc-con">';
                str += '		<svg version="1.1"xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 80.000000 80.000000">';
                str += '		    <circle cx="47" cy="10" r="10" stroke="none" fill="#4FC2BF" opacity="1"/>';
                str += '		    <circle cx="23" cy="16" r="9" stroke="none" fill="#4FC2BF" opacity="0.9"/>';
                str += '		    <circle cx="10" cy="33" r="8" stroke="none" fill="#4FC2BF" opacity="0.8"/>';
                str += '		    <circle cx="10" cy="51" r="7" stroke="none" fill="#4FC2BF" opacity="0.7"/>';
                str += '		    <circle cx="19" cy="66" r="6" stroke="none" fill="#4FC2BF" opacity="0.6"/>';
                str += '		    <circle cx="32" cy="74" r="5" stroke="none" fill="#4FC2BF" opacity="0.5"/>';
                str += '		    <circle cx="46" cy="75" r="4" stroke="none" fill="#4FC2BF" opacity="0.4"/>';
                str += '		    <circle cx="57" cy="72" r="3" stroke="none" fill="#4FC2BF" opacity="0.3"/>';
                str += '		    <circle cx="67" cy="65" r="2" stroke="none" fill="#4FC2BF" opacity="0.2"/>';
                str += '		    <circle cx="71" cy="57" r="1" stroke="none" fill="#4FC2BF" opacity="0.1"/>';
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
            }else{
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
            }else{
                $loading.removeClass('xc-loading-bg-color');
            }
            if(style.fillColor){
                $loading.find('circle').attr('fill', style.fillColor);
            }
        },
        ajaxCount: 0,
        /**
         * @action ajaxPost ajax POST请求
         * @param url: 请求地址, 必须
         * @param params: 请求参数, 必须
         * @param success: 请求成功返回方法, 可选
         * @param error: 请求失败返回方法, 可选
         * @param async: 请求方式, 默认true异步, 可选同步
         * @param header: 请求头添加参数, 可选
         */
        ajaxPost: function(url, params, success, error, async, header){
            this.ajaxAction(url, JSON.stringify(params), success, error, async, header, 'POST');
        },
        /**
         * @action ajaxGet ajax GET请求
         * @param url: 请求地址, 必须
         * @param params: 请求参数, 必须
         * @param success: 请求成功返回方法, 可选
         * @param error: 请求失败返回方法, 可选
         * @param async: 请求方式, 默认true异步, 可选同步
         * @param header: 请求头添加参数, 可选
         */
        ajaxGet: function(url, params, success, error, async, header){
            this.ajaxAction(url, params, success, error, async, header, 'GET');
        },
        ajaxAction: function(url, params, success, error, async, header, type){
            var _this = this;
            _this.ajaxLoading('open');
            $.ajax({
                url: url,
                type: type,
                timeout: 60000,
                dataType: 'json',
                data: params,
                async: async !== false,
                contentType: 'application/json',
                beforeSend: function (XHR) {
                    if(header){
                        for(var key in header){
                            XHR.setRequestHeader('key', header[key]);
                        }
                    }
                },
                success: function(obj){
                    _this.ajaxLoading('close');
                    if(success) success(obj);
                },
                error: function(XHR, status){
                    _this.ajaxLoading('close');
                    if(error) error(XHR, status);
                }
            });
        },
        ajaxLoading: function(o) {
            var _this = this;
            if(o == 'open'){
                _this.ajaxCount ++;
                $xc.loading('open');
            }else if('close'){
                _this.ajaxCount --;
                if(_this.ajaxCount <= 0){
                    _this.ajaxCount = 0;
                    $xc.loading('close');
                }
            }
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
         * @action fitBigScreen 大屏自适应
         * @param v: 绑定元素id
         * @param screen: 原尺寸, 必须
         * @param screen.width: 原尺寸宽度, 必须
         * @param screen.height: 原尺寸高度, 必须
         * @param screen.scale: 比例尺, 默认'real'原尺寸, 可选'equal'等比缩放, 'stretch'铺满屏幕
         */
        fitBigScreen: function(v, screen){
            var _this = this;
            var windowHeight = $(window).height();
            $('body').css('min-height', windowHeight);
            _this.countBigScreen(v, screen);
            $(window).resize(function(){
                if(windowHeight < $(this).height()) {
                    windowHeight = $(this).height();
                    $('body').css('min-height', windowHeight);
                    _this.countBigScreen(v, screen);
                }
            });
        },
        countBigScreen: function (v, screen) {
            if(v && screen){
                var windowWidth = $(window).width();
                var windowHeight = $(window).height();
                $('#' + v).css({
                    display: 'block',
                    overflow: 'hidden',
                    position: 'relative',
                    width: screen.width,
                    height: screen.height
                }).parent().css({
                    overflow: 'auto'
                });
                var finalWidth = screen.width;
                var finalHeight = screen.height;
                if(screen.scale == 'equal'){
                    if(windowWidth / windowHeight > screen.width / screen.height){
                        finalHeight = windowHeight;
                        finalWidth = windowHeight / screen.height * screen.width;
                    }else{
                        finalWidth = windowWidth;
                        finalHeight = windowWidth / screen.width * screen.height;

                    }
                }else if(screen.scale == 'stretch'){
                    finalWidth = windowWidth;
                    finalHeight = windowHeight;
                }
                if(screen.scale == 'equal' || screen.scale == 'stretch') {
                    var scaleX = finalWidth / screen.width;
                    var scaleY = finalHeight / screen.height;
                    var translateX = (windowWidth -  screen.width) / 2 + 'px';
                    var translateY = (windowHeight - screen.height) / 2 + 'px';

                    var parentPo = $('#' + v).parent().css('position');
                    if(parentPo != 'absolute' && parentPo != 'fixed'){
                        $('#' + v).parent().css({
                            position: 'relative',
                            overflow: 'hidden'
                        });
                    }
                    $('#' + v).css({
                        position: 'absolute',
                        top: translateY,
                        left: translateX,
                        transform: 'scale('+ scaleX +', '+ scaleY +')',
                    });
                }
            }
        }
    };
    /** 图表库 */
    xc.charts = {
        

    };
    /** 地图 */
    xc.maps = {
        /**
         * @action art 绘制地图
         * @param v: 绑定元素id, 必须
         * @param name: 地图区域名称, 必须
         * @param style: 地图样式控制, 可选
         * @param style.fill: 地图块背景颜色,默认透明, 可选
         * @param style.hover: 地图块鼠标移上显示颜色, 可选
         * @param style.click: 地图块鼠标点击显示颜色, 可选
         * @param style.bg: 地图整体背景是否显示, 默认不显示, 一般用于3D地图, 可选
         * @param style.text: 地图地域名称是否显示, 默认不显示, 可选
         */
        art: function(v, name, style, click){
            var _this = this;
            if(v && name) {
                style = style || {};
                var artStrs = _this[name](name, style) || '';
                $('#' + v).html(artStrs);
                var outerWidth = $('#' + v).width();
                var outerHeight = $('#' + v).height();

                var realSize = $('#' + v + ' svg')[0].viewBox.animVal;
                var realWidth = realSize.width;
                var realHeight = realSize.height;

                var mapWidth = outerWidth;
                var mapHeight = outerWidth / realWidth * realHeight;
                if(outerWidth / outerHeight > realWidth / realHeight) {
                    mapHeight = outerHeight;
                    mapWidth = outerHeight / realHeight * realWidth;
                }
                var mapLeft = (outerWidth - mapWidth) / 2;
                var mapTop = (outerHeight - mapHeight) / 2;
                $('#' + v + ' .xc-map').css({
                    width: mapWidth + 'px',
                    height: mapHeight + 'px',
                    left: mapLeft + 'px',
                    top: mapTop + 'px'
                });
                if(style.hover){
                    $('#' + v + ' .xc-map svg path').hover(function(){
                        $(this).attr('fill', style.hover).attr('xc-hover', true);
                    }, function(){
                        $(this).removeAttr('xc-hover');
                        if(!$(this).attr('xc-click')) $(this).removeAttr('fill');
                    });
                }
                if(click && (style.click || style.hover)){
                    $('#' + v + ' .xc-map svg path').click(function(){
                        var id = $(this).attr('id');
                        var name = $(this).attr('name');
                        $('#' + v + ' .xc-map svg path').removeAttr('fill').removeAttr('xc-click');
                        $(this).attr('fill', (style.click || style.hover)).attr('xc-click', true);
                        click(id, name);
                    });
                }
            };
        },
        Licheng: function(name, style){
            var getCurrentUrl = xc.tools.getCurrentUrl();
            var bg = getCurrentUrl + '/map/' + name + '-bg.png';
            var text = getCurrentUrl + '/map/' + name + '-text.png';
            var fill = style.fill || 'rgba(0,0,0,0)';
            var map = '';
            map += '<div class="xc-map">';
            if(style.bg) map += '    <img class="xc-map-before" src="'+ bg +'">';
            map += '    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 711 598" preserveAspectRatio="xMidYMid meet">';
            map += '        <g transform="translate(0.000000,598.000000) scale(0.100000,-0.100000)" fill="'+ fill +'" stroke="none">';
            map += '            <path id="Licheng-1001" name="唐王街道" d="M4395 5870 c-3 -5 -14 -10 -23 -10 -19 0 -122 -67 -136 -88 -19 -31 -94 -92 -112 -92 -8 0 -19 -11 -24 -25 -5 -14 -14 -25 -20 -25 -6 0 -25 -16 -42 -36 -17 -19 -58 -49 -91 -65 -54 -28 -59 -33 -54 -57 10 -48 61 -152 75 -152 19 0 92 -61 92 -76 0 -7 -8 -18 -17 -24 -14 -9 -9 -10 27 -6 31 3 49 11 59 25 17 26 25 26 61 -1 31 -23 40 -64 19 -85 -14 -14 9 -73 27 -73 10 0 54 -70 54 -85 0 -2 -15 -7 -34 -11 -19 -3 -37 -12 -40 -20 -3 -8 -15 -14 -27 -14 -13 0 -39 -18 -63 -44 -23 -23 -49 -46 -60 -50 -16 -5 -17 -13 -12 -49 14 -87 26 -118 52 -127 13 -5 27 -17 31 -26 4 -12 14 -14 39 -9 25 4 38 1 51 -12 18 -18 70 -25 158 -22 131 6 129 6 145 -26 32 -62 34 -64 63 -58 20 4 32 14 39 34 7 22 16 29 35 29 35 0 86 -33 123 -81 27 -33 37 -39 70 -39 39 0 48 8 86 75 8 13 21 19 37 18 22 -1 25 3 30 39 3 22 8 42 10 45 3 2 22 0 44 -6 21 -6 57 -11 80 -11 38 0 41 2 36 23 -4 12 -14 34 -24 48 -22 32 -96 49 -211 49 -74 0 -79 1 -90 25 -20 45 2 71 80 95 66 20 68 22 64 49 -2 16 1 32 7 35 6 4 11 19 11 34 0 15 6 47 14 72 13 45 13 45 61 46 61 1 71 17 49 76 -27 73 -37 90 -103 185 l-63 92 -71 16 c-40 9 -77 21 -84 27 -16 13 -17 50 -1 66 9 9 4 9 -20 0 -29 -11 -34 -10 -60 15 -15 15 -38 27 -50 27 -12 0 -32 14 -46 33 -22 29 -26 45 -26 100 0 37 -1 67 -3 67 -2 0 -27 -7 -56 -16 -29 -8 -58 -13 -65 -11 -6 3 -22 25 -35 51 -23 44 -51 60 -66 36z"/>';
            map += '            <path id="Licheng-1002" name="董家街道" d="M5037 4614 c-4 -4 -7 -22 -7 -41 0 -30 -3 -33 -30 -33 -16 0 -30 -5 -30 -11 0 -6 -12 -26 -26 -45 -25 -32 -30 -34 -85 -34 -56 0 -60 2 -81 34 -19 28 -93 86 -111 86 -3 0 -10 -13 -15 -29 -9 -25 -17 -31 -58 -37 -27 -4 -49 -3 -51 2 -2 5 -14 27 -26 49 -19 34 -28 40 -52 38 -43 -3 -135 -4 -175 -2 -24 2 -58 -8 -100 -29 -46 -24 -72 -31 -92 -27 -25 6 -28 4 -28 -17 0 -30 -17 -48 -46 -48 -12 0 -36 -11 -52 -25 -34 -28 -87 -33 -117 -11 -13 9 -37 12 -82 8 -52 -4 -67 -1 -83 13 -14 12 -38 19 -75 20 -64 2 -83 -12 -65 -45 20 -38 8 -63 -44 -90 -38 -19 -51 -33 -60 -60 -9 -29 -17 -36 -51 -42 -34 -7 -44 -15 -66 -56 -35 -63 -43 -99 -28 -134 12 -28 15 -29 55 -23 l43 6 31 -62 c20 -38 30 -71 27 -86 -4 -19 1 -27 22 -34 14 -6 39 -17 55 -25 16 -8 47 -14 69 -14 35 0 46 -6 83 -45 60 -65 100 -57 113 23 5 28 11 38 29 40 13 2 25 -3 28 -12 9 -23 58 -10 134 35 l65 38 100 -6 c55 -3 112 -12 127 -19 30 -16 62 -8 54 13 -3 7 -9 49 -12 93 l-7 79 27 11 c15 5 32 7 37 4 23 -14 58 7 69 41 8 24 19 37 36 41 27 7 54 -10 54 -33 0 -13 10 -14 54 -9 41 6 62 3 85 -8 70 -37 104 -10 137 107 20 68 37 81 101 71 36 -5 49 -13 62 -35 24 -43 66 -40 85 6 20 47 56 50 56 5 0 -42 38 -78 90 -86 41 -7 60 -26 60 -61 0 -11 6 -28 14 -39 12 -15 17 -17 27 -6 7 6 22 12 33 12 11 0 27 6 35 13 24 20 136 67 159 67 44 0 40 28 -11 81 -54 56 -57 81 -12 90 l30 7 -28 1 c-33 1 -116 79 -136 129 -8 19 -21 32 -31 32 -9 0 -28 9 -41 19 -14 10 -36 21 -49 23 -14 1 -29 13 -35 24 -23 46 -36 54 -84 52 -25 -1 -57 1 -71 5 -14 5 -29 5 -33 1z"/>';
            map += '            <path id="Licheng-1003" name="" d="M2837 4578 c-26 -19 -37 -20 -114 -14 -76 6 -88 4 -114 -15 -16 -11 -29 -29 -29 -39 0 -11 -6 -23 -12 -27 -7 -4 -13 -21 -13 -38 0 -26 -7 -33 -45 -52 -25 -13 -56 -22 -70 -22 -54 2 -70 -1 -70 -16 0 -8 -3 -14 -7 -13 -5 1 -17 -3 -28 -9 -25 -14 -184 -53 -215 -53 -12 0 -40 16 -62 34 -37 32 -42 34 -62 21 -12 -8 -67 -24 -121 -35 -121 -24 -150 -35 -169 -65 -8 -12 -40 -39 -71 -60 -61 -40 -61 -38 -38 -132 4 -17 -4 -27 -36 -49 -39 -26 -41 -29 -41 -79 0 -29 7 -72 16 -96 8 -24 18 -77 21 -117 5 -67 7 -71 23 -57 22 20 37 19 49 -2 8 -16 13 -15 48 10 21 15 56 45 78 67 38 39 77 52 90 30 21 -33 111 32 160 116 14 24 32 44 39 44 18 0 66 -64 66 -88 0 -11 6 -22 13 -25 9 -3 8 -12 -5 -35 -10 -16 -18 -32 -18 -35 0 -3 16 -14 35 -26 30 -17 35 -26 35 -56 0 -33 2 -35 21 -25 11 7 33 37 48 68 14 31 46 89 70 129 39 65 47 73 91 88 65 22 150 109 143 147 -7 39 33 62 95 55 47 -6 48 -5 96 49 26 30 62 62 79 71 18 8 45 26 60 39 16 14 42 24 58 24 52 0 98 35 99 73 0 10 -15 37 -32 60 -35 44 -41 54 -85 129 -16 27 -32 48 -38 48 -5 0 -23 -10 -38 -22z"/>';
            map += '            <path id="Licheng-1004" name="鲍山街道" d="M3419 4533 c-30 -5 -52 -26 -78 -74 -25 -47 -77 -86 -135 -101 -47 -12 -48 -12 -72 15 -36 42 -84 34 -84 -15 0 -42 -48 -88 -91 -88 -21 0 -52 -13 -88 -37 -113 -75 -124 -98 -70 -146 29 -26 31 -31 25 -76 -5 -37 -2 -59 14 -94 26 -58 42 -67 114 -64 62 2 86 -14 86 -57 -1 -24 -52 -61 -99 -71 -38 -8 -38 -13 -6 -48 18 -18 28 -43 32 -76 5 -46 8 -50 44 -64 39 -15 39 -15 46 11 13 55 42 88 86 102 23 7 52 17 65 23 19 9 27 6 52 -18 36 -34 36 -38 8 -78 -19 -27 -22 -42 -19 -111 2 -58 7 -83 18 -92 11 -8 14 -19 9 -39 l-7 -28 -104 5 c-97 5 -106 4 -139 -18 -19 -13 -48 -24 -63 -24 -15 0 -53 -9 -83 -19 l-55 -19 37 -16 c28 -12 46 -31 69 -71 17 -30 34 -55 38 -55 4 0 14 19 21 43 23 71 33 77 121 77 68 0 81 -3 91 -20 7 -11 17 -20 22 -20 5 0 20 -10 33 -22 20 -18 26 -20 48 -10 17 8 54 10 109 6 80 -6 84 -6 96 16 10 18 9 29 -6 61 -14 31 -15 44 -6 64 10 22 17 25 59 22 41 -2 48 1 51 18 11 71 18 75 134 80 77 3 98 22 98 85 0 52 11 71 54 93 l30 15 -34 31 c-44 39 -90 61 -149 70 -33 4 -49 12 -55 27 -14 31 -71 67 -95 59 -12 -4 -44 6 -85 25 -36 16 -70 30 -76 30 -12 0 -13 20 -1 39 6 10 0 32 -17 68 -26 53 -27 54 -63 48 -41 -7 -65 9 -75 51 -9 36 4 105 27 144 12 18 22 50 24 69 3 27 13 44 39 67 38 32 45 60 24 93 -10 17 -6 25 34 64 26 25 53 47 60 50 15 6 -24 6 -63 0z"/>';
            map += '            <path id="Licheng-1005" name="郭店街道" d="M4866 4246 c-8 -6 -23 -40 -35 -76 -32 -97 -43 -110 -100 -110 -26 0 -52 5 -59 12 -8 8 -38 11 -81 10 -66 -3 -69 -2 -75 22 -8 34 -32 24 -46 -20 -12 -35 -24 -41 -90 -46 -33 -3 -35 -5 -35 -38 1 -19 5 -63 9 -97 8 -62 8 -62 -20 -69 -16 -4 -40 -2 -58 6 -17 7 -71 16 -121 20 l-90 6 -54 -34 c-30 -19 -71 -39 -90 -44 -80 -21 -81 -21 -81 -4 0 9 -4 16 -10 16 -5 0 -10 -12 -10 -26 0 -14 -4 -33 -9 -43 -8 -15 -3 -21 27 -34 45 -21 73 -44 96 -78 13 -21 27 -28 64 -32 26 -2 54 -8 63 -11 12 -5 18 -1 22 14 8 30 51 24 55 -8 3 -18 8 -22 25 -16 12 3 29 13 38 20 8 8 20 14 25 14 19 0 74 59 74 79 0 11 6 24 14 28 8 4 15 17 18 28 3 19 11 20 118 21 67 0 127 5 144 12 26 11 28 15 20 50 -17 84 -14 91 46 114 30 11 81 28 113 37 56 15 59 15 72 -3 13 -17 19 -18 58 -7 35 10 56 10 113 -2 38 -8 77 -18 88 -23 17 -7 18 -4 12 38 -6 41 -5 47 19 62 15 10 34 15 42 12 24 -9 73 16 73 37 0 36 -19 55 -61 62 -49 8 -89 46 -90 84 0 26 -1 25 -16 -6 -15 -30 -21 -33 -62 -33 -40 0 -48 4 -62 29 -18 31 -69 46 -93 27z"/>';
            map += '            <path id="Licheng-1006" name="王舍人街道" d="M2732 4113 c-19 -34 -44 -44 -80 -31 -45 17 -82 -2 -82 -42 0 -44 -69 -116 -146 -151 -56 -26 -65 -34 -100 -96 -21 -37 -50 -91 -64 -120 -14 -29 -39 -63 -57 -76 l-32 -24 44 -43 c54 -53 58 -83 15 -105 -16 -8 -40 -15 -53 -15 -16 0 -28 -9 -35 -25 -9 -20 -18 -25 -39 -23 -25 3 -29 -2 -43 -46 -17 -51 -37 -67 -102 -81 -26 -5 -28 -9 -28 -53 0 -52 21 -75 58 -65 14 3 29 -3 46 -20 43 -43 59 -48 71 -24 15 31 133 89 167 83 15 -3 30 -1 34 5 3 6 17 8 31 4 14 -3 31 -1 38 5 8 6 52 12 99 14 47 2 91 8 98 13 7 6 38 19 68 28 30 10 69 24 85 32 18 8 43 11 61 7 19 -3 55 1 87 10 30 9 65 16 76 16 12 0 39 11 60 26 37 24 42 25 140 18 90 -6 101 -5 101 10 0 9 -4 16 -9 16 -4 0 -11 46 -14 102 -5 91 -3 105 14 127 18 22 18 26 4 41 -12 14 -24 16 -48 10 -69 -15 -91 -33 -114 -90 -12 -30 -25 -56 -30 -57 -5 -2 -29 7 -53 20 -41 21 -46 28 -53 72 -5 31 -19 61 -38 82 -40 46 -38 69 5 76 19 3 51 16 70 29 27 19 32 27 25 41 -8 13 -24 17 -70 17 -33 0 -68 4 -78 10 -31 16 -64 107 -58 159 4 40 2 48 -23 71 -15 14 -30 35 -32 45 -4 19 -5 19 -16 -2z"/>';
            map += '            <path id="Licheng-1007" name="荷花街道" d="M1465 3923 c-16 -13 -53 -35 -82 -48 -43 -19 -55 -31 -72 -68 -15 -32 -28 -47 -48 -52 -15 -3 -44 -21 -64 -40 -24 -21 -52 -35 -80 -40 -45 -8 -63 -24 -86 -78 -11 -24 -10 -30 7 -47 11 -11 27 -20 35 -20 9 0 20 -12 26 -27 6 -16 17 -35 25 -44 13 -15 13 -21 0 -54 -14 -32 -19 -36 -38 -31 -13 4 -36 9 -52 13 -28 6 -29 5 -23 -27 4 -18 7 -43 7 -56 0 -17 6 -24 19 -24 29 0 51 -11 51 -25 0 -43 104 45 115 97 10 45 22 58 56 58 34 0 99 73 99 112 0 27 33 48 76 48 14 0 43 15 64 33 46 37 50 66 23 162 -9 33 -19 88 -22 122 l-6 61 -30 -25z"/>';
            map += '            <path id="Licheng-1008" name="华山街道" d="M2016 3834 c-31 -48 -118 -124 -142 -124 -8 0 -25 7 -37 15 -21 14 -26 12 -81 -39 -32 -30 -73 -62 -93 -72 -33 -18 -35 -18 -48 -1 -8 12 -15 14 -20 8 -3 -6 -15 -11 -25 -11 -11 0 -35 -13 -53 -30 -23 -20 -45 -30 -66 -30 -45 0 -71 -16 -71 -44 0 -41 -68 -116 -105 -116 -24 0 -45 -17 -45 -38 0 -37 -35 -83 -85 -112 -62 -35 -90 -39 -82 -11 5 20 -10 31 -42 31 -14 0 -20 11 -25 53 -3 28 -6 65 -6 81 0 30 3 31 82 11 35 -9 41 14 17 63 -12 25 -32 45 -50 52 -38 16 -47 51 -25 97 9 20 15 37 13 39 -6 6 -152 -24 -181 -37 -37 -17 -126 -128 -127 -159 -2 -42 2 -64 16 -96 15 -32 53 -64 77 -64 7 -1 25 -11 39 -23 24 -20 27 -30 31 -100 3 -74 5 -80 33 -100 50 -37 65 -56 66 -84 0 -26 1 -27 9 -6 5 12 21 30 35 39 22 14 31 15 46 6 16 -10 27 -8 60 9 34 17 53 20 103 15 33 -3 78 -6 98 -6 35 0 39 -3 59 -45 12 -25 25 -48 30 -51 5 -3 9 -16 9 -28 0 -37 22 -49 56 -32 16 8 60 28 98 43 44 18 71 35 76 49 5 12 22 26 39 32 23 8 31 18 37 47 8 43 32 58 85 53 32 -3 39 0 41 17 2 14 10 19 26 18 20 -3 22 1 22 46 0 53 -1 52 67 66 36 7 63 38 63 72 0 28 25 53 55 53 15 0 26 7 30 20 5 14 15 20 38 20 18 0 42 8 55 18 l22 17 -45 45 c-42 41 -45 47 -45 97 0 51 -2 55 -35 74 -27 16 -35 28 -35 49 0 16 4 31 9 34 13 9 -4 71 -26 95 -19 20 -19 20 -47 -25z"/>';
            map += '            <path id="Licheng-1009" name="唐冶街道" d="M4320 3665 c-5 -14 -10 -30 -10 -35 0 -12 -68 -56 -129 -85 -41 -18 -61 -14 -61 15 0 11 -4 20 -10 20 -5 0 -10 -6 -10 -14 0 -24 -15 -27 -60 -11 -110 39 -180 7 -180 -83 0 -70 -19 -84 -125 -91 -46 -4 -88 -11 -94 -16 -5 -6 -11 -26 -13 -45 -3 -35 -3 -35 -57 -38 -52 -3 -53 -4 -46 -30 15 -61 16 -91 5 -112 -11 -21 -17 -22 -103 -18 -114 6 -129 -1 -111 -51 7 -20 13 -54 14 -77 0 -62 64 -116 77 -66 7 28 61 43 132 37 72 -6 94 -17 114 -59 l14 -31 36 37 c32 34 38 36 79 31 23 -3 50 -12 59 -20 14 -12 21 -9 56 27 23 22 48 40 56 40 18 0 77 -59 77 -76 0 -6 9 -19 20 -29 17 -15 39 -19 113 -21 85 -2 128 -10 168 -33 11 -7 32 -2 69 15 44 20 67 24 150 24 74 0 100 4 110 15 11 13 8 15 -16 15 -46 0 -70 33 -134 185 -13 32 -22 75 -27 140 -4 44 -12 69 -31 95 -25 33 -29 54 -22 130 2 24 -41 185 -59 220 -14 26 -40 23 -51 -5z"/>';
            map += '            <path id="Licheng-1010" name="全福街道办事处" d="M1886 3103 c-5 -12 -17 -13 -55 -8 -54 7 -59 4 -76 -55 -7 -24 -18 -36 -35 -40 -14 -3 -30 -17 -37 -30 -8 -17 -34 -34 -80 -53 -37 -15 -81 -35 -96 -43 -34 -17 -73 -18 -82 -3 -5 6 -13 3 -22 -10 -8 -12 -20 -21 -27 -21 -17 0 -76 -60 -76 -77 0 -7 12 -16 28 -19 34 -8 62 -32 62 -54 0 -9 2 -19 5 -22 9 -9 87 22 139 54 35 23 52 29 64 22 11 -7 22 -4 39 12 13 12 41 30 61 40 20 9 62 36 92 60 55 43 100 64 177 84 24 6 51 22 62 36 17 21 26 25 51 19 40 -9 41 18 1 35 -16 6 -39 22 -52 36 -15 16 -34 24 -55 24 -18 0 -35 4 -38 9 -10 16 -45 19 -50 4z"/>';
            map += '            <path id="Licheng-1011" name="东风街道办事处" d="M2045 2950 c-10 -11 -37 -25 -59 -31 -76 -19 -121 -40 -176 -83 -30 -23 -77 -54 -104 -67 -27 -13 -56 -34 -64 -47 -14 -22 -13 -25 20 -60 23 -24 39 -55 47 -87 7 -27 19 -63 27 -80 7 -16 20 -48 27 -70 11 -32 19 -41 41 -43 32 -4 67 23 59 45 -4 9 11 31 41 59 43 42 46 48 46 95 0 56 3 59 73 62 45 2 68 17 26 17 -24 0 -54 60 -64 130 -6 42 -4 47 28 79 31 29 41 33 76 29 l42 -4 -7 31 c-3 16 -8 33 -11 38 -8 14 -50 7 -68 -13z"/>';
            map += '            <path id="Licheng-1012" name="港沟街道" d="M3924 2937 c-27 -29 -62 -57 -73 -57 -4 0 -16 9 -26 20 -24 26 -70 26 -93 -1 -21 -25 -69 -52 -81 -45 -5 3 -14 19 -20 34 -16 37 -44 53 -101 54 -91 2 -118 -21 -104 -89 4 -20 1 -33 -10 -42 -14 -12 -12 -16 18 -32 18 -10 43 -15 54 -12 18 4 25 -3 43 -43 15 -35 34 -57 66 -78 40 -26 44 -31 41 -64 -3 -34 -5 -36 -70 -56 -50 -16 -84 -21 -132 -18 -61 4 -69 8 -106 43 l-40 39 -90 0 c-83 0 -93 2 -113 24 -21 22 -26 23 -84 14 -52 -8 -67 -7 -85 6 -32 23 -39 20 -26 -9 8 -18 19 -25 38 -25 33 0 70 -39 99 -105 12 -27 26 -57 31 -67 20 -36 23 -114 6 -149 -34 -72 -23 -127 56 -274 12 -21 25 -53 29 -70 4 -16 17 -66 29 -110 12 -44 27 -121 34 -172 6 -55 17 -98 27 -110 43 -49 62 -215 33 -280 -17 -39 -46 -60 -97 -74 -32 -8 -37 -13 -32 -30 4 -11 2 -26 -5 -34 -7 -8 -7 -15 -1 -19 5 -4 12 -2 16 4 9 15 41 12 56 -6 7 -8 34 -27 61 -40 26 -13 48 -31 48 -39 0 -9 9 -15 23 -15 33 0 121 -103 152 -178 13 -29 17 -31 33 -21 12 7 27 9 38 4 29 -12 76 -5 93 14 23 26 96 44 121 31 11 -6 20 -17 20 -25 0 -8 8 -19 19 -24 24 -13 51 -71 51 -109 0 -35 26 -102 40 -102 16 0 71 -89 77 -124 3 -21 -1 -45 -12 -67 l-18 -34 24 21 c58 50 103 66 125 44 5 -5 26 -7 47 -3 31 5 39 11 49 40 10 28 24 40 73 63 33 16 77 32 98 36 20 3 40 10 43 15 3 5 27 9 53 9 68 0 96 31 96 108 l0 57 44 22 c24 12 47 24 51 25 4 2 4 46 0 98 -9 104 -5 115 40 125 22 5 30 14 36 38 15 69 96 164 175 206 44 23 47 24 79 8 18 -10 35 -15 37 -13 2 2 6 19 10 39 5 31 0 40 -36 80 -22 24 -41 49 -41 56 0 6 16 11 36 11 43 0 37 15 -11 24 -44 9 -65 30 -65 67 0 24 4 29 24 29 14 0 28 -4 31 -10 3 -5 24 -10 46 -10 24 0 38 4 34 10 -3 5 -18 10 -32 10 -15 0 -42 5 -60 12 -27 10 -33 17 -33 40 0 22 5 28 21 28 36 0 59 19 59 49 0 15 5 42 11 59 21 60 -35 123 -135 153 -38 12 -80 28 -93 38 -30 22 -29 55 2 69 14 6 25 16 25 22 0 6 10 14 21 19 21 7 20 9 -13 29 -20 12 -49 22 -66 22 -26 0 -33 5 -38 28 -12 54 -15 60 -35 65 -17 5 -20 1 -19 -21 4 -51 0 -62 -19 -62 -17 0 -51 -47 -51 -72 0 -18 27 -7 40 17 25 47 50 22 50 -52 0 -25 -7 -35 -36 -52 -19 -12 -43 -21 -52 -21 -10 0 -28 -19 -42 -44 -23 -43 -23 -46 -6 -65 10 -11 16 -28 14 -38 -3 -15 -12 -18 -63 -14 -51 3 -64 7 -85 32 -14 15 -36 31 -50 34 -22 5 -30 -1 -58 -40 -48 -69 -110 -84 -166 -42 -17 13 -39 26 -48 30 -9 3 -18 16 -20 28 -4 26 -16 33 -88 49 -79 18 -82 22 -74 99 3 36 10 71 14 76 4 6 10 35 13 65 3 30 9 81 12 112 l6 57 -33 3 c-29 3 -33 6 -33 32 0 16 7 32 15 36 8 4 29 15 47 24 17 9 40 16 51 16 27 0 32 33 34 225 2 165 -3 192 -37 205 -22 8 -34 40 -38 103 -2 33 -15 34 -43 4z"/>';
            map += '            <path id="Licheng-1013" name="彩石街道" d="M4872 2884 l-30 -59 -46 1 -46 0 6 -40 c3 -23 10 -54 15 -70 17 -55 11 -96 -21 -133 -35 -39 -37 -66 -15 -191 11 -61 12 -95 5 -127 -5 -24 -8 -50 -6 -57 2 -7 7 -25 10 -40 5 -23 12 -28 37 -28 34 0 129 -57 129 -77 0 -8 -12 -13 -30 -13 -19 0 -33 -7 -40 -19 -5 -11 -19 -23 -30 -26 -20 -6 -20 -7 4 -26 14 -11 55 -28 91 -38 74 -21 96 -37 131 -97 21 -36 23 -46 13 -70 -6 -16 -14 -49 -18 -74 -6 -42 -9 -46 -44 -54 -20 -5 -37 -13 -37 -17 0 -9 59 -27 100 -31 20 -2 26 -9 28 -35 l3 -32 -58 6 c-32 3 -64 11 -72 17 -12 9 -13 8 -8 -7 4 -10 7 -20 7 -23 0 -2 25 -11 55 -19 42 -13 55 -21 55 -36 0 -11 -11 -24 -24 -31 l-25 -11 25 -32 c20 -26 24 -43 23 -84 -1 -29 2 -56 7 -61 17 -17 89 -14 115 3 26 19 90 22 118 7 10 -5 22 -25 25 -43 8 -42 33 -56 111 -61 43 -3 68 0 87 12 25 15 30 14 93 -14 74 -33 176 -118 195 -164 9 -23 19 -30 39 -30 15 0 32 5 38 11 20 20 70 0 100 -39 33 -44 53 -80 53 -97 0 -8 16 -12 48 -12 26 0 69 -1 96 -2 26 -2 53 2 59 8 13 13 50 15 61 4 4 -5 22 -9 39 -10 96 -7 107 -5 124 16 22 26 142 48 173 31 32 -17 42 -12 26 12 -22 30 -20 42 9 76 27 32 32 60 21 104 -7 22 -4 28 20 40 29 14 41 40 43 95 1 22 8 36 22 44 21 11 21 11 -8 29 -37 22 -96 112 -91 141 2 14 14 25 35 33 18 6 57 35 87 64 l56 53 -25 37 c-14 20 -28 43 -31 50 -10 20 13 62 33 62 27 1 59 32 67 65 4 17 14 37 22 46 33 37 -12 106 -83 129 -44 14 -52 21 -91 88 -46 76 -48 102 -10 102 13 0 36 7 52 15 15 8 34 15 41 15 25 0 -17 97 -98 223 -21 32 -37 61 -37 66 0 5 -6 14 -14 20 -15 12 -76 132 -76 149 0 14 -152 113 -169 110 -21 -4 -73 -110 -61 -122 13 -13 13 -83 0 -91 -5 -3 -10 -16 -11 -28 0 -12 -5 -38 -12 -57 l-12 -35 -120 0 c-121 -1 -155 8 -155 40 0 7 -19 29 -41 50 -40 36 -44 37 -93 30 -138 -18 -127 -19 -217 25 -93 46 -146 65 -201 75 -23 5 -43 16 -53 31 -13 21 -23 24 -73 24 -31 0 -70 -7 -86 -15 -15 -8 -33 -15 -38 -15 -6 0 -44 27 -85 60 -41 33 -83 60 -93 60 -25 0 -40 29 -40 79 0 33 -5 43 -31 62 -17 12 -50 24 -73 26 l-43 5 -31 -58z"/>';
            map += '            <path id="Licheng-1014" name="洪家楼街道办事处" d="M1540 2695 c-18 -13 -58 -32 -89 -41 l-56 -16 43 -36 c23 -21 42 -41 42 -45 0 -4 7 -18 16 -32 l15 -23 53 18 c125 43 139 64 82 119 -19 18 -37 44 -40 57 -8 30 -24 30 -66 -1z"/>';
            map += '            <path id="Licheng-1015" name="山大路街道办事处" d="M1609 2512 c-36 -15 -78 -35 -92 -44 -14 -10 -33 -18 -42 -18 -8 0 -15 -3 -15 -7 1 -13 70 -83 82 -83 6 0 31 9 55 21 40 19 45 20 74 5 18 -9 43 -16 57 -16 21 0 23 3 18 28 -4 15 -16 44 -27 65 -10 21 -19 46 -19 57 0 25 -10 24 -91 -8z"/>';
            map += '        </g>';
            map += '    </svg>';
            if(style.text) map += '    <img class="xc-map-after" src="'+ text +'">';
            map += '</div>';
            return map;
        }
    };
    window.$xc = xc.tools;
    window.$xc.charts = xc.charts;
    window.$xc.maps = xc.maps;
}(window, jQuery, Highcharts));

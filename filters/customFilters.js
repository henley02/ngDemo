/**
 * Created by ־ǿ on 2016/4/20.
 */
angular.module("sportsStore")
    .filter("unique", function () {
        return function (data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var results = [];
                var keys = {};
                for (var i = 0; i < data.length; i++) {
                    var val = data[i][propertyName];
                    //console.log(keys)
                    // console.log(results)
                    /*if (angular.isUndefined(keys[val])) {
                     keys[val] = true;
                     results.push(val);
                     }*/
                    if (!keys[val]) {
                        results.push(val);
                        keys[val] = true;
                    }
                }
                return results;
            } else {
                return data;
            }
        }
    })
    .filter("range", function ($filter) {
        return function (data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                } else {
                    return $filter("limitTo")(data.splice(start_index), size);
                }
            }
            else {
                return data;
            }
        }
    })
    .filter("pageCount", function () {
        return function (data, size) {
            if (angular.isArray(data)) {
                var result = [];
                for (var i = 0; i < Math.ceil(data.length / size); i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        }
    })
    //获取url参数
    .factory('getParamsCode', [function () {
        return function (name) {
            var search = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[1].split("&") : [],
                i = 0, len = search.length,
                params = {}, pos;

            for (; i < len; i++) {
                pos = search[i].indexOf("=");
                if (pos > 0) {
                    params[search[i].substring(0, pos)] = decodeURIComponent(search[i].substring(pos + 1));
                }
            }
            return params[name] ? params[name] : undefined;
        }
    }])
    //获取浏览器类型
    .service('browser', [function () {
        var u = navigator.userAgent.toLowerCase();
        return {
            txt: u, // 浏览器版本信息
            version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
            msie: /msie/.test(u) && !/opera/.test(u), // IE内核
            mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
            safari: /safari/.test(u) && !/chrome/.test(u), //是否为safair
            chrome: /chrome/.test(u), //是否为chrome
            opera: /opera/.test(u), //是否为oprea
            presto: u.indexOf('presto/') > -1, //opera内核
            webKit: u.indexOf('applewebkit/') > -1, //苹果、谷歌内核
            gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //火狐内核
            mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
            android: u.indexOf('android') > -1, //android终端
            iPhone: u.indexOf('iphone') > -1, //是否为iPhone
            iPad: u.indexOf('ipad') > -1, //是否iPad
            weixin: /micromessenger/.test(u), //微信
            QQBrowse: u.indexOf(' QQ') > -1 || u.indexOf(' qq') > -1,
            webApp: !!u.match(/applewebkit.*mobile.*/) && u.indexOf('safari/') == -1 //是否web应该程序，没有头部与底部
        };
    }])
    .directive('onLastRepeat', function ($timeout) {
        return function (scope, element, attrs) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                }, 100);
            }
        };
    })
    //下拉加载
    .factory('dropDown', [function () {
        return function (callback) {

            window.onscroll = function () {

                var Allheight = document.body.scrollHeight,
                    windowHeight = window.innerHeight,
                    scroolTop = document.body.scrollTop;

                if ((scroolTop + 10) >= Allheight - windowHeight) {

                    if (callback)
                        callback();
                }

            };

        };
    }])
    .filter('timeFormat', function () {
        return function (value, format) {
            var value = new Date(value);
            var format = format || 'yyyy-MM-dd hh:mm:ss';
            var args = {
                "M+": value.getMonth() + 1,
                "d+": value.getDate(),
                "h+": value.getHours(),
                "m+": value.getMinutes(),
                "s+": value.getSeconds(),
                "q+": Math.floor((value.getMonth() + 3) / 3),  //quarter
                "S": value.getMilliseconds()
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var i in args) {
                var n = args[i];
                if (new RegExp("(" + i + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
            }
            return format;
        }
    });
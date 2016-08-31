/**
 * Created by jdd on 2016/8/31.
 */
angular.module("customServices", []).service("logService", function () {
    var messageCount = 0;
    return {
        log: function (msg) {
            console.log("(LOG+" + messageCount++ + ")" + msg);
        }
    }
})
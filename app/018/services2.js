/**
 * Created by jdd on 2016/8/31.
 */
angular.module("customServices", []).provider("logService", function () {
    return {
        $get: function () {
            return {
                messageCount: 0,
                log: function (msg) {
                    console.log("(LOG+" + this.messageCount++ + ")" + msg);
                }
            }
        }
    }
})
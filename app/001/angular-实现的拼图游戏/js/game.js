var app = angular.module("app", [])
app.controller("GameCtrl", function($scope, $timeout, $interval) {
	//移动块儿
	$scope.move = function(p, flag) {
		//判断点击块儿旁边是否有空白块儿 ,算法是 两者的x坐标与y坐标总体相差 1
		if (1 == (Math.abs(p.x - $scope.empty.x) + Math.abs(p.y - $scope.empty.y))) {
			//调换两者的坐标
			var x = p.x;
			var y = p.y;
			var index = p.index;
			p.x = $scope.empty.x;
			p.y = $scope.empty.y;
			p.index = $scope.empty.index;
			$scope.empty.x = x;
			$scope.empty.y = y;
			$scope.empty.index = index;
			if (flag) {
				//						var s = $("#sound")[0];
				//						s.play();
			}
			if (flag && $scope.valid()) {
				if (interval != null)
					$interval.cancel(interval);
				$scope.showOriginal = true;
				mui.alert("拼图成功! 用时" + $scope.second + "秒");
			};
		}
	}
	var interval = null;
	$scope.restart = function() {
		var data = [];
		$scope.showOriginal = false;
		$scope.second = 0;
		if (interval != null)
			$interval.cancel(interval);
		interval = $interval(function() {
			$scope.second++;
		}, 1000);
		//初始化坐标
		$scope.empty = {
			x: 2,
			y: 2,
			index: 8
		};
		for (var i = 0; i < 8; i++) {
			data.push({
				xx: i % 3,
				yy: (Math.floor(i / 3)),
				index: i,
				x: i % 3,
				y: (Math.floor(i / 3))
			});
		}
		//console.log(data)
		//随机打乱图片200 次
		$scope.data = data;
		for (var i = 0; i < 200; i++) {
			$scope.move($scope.data[Math.floor(Math.random() * $scope.data.length)], false);
		}
		$scope.original = function() {
				$scope.showOriginal = true;
				$timeout(function() {
					$scope.showOriginal = false;
				}, 3000)
			}
			//随机生成一个背景
		var img = Math.ceil(Math.random() * 5);
		$scope.bg = {
			"background-image": "url(img/img" + img + ".jpg)"
		};
	}
	$scope.valid = function() {
		for (var i = 0; i < $scope.data.length; i++) {
			try {
				if (i < $scope.data.length - 1) {
					//计算坐标, 如果顺序则继续验证, 否则返回错误, 直到全部验证完毕返回正确
					if (($scope.data[i].index + 1) != $scope.data[i + 1].index) {
						return false;
					}
				}
			} catch (e) {
				return false;
			}
		}
		return true;
	}
	$scope.restart();
})
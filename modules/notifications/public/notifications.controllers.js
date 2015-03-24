'use strict';
angular.module('atwork.notifications')
.controller('notificationsCtrl', [
  '$scope',
  '$rootScope',
	'appLocation',
	'appUsers',
	'appNotification',
	'appWebSocket',
  'appNotificationText',
	function($scope, $rootScope, appLocation, appUsers, appNotification, appWebSocket, appNotificationText) {
    /**
     * Initialize the defaults
     */
    $scope.notificationShown = false;
    $scope.notificationCount = 0;
    $scope.items = [];

    /**
     * The event will be broadcasted when new notifications are received
     */
    $rootScope.$on('notification', function(e, data) {
      $scope.notificationCount = data.unread;
    });

    /**
     * Hide or show notifications box
     * @param  {Object} $event 
     * @return {Void}        
     */
		$scope.showUserNotifications = function($event) {
		  $scope.notificationShown = !$scope.notificationShown;
		};

    $scope.markRead = function (item) {
      var record = appUsers.notifications.get({notificationId: item._id}, function () {
        record.res.notifications.map(function (item) {
          item.display = appNotificationText(item);
        });
        $scope.items = record.res.notifications;
        $scope.notificationCount = record.res.notifications.length;
      });
    };

    /**
     * Get notifications 
     * @return {Void}
     */
    $scope.updateNotifications = function () {
      var record = appUsers.notifications.get({}, function () {
        if (record.res.notifications) {
          record.res.notifications.map(function (item) {
            item.display = appNotificationText(item);
          });
        }
        $scope.items = record.res.notifications;
        $scope.notificationCount = record.res.notifications ? record.res.notifications.length : 0;
      });
    };

    /**
     * Get initial notifications on load
     */
    $scope.updateNotifications();

	}
]);
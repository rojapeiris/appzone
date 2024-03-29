
app.controller('supportController',function($scope,$http,csrf_token,BASE_URL){

    $scope.conversations = {};
    $scope.BASE_URL = BASE_URL+"/support/";
    $scope.modelImagePath = "";

    $scope.isShowReply = 0;
    $scope.supportTicket = "";

    $scope.setSupportTicket = function ($id) {
        $scope.supportTicket = $id;
    }

    $scope.getConversations = function(){
        $http({
            method : "GET",
            url    : BASE_URL+"/api/support/conversations/"+$scope.supportTicket,
        }).then(function success(responce){
            $scope.conversations = responce.data.data;
        },function error(responce){
        });
    }

    $scope.showReply = function(){
        $scope.isShowReply = 1;
    }
    $scope.hideReply = function () {
        $scope.isShowReply = 0;
      }

    $scope.openImageModel= function($path){
        $scope.modelImagePath = $path;
    }

    setInterval(function(){
        $scope.getConversations();
      },5000);
});

/**
* changed
*/
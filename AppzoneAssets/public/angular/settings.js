
app.controller('settingsController',function($scope,$http,csrf_token,BASE_URL){

    $scope.setting = {};

    $scope.getAppSettings = function(){

        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/administrator/setting",
        }).then(function success(responce){
            $('#loader').addClass('hide');

            $scope.setting = responce.data.data;

        },function error(responce){

        });
    };

    $scope.updateAPI = function(){
        $('#setting').modal('hide');

        $http({
            method : "POST",
            url    : BASE_URL+"/api/administrator/setting",
            data   : $scope.setting,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(function success(responce){

            $scope.status = responce.data.status

            if(responce.data.status ==100){

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

            }else if(responce.data.status == 101){

            }

        },function error(responce){

        });
    };


});

/**
* changed
*/
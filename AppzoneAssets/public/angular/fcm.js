app.controller('fcmController',function($scope,$http,csrf_token,BASE_URL){

    $scope.fcm = {};
    $scope.fcmError = {};

    /**
     * send message
     */
    $scope.send = function(id){
        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/firebase-messages/"+id+"/send",
            data   : $scope.fcm,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            if(responce.data.status ==100){
                $('#title').removeClass('has-error');
                $('#text').removeClass('has-error');
                $('#image').removeClass('has-error');

                $scope.fcmError.title = "";
                $scope.fcmError.text = "";
                $scope.fcmError.image = "";
                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Message sent successfully.");
            }else if(responce.data.status ==101){

                if(responce.data.errors.hasOwnProperty('title')){
                    $('#title').addClass('has-error');
                    $scope.fcmError.title = responce.data.errors.title[0];
                }else{
                    $('#title').removeClass('has-error');
                    $scope.fcmError.title = "";
                }

                if(responce.data.errors.hasOwnProperty('text')){
                    $('#text').addClass('has-error');
                    $scope.fcmError.appTheams_id = responce.data.errors.text[0];
                }else{
                    $('#text').removeClass('has-error');
                    $scope.fcmError.text = "";
                }

                if(responce.data.errors.hasOwnProperty('image')){
                    $('#image').addClass('has-error');
                    $scope.fcmError.image = responce.data.errors.image[0];
                }else{
                    $('#image').removeClass('has-error');
                    $scope.fcmError.image = "";
                }
            }
        },function error(responce){

        });
    }

});

/**
* changed
*/
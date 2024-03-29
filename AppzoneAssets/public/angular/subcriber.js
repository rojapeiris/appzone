
app.controller('subcriberController',function($scope,$http,csrf_token,BASE_URL){

    $scope.uploadsubcribers = {};

    $scope.import = function(key){
        $http({
            method : "POST",
            url    : BASE_URL+"/app/importsubcribers/"+key,
            data   : $scope.uploadsubcribers,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            $scope.status = responce.data.status

            if(responce.data.status ==100){

                $('#uploadplayer').modal('hide');
                window.location.href= BASE_URL+"/app/subcribers/"+key;

            }else if(responce.data.status ==101){

                if(responce.data.errors.hasOwnProperty('file')){
                    $('#file').addClass('has-error');
                    $('#error-file').html(responce.data.errors.file);
                }else{
                    $('#file').removeClass('has-error');
                    $('#error-file').html('');
                }

            }
            else if(responce.data.status ==102){
                $('#error-file').html("This function not available for this app");
            }


        },function error(responce){

        });
    };

    $scope.subcriberStatus = function(key){

        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/app/subcribsion/check/"+key,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){
            $('#loader').addClass('hide');
            $scope.status = responce.data.status
            if(responce.data.status ==100){
                window.location.href= BASE_URL+"/app/subcribers/"+key;
            }else if(responce.data.status ==101){
                console.log("Error");
            }

        },function error(responce){

        });
    };


});

/**
* changed
*/
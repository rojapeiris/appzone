app.controller('manageTelcoAppController',function($scope,$http,csrf_token,BASE_URL){

    $scope.managetelcoapp = {};

    $scope.create = function(id){
        console.log("clicked"+ $scope.managetelcoapp);

        $http({
            method : "POST",
            url    : BASE_URL+"/api/app/accesspermission/"+id+"/store",
            data   : $scope.managetelcoapp,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(
            function success(responce){
                
            $('#usercreate').modal('hide');
            $scope.status = responce.data.status

            if(responce.data.status ==100){
                $scope.managetelcoapp = {};

                $('#users_id').removeClass('has-error');
                $('#error-users_id').html("");
                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

            }else if(responce.data.status == 101){

                if(responce.data.errors){

                    if(responce.data.errors.hasOwnProperty('users_id')){
                        $('#users_id').addClass('has-error');
                        $('#error-users_id').html(responce.data.errors.users_id);
                    }else{
                        $('#users_id').removeClass('has-error');
                        $('#error-users_id').html("");
                    }
                }
                toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
            }

        },function error(responce){
            console.log(responce);
        });

    };




});

/**
* changed
*/
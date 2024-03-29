
app.controller('userController',function($scope,$http,csrf_token,BASE_URL){

    $scope.user = {};

    $scope.create = function(){

        $http({
            method : "POST",
            url    : BASE_URL+"/administrator/users/store",
            data   : $scope.user,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(
            function success(responce){


            $('#usercreate').modal('hide');
            $scope.status = responce.data.status

            if(responce.data.status ==100){
                $scope.user = {};

                $('#roles_id').removeClass('has-error');
                $('#error-roles_id').html("");

                $('#username').removeClass('has-error');
                $('#error-username').html("");

                $('#password').removeClass('has-error');
                $('#error-password').html("");

                $('#email').removeClass('has-error');
                $('#error-email').html("");

                $('#phone').removeClass('has-error');
                $('#error-phone').html("");

                $('#name').removeClass('has-error');
                $('#error-name').html("");

                $('#name').removeClass('has-error');
                $('#error-address').html("");

                $('#city').removeClass('has-error');
                $('#error-city').html("");

                $('#province').removeClass('has-error');
                $('#error-province').html("");

                $('#country').removeClass('has-error');
                $('#error-country').html("");

                $('#postCode').removeClass('has-error');
                $('#error-postCode').html("");

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

            }else if(responce.data.status == 101){

                if(responce.data.errors){

                    if(responce.data.errors.hasOwnProperty('roles_id')){
                        $('#roles_id').addClass('has-error');
                        $('#error-roles_id').html(responce.data.errors.roles_id);
                    }else{
                        $('#roles_id').removeClass('has-error');
                        $('#error-roles_id').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('username')){
                        $('#username').addClass('has-error');
                        $('#error-username').html(responce.data.errors.username);
                    }else{
                        $('#username').removeClass('has-error');
                        $('#error-username').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('password')){
                        $('#password').addClass('has-error');
                        $('#error-password').html(responce.data.errors.password);
                    }else{
                        $('#password').removeClass('has-error');
                        $('#error-password').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('email')){
                        $('#email').addClass('has-error');
                        $('#error-email').html(responce.data.errors.email);
                    }else{
                        $('#email').removeClass('has-error');
                        $('#error-email').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('phone')){
                        $('#phone').addClass('has-error');
                        $('#error-phone').html(responce.data.errors.phone);
                    }else{
                        $('#phone').removeClass('has-error');
                        $('#error-phone').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('name')){
                        $('#name').addClass('has-error');
                        $('#error-name').html(responce.data.errors.name);
                    }else{
                        $('#name').removeClass('has-error');
                        $('#error-name').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('address')){
                        $('#address').addClass('has-error');
                        $('#error-address').html(responce.data.errors.address);
                    }else{
                        $('#name').removeClass('has-error');
                        $('#error-address').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('city')){
                        $('#city').addClass('has-error');
                        $('#error-city').html(responce.data.errors.city);
                    }else{
                        $('#city').removeClass('has-error');
                        $('#error-city').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('province')){
                        $('#province').addClass('has-error');
                        $('#error-province').html(responce.data.errors.province);
                    }else{
                        $('#province').removeClass('has-error');
                        $('#error-province').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('country')){
                        $('#country').addClass('has-error');
                        $('#error-country').html(responce.data.errors.country);
                    }else{
                        $('#country').removeClass('has-error');
                        $('#error-country').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('postCode')){
                        $('#postCode').addClass('has-error');
                        $('#error-postCode').html(responce.data.errors.postCode);
                    }else{
                        $('#postCode').removeClass('has-error');
                        $('#error-postCode').html("");
                    }


                }
                toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
            }

        },function error(responce){

        });

    };

    $scope.getUserData = function(id){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/administrator/users/"+id+"/edit",
        }).then(function success(responce){
            $('#loader').addClass('hide');

            $scope.user = responce.data.data;

        },function error(responce){

        });
    };

    $scope.update = function(id){

        $http({
            method : "POST",
            url    : BASE_URL+"/api/administrator/users/update/"+id,
            data   : $scope.user,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(function success(responce){


            $('#usercreate').modal('hide');
            $scope.status = responce.data.status

            if(responce.data.status ==100){
                $scope.user = responce.data.data;

                $('#username').removeClass('has-error');
                $('#error-username').html("");

                $('#email').removeClass('has-error');
                $('#error-email').html("");

                $('#phone').removeClass('has-error');
                $('#error-phone').html("");

                $('#name').removeClass('has-error');
                $('#error-name').html("");

                $('#name').removeClass('has-error');
                $('#error-address').html("");

                $('#city').removeClass('has-error');
                $('#error-city').html("");

                $('#province').removeClass('has-error');
                $('#error-province').html("");

                $('#country').removeClass('has-error');
                $('#error-country').html("");

                $('#postCode').removeClass('has-error');
                $('#error-postCode').html("");

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

            }else if(responce.data.status == 101){

                if(responce.data.errors){


                    if(responce.data.errors.hasOwnProperty('username')){
                        $('#username').addClass('has-error');
                        $('#error-username').html(responce.data.errors.username);
                    }else{
                        $('#username').removeClass('has-error');
                        $('#error-username').html("");
                    }


                    if(responce.data.errors.hasOwnProperty('email')){
                        $('#email').addClass('has-error');
                        $('#error-email').html(responce.data.errors.email);
                    }else{
                        $('#email').removeClass('has-error');
                        $('#error-email').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('phone')){
                        $('#phone').addClass('has-error');
                        $('#error-phone').html(responce.data.errors.phone);
                    }else{
                        $('#phone').removeClass('has-error');
                        $('#error-phone').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('name')){
                        $('#name').addClass('has-error');
                        $('#error-name').html(responce.data.errors.name);
                    }else{
                        $('#name').removeClass('has-error');
                        $('#error-name').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('address')){
                        $('#address').addClass('has-error');
                        $('#error-address').html(responce.data.errors.address);
                    }else{
                        $('#name').removeClass('has-error');
                        $('#error-address').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('city')){
                        $('#city').addClass('has-error');
                        $('#error-city').html(responce.data.errors.city);
                    }else{
                        $('#city').removeClass('has-error');
                        $('#error-city').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('province')){
                        $('#province').addClass('has-error');
                        $('#error-province').html(responce.data.errors.province);
                    }else{
                        $('#province').removeClass('has-error');
                        $('#error-province').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('country')){
                        $('#country').addClass('has-error');
                        $('#error-country').html(responce.data.errors.country);
                    }else{
                        $('#country').removeClass('has-error');
                        $('#error-country').html("");
                    }

                    if(responce.data.errors.hasOwnProperty('postCode')){
                        $('#postCode').addClass('has-error');
                        $('#error-postCode').html(responce.data.errors.postCode);
                    }else{
                        $('#postCode').removeClass('has-error');
                        $('#error-postCode').html("");
                    }


                }
                toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
            }

        },function error(responce){

        });

    };



});


/**
* changed
*/
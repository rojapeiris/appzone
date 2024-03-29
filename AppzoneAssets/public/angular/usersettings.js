
app.controller('settingsController',function($scope,$http,csrf_token,BASE_URL){

    $scope.data = {};

    $scope.getSettings = function(){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/settings/edit",
        }).then(function success(responce){
            $('#loader').addClass('hide');
            $scope.data = responce.data.data;

        },function error(responce){

        });
    };

    $scope.updateBasic = function(){
        $http({
            method : "POST",
            url    : BASE_URL+"/settings/edit/basic",
            data   : $scope.data,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(function success(responce){

            $('#updateBasic').modal('hide');

            $scope.status = responce.data.status

            if(responce.data.status ==100){

                $('#username').removeClass('has-error');
                $('#error-username').html("");

                $('#email').removeClass('has-error');
                $('#error-email').html("");

                $('#phone').removeClass('has-error');
                $('#error-phone').html("");

                $scope.data = responce.data.data;
                $scope.errors = null;
                toastr.options = {
                    "closeButton":true,
                    "progressBar":true,
                    "positionClass":"toast-top-right",
                    "showEasing":"swing",
                    "showMethod":"slideDown",
                    "hideMethod":"fadeOut",
                    "timeOut":1500,
                }
                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");


            }else if(responce.data.status == 101){

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


                toastr.options = {
                    "closeButton":true,
                    "progressBar":true,
                    "positionClass":"toast-top-right",
                    "showEasing":"swing",
                    "showMethod":"slideDown",
                    "hideMethod":"fadeOut",
                    "timeOut":1500,
                }
                toastr.error("<i class='fa fa-warning'></i> &nbsp; Someting wrong");
            }



        },function error(responce){

        });

    };

    $scope.updateOrganization = function(){
        $http({
            method : "POST",
            url    : BASE_URL+"/settings/edit/organization",
            data   : $scope.data,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(function success(responce){

            $('#updateOrganization').modal('hide');

            $scope.status = responce.data.status

            if(responce.data.status ==100){

                $('#name').removeClass('has-error');
                $('#error-name').html("");

                $('#address').removeClass('has-error');
                $('#error-address').html("");

                $('#province').removeClass('has-error');
                $('#error-province').html("");

                $('#country').removeClass('has-error');
                $('#error-country').html("");

                $('#postCode').removeClass('has-error');
                $('#error-postCode').html("");

                $scope.data = responce.data.data;
                $scope.errors = null;
                toastr.options = {
                    "closeButton":true,
                    "progressBar":true,
                    "positionClass":"toast-top-right",
                    "showEasing":"swing",
                    "showMethod":"slideDown",
                    "hideMethod":"fadeOut",
                    "timeOut":1500,
                }
                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");


            }else if(responce.data.status ==101){

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
                    $('#address').removeClass('has-error');
                    $('#error-address').html("");
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


                toastr.options = {
                    "closeButton":true,
                    "progressBar":true,
                    "positionClass":"toast-top-right",
                    "showEasing":"swing",
                    "showMethod":"slideDown",
                    "hideMethod":"fadeOut",
                    "timeOut":1500,
                }
                toastr.error("<i class='fa fa-warning'></i> &nbsp; Someting wrong");
            }

        },function error(responce){

        });

    };

    $scope.updateSequrity = function(){
        $http({
            method : "POST",
            url    : BASE_URL+"/settings/security",
            data   : $scope.data,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(function success(responce){

            $('#updateSequrity').modal('hide');

            $scope.status = responce.data.status

            if(responce.data.status ==100){

                $('#newpassword').removeClass('has-error');
                $('#error-newpassword').html("");

                $('#currentpassword').removeClass('has-error');
                $('#error-currentpassword').html("");

                $scope.data = responce.data.data;
                $scope.errors = null;

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");


            }else if(responce.data.status ==101){

                if(responce.data.errors.hasOwnProperty('currentpassword')){
                    $('#currentpassword').addClass('has-error');
                    $('#error-currentpassword').html(responce.data.errors.currentpassword);
                }else{
                    $('#currentpassword').removeClass('has-error');
                    $('#error-currentpassword').html("");
                }

                if(responce.data.errors.hasOwnProperty('newpassword')){
                    $('#newpassword').addClass('has-error');
                    $('#error-newpassword').html(responce.data.errors.newpassword);
                }else{
                    $('#newpassword').removeClass('has-error');
                    $('#error-newpassword').html("");
                }


                toastr.options = {
                    "closeButton":true,
                    "progressBar":true,
                    "positionClass":"toast-top-right",
                    "showEasing":"swing",
                    "showMethod":"slideDown",
                    "hideMethod":"fadeOut",
                    "timeOut":1500,
                }
                toastr.error("<i class='fa fa-warning'></i> &nbsp; Someting wrong");
            }

        },function error(responce){

        });

    }


});
/**
* changed
*/
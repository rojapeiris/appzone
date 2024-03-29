app.controller('webappController',function($scope,$http,csrf_token,BASE_URL){

    $scope.webAppTheams = {};
    $scope.webApp = {};
    $scope.webAppErrors = {};
    $scope.setting = {};
    $scope.settingErrors= {};
    $scope.dialogApps = {};
    $scope.mobitelApps = {};
    /**
     * get theam list
     */
    $scope.getWebAppTheams = function(){

        console.log("web theams");
        $http({
            method : "GET",
            url    : BASE_URL+"/api/webapptheam/all",
        }).then(function success(responce){

            $scope.webAppTheams = responce.data.data;
            console.log( $scope.webAppTheams[0]);
        },function error(responce){

        });
    }

    $scope.createApp = function(){
        $http({
            method : "POST",
            url    : BASE_URL+"/api/webapp/create",
            data   : $scope.webApp,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            if(responce.data.status ==100){
                $('#webapptheams_id').removeClass('has-error');
                $scope.webAppErrors.webapptheams_id = "";
                window.location.href= BASE_URL+"/webapp/dashboard/"+responce.data.data.key;

            }else if(responce.data.status ==101){
                if(responce.data.errors.hasOwnProperty('webapptheams_id')){
                    $('#appName').addClass('has-error');
                    $scope.webAppErrors.webapptheams_id = responce.data.errors.webapptheams_id[0];
                }else{
                    $('#appName').removeClass('has-error');
                    $scope.webAppErrors.webapptheams_id = "";
                }
            }
        },function error(responce){

        });
    }

    $scope.updateSettings = function(id){

        $scope.setting.primaryColor = $('#primary-color').val();
        $scope.setting.primaryDarkColor = $('#primary-dark-color').val();
        $scope.setting.primaryLightColor = $('#primary-light-color').val();
        $scope.setting.priceColor = $('#price-color').val();

        $http({
            method : "POST",
            url    : BASE_URL+"/api/webapp/update/"+id,
            data   : $scope.setting,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            if(responce.data.status ==100){
                $('#title').removeClass('has-error');
                $('#price').removeClass('has-error');

                $scope.settingErrors.title = "";
                $scope.settingErrors.price = "";

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

            }else if(responce.data.status ==101){

                if(responce.data.errors.hasOwnProperty('title')){
                    $('#title').addClass('has-error');
                    $scope.settingErrors.title = responce.data.errors.title[0];
                }else{
                    $('#title').removeClass('has-error');
                    $scope.settingErrors.title = "";
                }

                //firebase server key
                if(responce.data.errors.hasOwnProperty('price')){
                    $('#price').addClass('has-error');
                    $scope.settingErrors.price = responce.data.errors.price[0];
                }else{
                    $('#price').removeClass('has-error');
                    $scope.settingErrors.price = "";
                }

                if(responce.data.errors.hasOwnProperty('dialogapp_id')){
                    $('#dialogapp_id').addClass('has-error');
                    $scope.settingErrors.dialogapp_id = responce.data.errors.dialogapp_id[0];
                }else{
                    $('#dialogapp_id').removeClass('has-error');
                    $scope.settingErrors.dialogapp_id = "";
                }

            }
        },function error(responce){

        });
    }

    $scope.updateTheme = function(id){

        $http({
            method : "POST",
            url    : BASE_URL+"/api/webapp/update/theme/"+id,
            data   : $scope.setting,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            if(responce.data.status ==100){
                $('#webapptheams_id').removeClass('has-error');
                $('#updatewebapp').modal('toggle');
                $scope.getAppSettings($scope.setting.key);
                $scope.settingErrors.webapptheams_id = "";

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

            }else if(responce.data.status ==101){

                if(responce.data.errors.hasOwnProperty('webapptheams_id')){
                    $('#webapptheams_id').addClass('has-error');
                    $scope.settingErrors.webapptheams_id = responce.data.errors.webapptheams_id[0];
                }else{
                    $('#webapptheams_id').removeClass('has-error');
                    $scope.settingErrors.webapptheams_id = "";
                }

            }
        },function error(responce){

        });
    }

    $scope.showApp = function(id){
        window.location.href= BASE_URL+"/webapp/dashboard/"+id;
    }

    $scope.getAppSettings = function(id){
        $http({
            method : "GET",
            url    : BASE_URL+"/api/webapp/show/"+id,
        }).then(function success(responce){
            $('#loader').addClass('hide');

            $scope.setting = responce.data.data;

            $('#primary-color').val($scope.setting.primaryColor);
            $('#primary-dark-color').val($scope.setting.primaryDarkColor);
            $('#primary-light-color').val($scope.setting.primaryLightColor);
            $('#price-color').val($scope.setting.priceColor);

            $('#primary-color').colorpicker();
            $('#primary-dark-color').colorpicker();
            $('#primary-light-color').colorpicker();
            $('#price-color').colorpicker();

            if($scope.setting.language == "SIN"){
                $('#title-field').addClass('sinhala');
                $('#price-field').addClass('sinhala');
                $('#pinLabel-field').addClass('sinhala');
                $('#phoneLabel-field').addClass('sinhala');
                $('#successMessage-field').addClass('sinhala');
            }else{
                $('#title-field').removeClass('sinhala');
                $('#price-field').removeClass('sinhala');
                $('#pinLabel-field').removeClass('sinhala');
                $('#phoneLabel-field').removeClass('sinhala');
                $('#successMessage-field').removeClass('sinhala');
            }

        },function error(responce){

        });
    }

    $scope.getDialogApp= function(){
        $http({
            method : "GET",
            url    : BASE_URL+"/api/app/dialog/list/DIALOG",
        }).then(function success(responce){
            $('#loader').addClass('hide');
            $scope.dialogApps = responce.data.data;
        },function error(responce){

        });
    }

    $scope.getMobitelApp= function(){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/app/dialog/list/MOBITEL",
        }).then(function success(responce){
            $('#loader').addClass('hide');
            $scope.mobitelApps = responce.data.data;
        },function error(responce){

        });
    }

    $scope.changeLanguage = function(){
        if($scope.setting.language == "SIN"){
            $('#title-field').addClass('sinhala');
            $('#price-field').addClass('sinhala');
            $('#pinLabel-field').addClass('sinhala');
            $('#phoneLabel-field').addClass('sinhala');
            $('#successMessage-field').addClass('sinhala');
        }else{
            $('#title-field').removeClass('sinhala');
            $('#price-field').removeClass('sinhala');
            $('#pinLabel-field').removeClass('sinhala');
            $('#phoneLabel-field').removeClass('sinhala');
            $('#successMessage-field').removeClass('sinhala');
        }
    }

});

/**
* changed
*/
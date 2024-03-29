/**
* changed
*/
app.controller('androidController',function($scope,$http,csrf_token,BASE_URL){

    $scope.appTheams = {};
    $scope.androidApp = {};
    $scope.androidAppErrors = {};
    $scope.setting = {};
    $scope.settingErrors = {};
    /**
     * get theam list
     */
    $scope.getTheams = function(){

        console.log("theams");
        $http({
            method : "GET",
            url    : BASE_URL+"/api/apptheame/all",
        }).then(function success(responce){

            $scope.appTheams = responce.data.data;

        },function error(responce){

        });
    }

    /**
     * create a new app
     */
    $scope.createApp = function(){
        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/app/create",
            data   : $scope.androidApp,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            if(responce.data.status ==100){
                $('#appName').removeClass('has-error');
                $('#apptheam').removeClass('has-error');
                $('#description').removeClass('has-error');

                $scope.androidAppErrors.appName = "";
                $scope.androidAppErrors.appTheams_id = "";
                $scope.androidAppErrors.description = "";

                window.location.href= BASE_URL+"/android/dashboard/"+responce.data.data.key;

            }else if(responce.data.status ==101){

                if(responce.data.errors.hasOwnProperty('appName')){
                    $('#appName').addClass('has-error');
                    $scope.androidAppErrors.appName = responce.data.errors.appName[0];
                }else{
                    $('#appName').removeClass('has-error');
                    $scope.androidAppErrors.appName = "";
                }

                if(responce.data.errors.hasOwnProperty('appTheams_id')){
                    $('#apptheam').addClass('has-error');
                    $scope.androidAppErrors.appTheams_id = responce.data.errors.appTheams_id[0];
                }else{
                    $('#apptheam').removeClass('has-error');
                    $scope.androidAppErrors.appTheams_id = "";
                }

                if(responce.data.errors.hasOwnProperty('description')){
                    $('#description').addClass('has-error');
                    $scope.androidAppErrors.description = responce.data.errors.description[0];
                }else{
                    $('#description').removeClass('has-error');
                    $scope.androidAppErrors.description = "";
                }
            }
        },function error(responce){

        });
    }
    /**
     * update settings
     */
    $scope.updateSettings = function(id){

        $scope.setting.primaryColor = $('#primary-color').val();
        $scope.setting.primaryDarkColor = $('#primary-dark-color').val();
        $scope.setting.primaryLightColor = $('#primary-light-color').val();
        $scope.setting.priceColor = $('#price-color').val();


        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/app/update/"+id,
            data   : $scope.setting,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            if(responce.data.status ==100){
                $('#appName').removeClass('has-error');
                $('#description').removeClass('has-error');
                $('#price').removeClass('has-error');
                $('#language').removeClass('has-error');
                $('#layout').removeClass('has-error');
                $('#primaryColor').removeClass('has-error');
                $('#primaryDarkColor').removeClass('has-error');
                $('#primaryLightColor').removeClass('has-error');
                $('#priceColor').removeClass('has-error');
                $('#dialogKey').removeClass('has-error');
                $('#mobitelKey').removeClass('has-error');
                $('#fcmKey').removeClass('has-error');

                $scope.settingErrors.appName = "";
                $scope.settingErrors.description = "";
                $scope.settingErrors.language = "";
                $scope.settingErrors.layout = "";
                $scope.settingErrors.primaryColor = "";
                $scope.settingErrors.primaryDarkColor = "";
                $scope.settingErrors.primaryLightColor = "";
                $scope.settingErrors.price = "";
                $scope.settingErrors.priceColor = "";
                $scope.settingErrors.dialogKey = "";
                $scope.settingErrors.mobitelKey = "";
                $scope.settingErrors.fcmKey = "";

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

            }else if(responce.data.status ==101){

                if(responce.data.errors.hasOwnProperty('appName')){
                    $('#appName').addClass('has-error');
                    $scope.settingErrors.appName = responce.data.errors.appName[0];
                }else{
                    $('#appName').removeClass('has-error');
                    $scope.settingErrors.appName = "";
                }

                //firebase server key
                if(responce.data.errors.hasOwnProperty('fcmKey')){
                    $('#fcmKey').addClass('has-error');
                    $scope.settingErrors.fcmKey = responce.data.errors.fcmKey[0];
                }else{
                    $('#fcmKey').removeClass('has-error');
                    $scope.settingErrors.fcmKey = "";
                }

                if(responce.data.errors.hasOwnProperty('description')){
                    $('#description').addClass('has-error');
                    $scope.settingErrors.description = responce.data.errors.description[0];
                }else{
                    $('#description').removeClass('has-error');
                    $scope.settingErrors.description = "";
                }

                if(responce.data.errors.hasOwnProperty('language')){
                    $('#language').addClass('has-error');
                    $scope.settingErrors.language = responce.data.errors.language[0];
                }else{
                    $('#language').removeClass('has-error');
                    $scope.settingErrors.language = "";
                }

                if(responce.data.errors.hasOwnProperty('layout')){
                    $('#layout').addClass('has-error');
                    $scope.settingErrors.layout = responce.data.errors.layout[0];
                }else{
                    $('#layout').removeClass('has-error');
                    $scope.settingErrors.layout = "";
                }

                if(responce.data.errors.hasOwnProperty('primaryColor')){
                    $('#primaryColor').addClass('has-error');
                    $scope.settingErrors.primaryColor = responce.data.errors.primaryColor[0];
                }else{
                    $('#primaryColor').removeClass('has-error');
                    $scope.settingErrors.primaryColor = "";
                }

                if(responce.data.errors.hasOwnProperty('primaryDarkColor')){
                    $('#primaryDarkColor').addClass('has-error');
                    $scope.settingErrors.primaryDarkColor = responce.data.errors.primaryDarkColor[0];
                }else{
                    $('#primaryDarkColor').removeClass('has-error');
                    $scope.settingErrors.primaryDarkColor = "";
                }

                if(responce.data.errors.hasOwnProperty('primaryLightColor')){
                    $('#primaryLightColor').addClass('has-error');
                    $scope.settingErrors.primaryLightColor = responce.data.errors.primaryLightColor[0];
                }else{
                    $('#primaryLightColor').removeClass('has-error');
                    $scope.settingErrors.primaryLightColor = "";
                }

                if(responce.data.errors.hasOwnProperty('priceColor')){
                    $('#priceColor').addClass('has-error');
                    $scope.settingErrors.priceColor = responce.data.errors.priceColor[0];
                }else{
                    $('#priceColor').removeClass('has-error');
                    $scope.settingErrors.priceColor = "";
                }

                if(responce.data.errors.hasOwnProperty('price')){
                    $('#price').addClass('has-error');
                    $scope.settingErrors.price = responce.data.errors.price[0];
                }else{
                    $('#price').removeClass('has-error');
                    $scope.settingErrors.price = "";
                }

                if(responce.data.errors.hasOwnProperty('dialogKey')){
                    $('#dialogKey').addClass('has-error');
                    $scope.settingErrors.dialogKey = responce.data.errors.dialogKey[0];
                }else{
                    $('#dialogKey').removeClass('has-error');
                    $scope.settingErrors.dialogKey = "";
                }

                if(responce.data.errors.hasOwnProperty('mobitelKey')){
                    $('#mobitelKey').addClass('has-error');
                    $scope.settingErrors.mobitelKey = responce.data.errors.mobitelKey[0];
                }else{
                    $('#mobitelKey').removeClass('has-error');
                    $scope.settingErrors.mobitelKey = "";
                }
            }
        },function error(responce){

        });
    }

    /**
     *
     */
    $scope.showApp = function(id){
        window.location.href= BASE_URL+"/android/dashboard/"+id;
    }

    $scope.getAppSettings = function(id){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/android/app/show/"+id,
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

            if($scope.setting.language == "sin"){
                $('#appName-field').addClass('sinhala');
                $('#description-field').addClass('sinhala');
            }else{
                $('#appName-field').removeClass('sinhala');
                $('#description-field').removeClass('sinhala');
            }

        },function error(responce){

        });
    }

    $scope.changeLanguage = function(){
        if($scope.setting.language == "sin"){
            $('#appName-field').addClass('sinhala');
            $('#description-field').addClass('sinhala');
        }else{
            $('#appName-field').removeClass('sinhala');
            $('#description-field').removeClass('sinhala');
        }
    }

});

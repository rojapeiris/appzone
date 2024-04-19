/**
 * appzone.lk
 * 
 * Author: rojith peiris
 * Version: 2.0
 * Company: ImagineIdea(Pvt) Ltd
 * App Name: Appzone
 * Description: Telco Apps Management - Handles the management of various applications related to telecommunications.
 * 
 */

var app = angular.module("myApp", []);

app.factory("csrf_token", function(CSRF_TOKEN) {
    return CSRF_TOKEN;
});

app.factory("BASE_URL", function(base_url) {
    return base_url;
});

app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var mins = Math.floor(((seconds % 86400) % 3600) / 60);
        var secs = ((seconds % 86400) % 3600) % 60;
        return (days > 0 ? days + 'd ' : '') + ('00' + hours).slice(-2) + ':' + ('00' + mins).slice(-2) + ':' + ('00' + secs).slice(-2);
    };
}]);

app.filter('removeSpaces', function() {
    return function(input) {
        if (input) {
            return input.replace(/\s+/g, '');
        }
        return '';
    };
});

app.filter('toLowerCase', function() {
return function(input) {
    if (input) {
        return input.toLowerCase();
    }
    return '';
};
});


app.directive("ngFileSelect", function(fileReader, $timeout) {
    return {
        scope: {
            ngModel: '='
        },
        link: function($scope, el) {
            function getFile(file) {
                fileReader.readAsDataUrl(file, $scope)
                    .then(function(result) {
                        $timeout(function() {
                            $scope.ngModel = result;
                        });
                    });
            }

            el.bind("change", function(e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
            });
        }
    };
});

app.factory("fileReader", function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function(reader, scope) {
        return function(event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function(file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});

/**
 * android controller
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

            $('#appName').removeClass('has-error');
            $('#apptheam').removeClass('has-error');
            $('#description').removeClass('has-error');

            $scope.androidAppErrors.appName = "";
            $scope.androidAppErrors.appTheams_id = "";
            $scope.androidAppErrors.description = "";

            window.location.href= BASE_URL+"/android/dashboard/"+responce.data.data.key;

        },function error(responce){
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
        },function error(responce){
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

/**
 * Android category controller
 */


app.controller('androidCategoryController',function($scope,$http,csrf_token,BASE_URL){

    $scope.androidCategoryData = {};
    $scope.androidCategoryDataErrors = {};
    /**
     * create a new app 
     * edited
     */
    $scope.createCategory = function(key){

        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/categories/store/"+key,
            data   : $scope.androidCategoryData,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            $('#name').removeClass('has-error');
            $('#thumbnail').removeClass('has-error');

            $scope.androidCategoryDataErrors.titnamele = "";
            $scope.androidCategoryDataErrors.thumbnail = "";

            $scope.androidCategoryData.name = "";
            $scope.androidCategoryData.thumbnail ="";

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Post created successfully");

        },function error(responce){
            if(responce.data.errors.hasOwnProperty('name')){
                $('#name').addClass('has-error');
                $scope.androidCategoryDataErrors.name = responce.data.errors.name[0];
            }else{
                $('#name').removeClass('has-error');
                $scope.androidCategoryDataErrors.name = "";
            }

            if(responce.data.errors.hasOwnProperty('thumbnail')){
                $('#thumbnail').addClass('has-error');
                $scope.androidCategoryDataErrors.thumbnail = responce.data.errors.thumbnail[0];
            }else{
                $('#thumbnail').removeClass('has-error');
                $scope.androidCategoryDataErrors.thumbnail = "";
            }
        });
    }

    $scope.getPost = function(id){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/posts/getpost/"+id,
        }).then(function success(responce){
            $('#loader').addClass('hide');

            $scope.postEditData = responce.data.data;
            $('#summernote').code($scope.postEditData.content);

            if($scope.postEditData.language == "sin"){
                $('#title-field').addClass('sinhala');
                $('#content-field').addClass('sinhala');
            }else{
                $('#title-field').removeClass('sinhala');
                $('#content-field').removeClass('sinhala');
            }

        },function error(responce){

        });
    }



    $scope.updatePost = function(key,id){

        $scope.postEditData.content = $('#summernote').code();

        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/posts/update/"+key+'/'+id,
            data   : $scope.postEditData,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            $('#title').removeClass('has-error');
            $('#content').removeClass('has-error');
            $('#thumbnail').removeClass('has-error');
            $('#banner').removeClass('has-error');

            $scope.postEditDataErrors.title = "";
            $scope.postEditDataErrors.content = "";
            $scope.postEditDataErrors.thumbnail = "";
            $scope.postEditDataErrors.banner = "";
            $scope.postEditDataErrors.language = "";

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

        },function error(responce){
            if(responce.data.errors.hasOwnProperty('title')){
                $('#title').addClass('has-error');
                $scope.postEditDataErrors.title = responce.data.errors.title[0];
            }else{
                $('#title').removeClass('has-error');
                $scope.postEditDataErrors.title = "";
            }

            if(responce.data.errors.hasOwnProperty('content')){
                $('#content').addClass('has-error');
                $scope.postEditDataErrors.content = responce.data.errors.content[0];
            }else{
                $('#content').removeClass('has-error');
                $scope.postEditDataErrors.content = "";
            }

            if(responce.data.errors.hasOwnProperty('thumbnail')){
                $('#thumbnail').addClass('has-error');
                $scope.postEditDataErrors.thumbnail = responce.data.errors.thumbnail[0];
            }else{
                $('#description').removeClass('has-error');
                $scope.postEditDataErrors.thumbnail = "";
            }

            if(responce.data.errors.hasOwnProperty('banner')){
                $('#banner').addClass('has-error');
                $scope.postEditDataErrors.banner = responce.data.errors.banner[0];
            }else{
                $('#description').removeClass('has-error');
                $scope.postEditDataErrors.banner = "";
            }

            if(responce.data.errors.hasOwnProperty('language')){
                $('#language').addClass('has-error');
                $scope.postEditDataErrors.language = responce.data.errors.language[0];
            }else{
                $('#language').removeClass('has-error');
                $scope.postEditDataErrors.language = "";
            }
        });
    }

});

/**
 * Android post 
 */
app.controller('androidPostController',function($scope,$http,csrf_token,BASE_URL){

    $scope.postData = {};
    $scope.postDataErrors = {};
    $scope.postEditData = {};
    $scope.postEditDataErrors = {};
    $scope.categories = {};

    /**
     * create a new app d
     */
    $scope.createApp = function(key){

        $scope.postData.content = $('#summernote').code();

        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/posts/store/"+key,
            data   : $scope.postData,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            $('#title').removeClass('has-error');
            $('#content').removeClass('has-error');
            $('#thumbnail').removeClass('has-error');
            $('#banner').removeClass('has-error');

            $scope.postDataErrors.title = "";
            $scope.postDataErrors.content = "";
            $scope.postDataErrors.thumbnail = "";
            $scope.postDataErrors.banner = "";
            $scope.postDataErrors.language = "";

            $scope.postData.title = "";
            $scope.postData.content = "";
            $scope.postData.thumbnail = "";
            $scope.postData.banner = "";
            $scope.postData.language = "";

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Post created successfully");
            window.location.href =BASE_URL+'/'+ responce.data.redirect_url;

        },function error(responce){

            if(responce.data.errors.hasOwnProperty('title')){
                $('#title').addClass('has-error');
                $scope.postDataErrors.title = responce.data.errors.title[0];
            }else{
                $('#title').removeClass('has-error');
                $scope.postDataErrors.title = "";
            }

            if(responce.data.errors.hasOwnProperty('content')){
                $('#content').addClass('has-error');
                $scope.postDataErrors.content = responce.data.errors.content[0];
            }else{
                $('#content').removeClass('has-error');
                $scope.postDataErrors.content = "";
            }

            if(responce.data.errors.hasOwnProperty('thumbnail')){
                $('#thumbnail').addClass('has-error');
                $scope.postDataErrors.thumbnail = responce.data.errors.thumbnail[0];
            }else{
                $('#description').removeClass('has-error');
                $scope.postDataErrors.thumbnail = "";
            }

            if(responce.data.errors.hasOwnProperty('banner')){
                $('#banner').addClass('has-error');
                $scope.postDataErrors.banner = responce.data.errors.banner[0];
            }else{
                $('#description').removeClass('has-error');
                $scope.postDataErrors.banner = "";
            }

            if(responce.data.errors.hasOwnProperty('language')){
                $('#language').addClass('has-error');
                $scope.postDataErrors.language = responce.data.errors.language[0];
            }else{
                $('#description').removeClass('has-error');
                $scope.postDataErrors.language = "";
            }
        });
    }

    $scope.getPost = function(id){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/posts/getpost/"+id,
        }).then(function success(responce){
            $('#loader').addClass('hide');

            $scope.postEditData = responce.data.data;
            $('#summernote').code($scope.postEditData.content);

            if($scope.postEditData.language == "sin"){
                $('#title-field').addClass('sinhala');
                $('#content-field').addClass('sinhala');
            }else{
                $('#title-field').removeClass('sinhala');
                $('#content-field').removeClass('sinhala');
            }

        },function error(responce){

        });
    }

    $scope.initSummernote = function(){
        $('#summernote').summernote({
            height: 210,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
              ],
        });
    }

    $scope.updatePost = function(key,id){

        $scope.postEditData.content = $('#summernote').code();

        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/posts/update/"+key+'/'+id,
            data   : $scope.postEditData,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            $('#title').removeClass('has-error');
            $('#content').removeClass('has-error');
            $('#thumbnail').removeClass('has-error');
            $('#banner').removeClass('has-error');

            $scope.postEditDataErrors.title = "";
            $scope.postEditDataErrors.content = "";
            $scope.postEditDataErrors.thumbnail = "";
            $scope.postEditDataErrors.banner = "";
            $scope.postEditDataErrors.language = "";

            $scope.postEditData = responce.data.data;

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");
            
        },function error(responce){
            
            if(responce.data.errors.hasOwnProperty('title')){
                $('#title').addClass('has-error');
                $scope.postEditDataErrors.title = responce.data.errors.title[0];
            }else{
                $('#title').removeClass('has-error');
                $scope.postEditDataErrors.title = "";
            }

            if(responce.data.errors.hasOwnProperty('content')){
                $('#content').addClass('has-error');
                $scope.postEditDataErrors.content = responce.data.errors.content[0];
            }else{
                $('#content').removeClass('has-error');
                $scope.postEditDataErrors.content = "";
            }

            if(responce.data.errors.hasOwnProperty('thumbnail')){
                $('#thumbnail').addClass('has-error');
                $scope.postEditDataErrors.thumbnail = responce.data.errors.thumbnail[0];
            }else{
                $('#description').removeClass('has-error');
                $scope.postEditDataErrors.thumbnail = "";
            }

            if(responce.data.errors.hasOwnProperty('banner')){
                $('#banner').addClass('has-error');
                $scope.postEditDataErrors.banner = responce.data.errors.banner[0];
            }else{
                $('#description').removeClass('has-error');
                $scope.postEditDataErrors.banner = "";
            }

            if(responce.data.errors.hasOwnProperty('language')){
                $('#language').addClass('has-error');
                $scope.postEditDataErrors.language = responce.data.errors.language[0];
            }else{
                $('#language').removeClass('has-error');
                $scope.postEditDataErrors.language = "";
            }
        });
    }

    $scope.changeLanguage = function(val='eng'){

        if($scope.postEditData.language == "sin" || val == 'sin'){
            $('#title-field').addClass('sinhala');
            $('#content-field').addClass('sinhala');
        }else{
            $('#title-field').removeClass('sinhala');
            $('#content-field').removeClass('sinhala');
        }
    }

    $scope.getCategories = function(id){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/categories/"+id+"/getAll",
        }).then(function success(responce){
            $('#loader').addClass('hide');
            $scope.categories = responce.data.data;
        },function error(responce){

        });
    }

});

/**
 * Android post steps
 */

app.controller('androidPostStepController',function($scope,$http,csrf_token,BASE_URL){

    $scope.stepData = {};
    $scope.stepDataErrors = {};
    $scope.stepEditData = {};
    $scope.stepEditDataErrors = {};

    /**
     * create a new app d
     */
    $scope.createApp = function(key,id){

        $scope.stepData.content = $('#summernote').code();

        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/posts/"+key+"/"+id+"/steps/store",
            data   : $scope.stepData,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){
            $('#video').removeClass('has-error');
            $('#content').removeClass('has-error');
            $('#audio').removeClass('has-error');

            $scope.stepDataErrors.video = "";
            $scope.stepDataErrors.content = "";
            $scope.stepDataErrors.audio = "";

            $scope.stepData.video = "";
            $scope.stepData.content = "";
            $scope.stepData.audio = "";
            $scope.stepData.language = "";

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Step created successfully");

        },function error(responce){
            if(responce.data.errors.hasOwnProperty('video')){
                $scope.stepDataErrors.video = responce.data.errors.video[0];
            }else{
                $scope.stepDataErrors.video = "";
            }

            if(responce.data.errors.hasOwnProperty('content')){
                $scope.stepDataErrors.content = responce.data.errors.content[0];
            }else{
                $scope.stepDataErrors.content = "";
            }

            if(responce.data.errors.hasOwnProperty('audio')){
                $scope.stepDataErrors.audio = responce.data.errors.audio[0];
            }else{
                $scope.stepDataErrors.audio = "";
            }

            if(responce.data.errors.hasOwnProperty('language')){
                $scope.stepDataErrors.language = responce.data.errors.language[0];
            }else{
                $scope.stepDataErrors.language = "";
            }
        });
    }

    $scope.getPostStep = function(id){
        $('#loader').removeClass('hide');
        $http({
            method : "GET",
            url    : BASE_URL+"/api/posts/getpoststep/"+id,
        }).then(function success(responce){
            $('#loader').addClass('hide');

            $scope.stepEditData = responce.data.data;
            $('#summernote').code($scope.stepEditData.content);

            if($scope.stepEditData.language == "sin"){
                $('#content-field').addClass('sinhala');
            }else{
                $('#content-field').removeClass('sinhala');
            }

        },function error(responce){

        });
    }

    $scope.initSummernote = function(){
        $('#summernote').summernote({
            height: 210,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
              ],
        });
    }

    $scope.updatePost = function(key,id){

        $scope.stepEditData.content = $('#summernote').code();

        $http({
            method : "POST",
            url    : BASE_URL+"/api/posts/steps/"+key+'/'+id,
            data   : $scope.stepEditData,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){
            $('#video').removeClass('has-error');
            $('#content').removeClass('has-error');
            $('#audio').removeClass('has-error');

            $scope.stepDataErrors.video = "";
            $scope.stepDataErrors.content = "";
            $scope.stepDataErrors.audio = "";

            $scope.stepData.video = "";
            $scope.stepData.content = "";
            $scope.stepData.audio = "";
            $scope.stepData.language = "";

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");
            
        },function error(responce){
            if(responce.data.errors.hasOwnProperty('video')){
                $scope.stepDataErrors.video = responce.data.errors.video[0];
            }else{
                $scope.stepDataErrors.video = "";
            }

            if(responce.data.errors.hasOwnProperty('content')){
                $scope.stepDataErrors.content = responce.data.errors.content[0];
            }else{
                $scope.stepDataErrors.content = "";
            }

            if(responce.data.errors.hasOwnProperty('audio')){
                $scope.stepDataErrors.audio = responce.data.errors.audio[0];
            }else{
                $scope.stepDataErrors.audio = "";
            }

            if(responce.data.errors.hasOwnProperty('language')){
                $scope.stepDataErrors.language = responce.data.errors.language[0];
            }else{
                $scope.stepDataErrors.language = "";
            }
        });
    }

    $scope.changeLanguage = function(val='eng'){

        if($scope.stepEditData.language == "sin" || val == 'sin'){
            $('#content-field').addClass('sinhala');
        }else{
            $('#content-field').removeClass('sinhala');
        }
    }

});

/**
 * Android questions
 */

app.controller(
    "androidQuestionController",
    function ($scope, $http, csrf_token, BASE_URL) {
        $scope.answers = [{ answer: "" }];
        $scope.questionData = {};
        $scope.questionData.answer = [];
        $scope.questionData.language = "eng";
        $scope.questionData.answerType = "text";
        $scope.questionDataError = {};
        $scope.languageClass = "";

        /**
         * create a new app ds
         */
        $scope.initSummernote = function () {
            $("#summernote").summernote({
                height: 210,
                toolbar: [
                    ["style", ["style"]],
                    ["font", ["bold", "italic", "underline", "clear"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["height", ["height"]],
                    ["table", ["table"]],
                    ["insert", ["link", "picture", "hr"]],
                    ["view", ["fullscreen", "codeview"]],
                    ["help", ["help"]],
                ],
            });
        };

        $scope.changeLanguage = function (val = "eng") {
            if ($scope.questionData.language == "sin" || val == "sin") {
                $("#title-field").addClass("sinhala");
                $("#content-field").addClass("sinhala");
                $(".answer-field").addClass("sinhala");
            } else {
                $("#title-field").removeClass("sinhala");
                $("#content-field").removeClass("sinhala");
                $(".answer-field").removeClass("sinhala");
            }
        };

        $scope.changeAnswerType = function (val = "text") {
            if ($scope.questionData.language == "image" || val == "image") {
            } else {
            }
        };

        $scope.addAnswer = function () {
            $scope.answers.push({ answer: "" });
        };
        $scope.remove = function (item) {
            console.log("item" + item);
            if ($scope.answers.length > 1) {
                var index = $scope.answers.indexOf(item);
                $scope.answers.splice(index, 1);
                $scope.questionData.answer.splice(index, 1);
            }
        };

        $scope.createQuestion = function (key, pid) {
            $scope.questionData.content = $("#summernote").code();

            $http({
                method: "POST",
                url:
                    BASE_URL +
                    "/api/android/questions/" +
                    key +
                    "/store/" +
                    pid,
                data: $scope.questionData,
                headers: {
                    "X-CSRF-TOKEN": csrf_token,
                },
            }).then(
                function success(responce) {
                    $scope.questionData.content = "";
                    $scope.questionData.answer = "";
                    $scope.answers = [{ answer: 1 }];

                    toastr.success(
                        "<i class='fa fa-check-circle'></i> &nbsp; Post created successfully"
                    );
                },
                function error(responce) {
                    if (responce.data.errors.hasOwnProperty("content")) {
                        $("#content").addClass("has-error");
                        $scope.questionDataError.content =
                            responce.data.errors.content[0];
                    } else {
                        $("#content").removeClass("has-error");
                        $scope.questionDataError.content = "";
                    }
                }
            );
        };

        $scope.updateQuestion = function (key, qid) {
            $scope.questionData.content = $("#summernote").code();
            $http({
                method: "POST",
                url:
                    BASE_URL +
                    "/api/android/questions/" +
                    key +
                    "/" +
                    qid +
                    "/update",
                data: $scope.questionData,
                headers: {
                    "X-CSRF-TOKEN": csrf_token,
                },
            }).then(
                function success(responce) {
                    toastr.success(
                        "<i class='fa fa-check-circle'></i> &nbsp; Post created successfully"
                    );
                },
                function error(responce) {
                    if (responce.data.errors.hasOwnProperty("content")) {
                        $("#content").addClass("has-error");
                        $scope.questionDataError.content =
                            responce.data.errors.content[0];
                    } else {
                        $("#content").removeClass("has-error");
                        $scope.questionDataError.content = "";
                    }
                }
            );
        };
        $scope.getQuestion = function (key, qid) {
            $http({
                method: "GET",
                url:
                    BASE_URL +
                    "/android/questions/" +
                    key +
                    "/" +
                    qid +
                    "/getquestion",
            }).then(
                function success(responce) {
                    $scope.questionData = responce.data.data;
                    console.log("question data"+ $scope.questionData.answerType);
                    $scope.questionData.answer = [];
                    $scope.answers = responce.data.data.answers;
                    angular.forEach(
                        responce.data.data.answers,
                        function (value, key) {
                            $scope.questionData.answer.push(
                                responce.data.data.answers[key].answer
                            );
                            if (value.isCorrect == 1) {
                                $scope.questionData.correctAnswer = key;
                            }
                        }
                    );
                    $scope.changeLanguage(responce.data.data.language);
                    if (responce.data.data.language == "sin") {
                        $scope.languageClass = "sinhala";
                    }
                },
                function error(responce) {}
            );
        };

       
    }
);

/**
 * Telco app controller
 */

app.controller('appController', function($scope, $http, csrf_token, BASE_URL) {

    $scope.appdata = {};
    $scope.setting = {};
    $scope.scheduletypes = {};

    $scope.getAppTypes = function(id) {

        console.log( "platform"+id);
        $http({
            method: "GET",
            url: BASE_URL + "/apptype/list/" + id,
        }).then(function success(responce) {

            $scope.apptypes = responce.data.data;
            console.log( "app types"+responce.data.data);
        }, function error(responce) {

        });
    };

    $scope.getPlatforms = function() {
        $http({
            method: "GET",
            url: BASE_URL + "/platform/list",
        }).then(function success(responce) {

            $scope.platforms = responce.data.data;

        }, function error(responce) {

        });
    };

    $scope.createApp = function() {

        $http({
            method: "POST",
            url: BASE_URL + "/app/create",
            data: $scope.appdata,
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            }
        }).then(function success(responce) {

            $('#createapp').modal('hide');

            $('#name').removeClass('has-error');
            $('#error-name').html('');

            $('#platform').removeClass('has-error');
            $('#error-platform').html('');

            $('#apptype').removeClass('has-error');
            $('#error-apptype').html('');

            $('#error-terms').removeClass('has-error');
            $('#error-terms').html('');

            window.location.href = BASE_URL + "/app/dashboard/" + responce.data.data.key;

        }, function error(responce) {
            if (responce.data.errors.hasOwnProperty('name')) {
                $('#name').addClass('has-error');
                $('#error-name').html(responce.data.errors.name);
            } else {
                $('#name').removeClass('has-error');
                $('#error-name').html('');
            }

            if (responce.data.errors.hasOwnProperty('platform')) {
                $('#platform').addClass('has-error');
                $('#error-platform').html(responce.data.errors.platform);
            } else {
                $('#platform').removeClass('has-error');
                $('#error-platform').html('');
            }

            if (responce.data.errors.hasOwnProperty('apptype')) {
                $('#apptype').addClass('has-error');
                $('#error-apptype').html(responce.data.errors.apptype);
            } else {
                $('#apptype').removeClass('has-error');
                $('#error-apptype').html('');
            }

            if (responce.data.errors.hasOwnProperty('terms')) {
                $('#error-terms').addClass('has-error');
                $('#error-terms').html(responce.data.errors.terms);
            } else {
                $('#error-terms').removeClass('has-terms');
                $('#error-terms').html('');
            }
        });
    };

    //display app list
    $scope.getAppList = function() {

        $('#loader').removeClass('hide');
        $http({
            method: "GET",
            url: BASE_URL + "/app/list",
        }).then(function success(responce) {
            $('#loader').addClass('hide');
            $scope.apps = responce.data.data;

        }, function error(responce) {

        });
    };

    //display recent apps
    $scope.getAppListRecent = function() {

        $('#loader').removeClass('hide');
        $http({
            method: "GET",
            url: BASE_URL + "/app/list/recent",
        }).then(function success(responce) {
            $('#loader').addClass('hide');
            $scope.recentapps = responce.data.data;

        }, function error(responce) {

        });
    };

    $scope.getAppTypeData = function(id) {

        $http({
            method: "GET",
            url: BASE_URL + "/apptype/" + id,
        }).then(function success(responce) {

            $scope.apptypedata = responce.data.data;

        }, function error(responce) {

        });
    };


    $scope.getAppSettings = function(id) {

        $('#loader').removeClass('hide');
        $http({
            method: "GET",
            url: BASE_URL + "/api/app/settings/" + id,
        }).then(function success(responce) {
            $('#loader').addClass('hide');

            $scope.setting = responce.data.data;

        }, function error(responce) {

        });
    };

    $scope.showApp = function(id) {

        window.location.href = BASE_URL + "/app/dashboard/" + id;

    }

    $scope.updateSettings = function() {

        //$('#loader').removeClass('hide');
        $http({
            method: "POST",
            url: BASE_URL + "/api/app/settings/update",
            data: $scope.setting,
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            }
        }).then(function success(responce) {

            //$('#loader').addClass('hide');
            $scope.getAppSettings($scope.setting.key);
            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

        }, function error(responce) {
            if (responce.data.errors.hasOwnProperty('name')) {
                $('#password').addClass('has-error');
                $('#error-password').html(responce.data.errors.appPassword);
            } else {
                $('#password').removeClass('has-error');
                $('#error-password').html();
            }

            if (responce.data.errors.hasOwnProperty('appID')) {
                $('#appid').addClass('has-error');
                $('#error-appid').html(responce.data.errors.appID);
            } else {
                $('#appid').removeClass('has-error');
                $('#error-appid').html("");
            }

            if (responce.data.errors.hasOwnProperty('appPassword')) {
                $('#password').addClass('has-error');
                $('#error-password').html(responce.data.errors.appPassword);
            } else {
                $('#password').removeClass('has-error');
                $('#error-password').html("");
            }

            if (responce.data.errors.hasOwnProperty('users_id')) {
                $('#usersid').addClass('has-error');
                $('#error-usersid').html(responce.data.errors.users_id);
            } else {
                $('#usersid').removeClass('has-error');
                $('#error-usersid').html("");
            }
        });
    };

    $scope.getScheduleTypes = function() {
        $http({
            method: "GET",
            url: BASE_URL + "/api/schedules/types",
        }).then(function success(responce) {
            $scope.scheduletypes = responce.data.data;
        }, function error(responce) {

        });
    }
});

/**
 * Email controller
 */

app.controller('emailController', function($scope, $http, csrf_token, BASE_URL) {

    $scope.emailData = {};
    $scope.emailDataErrors = {};
    $scope.emailData.isSendAll = 0;
    /**
     * create a new app
     */
    $scope.sendEmail = function() {

        $scope.emailData.content = $('#summernote').code();

        $http({
            method: "POST",
            url: BASE_URL + "/api/administrator/email/send",
            data: $scope.emailData,
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            }
        }).then(function success(responce) {

            $('#toAddress').removeClass('has-error');
            $('#subject').removeClass('has-error');
            $('#content').removeClass('has-error');

            $scope.emailDataErrors.toAddress = "";
            $scope.emailDataErrors.subject = "";
            $scope.emailDataErrors.content = "";

            $('#summernote').code("")

            $scope.emailData.toAddress = "";
            $scope.emailData.subject = "";
            $scope.emailData.content = "";
            $scope.emailData.isSendAll = 0;
            $('#to').removeClass('hide')

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Emails sent successfully");
            
        }, function error(responce) {
            if (responce.data.errors.hasOwnProperty('toAddress')) {
                $('#toAddress').addClass('has-error');
                $scope.emailDataErrors.toAddress = responce.data.errors.toAddress[0];
            } else {
                $('#toAddress').removeClass('has-error');
                $scope.emailDataErrors.toAddress = "";
            }

            if (responce.data.errors.hasOwnProperty('subject')) {
                $('#subject').addClass('has-error');
                $scope.emailDataErrors.subject = responce.data.errors.subject[0];
            } else {
                $('#subject').removeClass('has-error');
                $scope.emailDataErrors.subject = "";
            }

            if (responce.data.errors.hasOwnProperty('content')) {
                $('#content').addClass('has-error');
                $scope.emailDataErrors.content = responce.data.errors.content[0];
            } else {
                $('#content').removeClass('has-error');
                $scope.emailDataErrors.content = "";
            }
        });
    }

    $scope.initSummernote = function() {
        $('#summernote').summernote({
            height: 400
        });
    }

    $scope.sendToAll = function() {
        if ($scope.emailData.isSendAll == 1) {

            $('#to').addClass('hide')
        } else {
            $scope.emailData.isSendAll = 0;
            $('#to').removeClass('hide')
        }
    }

});

/**
 * fcm controller
 */
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
            $('#title').removeClass('has-error');
            $('#text').removeClass('has-error');
            $('#image').removeClass('has-error');

            $scope.fcmError.title = "";
            $scope.fcmError.text = "";
            $scope.fcmError.image = "";
            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Message sent successfully.");
        },function error(responce){
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
        });
    }

});

/**
 * Firebase controller
 */
app.controller('firebaseController',function($scope,$http,csrf_token,BASE_URL){

    $scope.posts =[];

    $scope.initFirebase = function(){
        var config = {
            apiKey: "AIzaSyDskcYQA7xbu86X3V24TVm2VbjhAJsrZMc",
            authDomain: "fastjobs-59969.firebaseapp.com",
            databaseURL: "https://fastjobs-59969.firebaseio.com",
            projectId: "fastjobs-59969",
            storageBucket: "fastjobs-59969.appspot.com",
            messagingSenderId: "949937939862",
            appId: "1:949937939862:web:19d46788005fa26453a9b7",
            measurementId: "G-S9E5MBMWHK"
          };
          firebase.initializeApp(config);

          console.log("firebase initialized");
    };

    $scope.getSettings = function(){
        var db = firebase.firestore();
        var index = 1;
        db.collection("post").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                $scope.$apply(function () {
                    $scope.posts.push({
                        'index': index,
                        id:doc.id,
                        'category':doc.data().category,
                        'title':doc.data().title,
                        'application':doc.data().application,
                        'company':doc.data().company,
                        'content':doc.data().content,
                        'deadline':doc.data().deadline,
                        'free':doc.data().free,
                        'image':doc.data().image,
                        'language':doc.data().language,
                    });
                });
                index++;
            });
        });
    };

    $scope.updateSettings = function(){

    }

});

/**
 * manageapp controller
 */

app.controller('manageAppController',function($scope,$http,csrf_token,BASE_URL){

    $scope.manageapp = {};

    $scope.create = function(id){

        $http({
            method : "POST",
            url    : BASE_URL+"/api/android/accesspermission/"+id+"/store",
            data   : $scope.manageapp,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
                }
            }
        ).then(
            function success(responce){

            $('#usercreate').modal('hide');
            $scope.status = responce.data.status

            $scope.manageapp = {};

            $('#users_id').removeClass('has-error');
            $('#error-users_id').html("");
            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

        },function error(responce){
            if(responce.data.errors.hasOwnProperty('users_id')){
                $('#users_id').addClass('has-error');
                $('#error-users_id').html(responce.data.errors.users_id);
            }else{
                $('#users_id').removeClass('has-error');
                $('#error-users_id').html("");
            }
            toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
        });

    };
});

/**
 * Manage telco apps
 */
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

            $scope.managetelcoapp = {};

            $('#users_id').removeClass('has-error');
            $('#error-users_id').html("");
            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

        },function error(responce){
            if(responce.data.errors.hasOwnProperty('users_id')){
                $('#users_id').addClass('has-error');
                $('#error-users_id').html(responce.data.errors.users_id);
            }else{
                $('#users_id').removeClass('has-error');
                $('#error-users_id').html("");
            }
            toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
        });

    };
});

/**
 * Message controller
 */

app.controller('messageController', function($scope, $http, csrf_token, BASE_URL) {

    $scope.message = {};

    $scope.sendToMany = function(id) {
        $('#sendmessage').modal('hide');


        $http({
            method: "POST",
            url: BASE_URL + "/app/message/" + id + "/sendtomany",
            data: $scope.message,
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            }
        }).then(function success(responce) {

            $('#updateBasic').modal('hide');

            $scope.status = responce.data.status

            if (responce.data.status == 100) {

            } else if (responce.data.status == 101) {

            }

        }, function error(responce) {
            console.log(responce);
        });

        toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Message sent.");
        $scope.message = {};
    }

    $scope.sendToAstro = function(id) {
        $('#sendmessage').modal('hide');


        $http({
            method: "POST",
            url: BASE_URL + "/app/message/" + id + "/sendToAstro",
            data: $scope.message,
            headers: {
                'X-CSRF-TOKEN': csrf_token,
            }
        }).then(function success(responce) {

            $('#updateBasic').modal('hide');

            $scope.status = responce.data.status

            if (responce.data.status == 100) {

            } else if (responce.data.status == 101) {

            }

        }, function error(responce) {
            console.log(responce);
        });

        toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Message sent.");
        $scope.message = {};
    }

});
/**
 * Otp controller
 */

app.controller('otpController',function($scope,$http,csrf_token,BASE_URL){
    $scope.data = {};
    $scope.otp = {};
    $scope.otp.client = "MOBILEAPP";
    $scope.otp.device = "android";
    $scope.otp.os = "android";
    $scope.otp.appCode = "test";

    $scope.data.isGradiet = 1;
    $scope.style = {};



    $scope.otpRequest= function(key){

        $('#rj-overlay').fadeIn();
        $http(
            {
                method : "POST",
                url : BASE_URL + '/api/otp/request/'+key,
                data : $scope.otp,
                headers : {
                    'X-CSRF-TOKEN' :csrf_token,
                }
            }
        )
        .then(
            function(responce){
                $('#rj-overlay').fadeOut();
                if(responce.data.status == 100){

                    if(responce.data.data.statusCode == 'S1000'){

                        console.log( responce.data.data);
                        $('#error-subscriberId').html('Request Success');
                        $scope.otp.referenceNo = responce.data.data.referenceNo;

                        $('#otp-request').addClass("d-none");
                        $('#otp-verify').removeClass("d-none");

                    }else if(responce.data.data.statusCode == 'E1853'){
                        $('#error-subscriberId').html("Maximum number of OTP requests reached for "+ $scope.data.subscriberId);
                    }else if(responce.data.data.statusCode == 'E1856'){
                        $('#error-subscriberId').html("Invalid Request");
                    }else if(responce.data.data.statusCode == 'E1857'){
                        $('#error-subscriberId').html("Internal Server Error Occur");
                    }else if(responce.data.data.statusCode == 'E1301'){
                        $('#error-subscriberId').html("Please Enter Valid Number");
                    }else{
                        $('#error-subscriberId').html("Unknown Error Occur. Please Try again");
                    }
                }else{
                    if(responce.data.errors.hasOwnProperty('subscriberId')){
                        $('#error-subscriberId').html(responce.data.errors.subscriberId);
                    }else{
                        $('#error-subscriberId').html('');
                    }
                }
            }
        );
    };

    $scope.otpVerify = function(key){
        $('#rj-overlay').fadeIn();
        $http(
            {
                method : "POST",
                url : BASE_URL + '/api/otp/verify/'+key,
                data : $scope.otp,
                headers : {
                    'X-CSRF-TOKEN' :csrf_token,
                }
            }
        )
        .then(
            function(responce){
                $('#rj-overlay').fadeOut();
                window.scrollTo(0,0);
                if(responce.data.status == 100){
                    if(responce.data.data.statusCode == 'S1000'){
                        $('#error-otp').html('Request Success');
                        $('#otp-verify').addClass("d-none");
                        $('#otp-success').removeClass("d-none");
                        $('#side-logo').addClass("d-none");

                    }else if(responce.data.data.statusCode == 'E1850'){
                        $('#error-otp').html("Invalid PIN Number.");
                    }else if(responce.data.data.statusCode == 'E1856'){
                        $('#error-otp').html("Invalid Request.");
                    }else if(responce.data.data.statusCode == 'E1851'){
                        $('#error-otp').html("PIN Number has been expired.");
                    }else if(responce.data.data.statusCode == 'E1852'){
                        $('#error-otp').html("Maximum number of OTP attempts had reached.");
                    }else if(responce.data.data.statusCode == 'E1854'){
                        $('#error-otp').html("Could not find OTP.");
                    }else if(responce.data.data.statusCode == 'E1855'){
                        $('#error-otp').html("Invalid Reference Number.");
                    }else if(responce.data.data.statusCode == 'E1857'){
                        $('#error-otp').html("Internal Server Error Occur.");
                    }else if(responce.data.data.statusCode == 'E1301'){
                        $('#error-otp').html("Requested ApplicationID is not allowed within the System for operator unknown.");
                    }else{
                        $('#error-otp').html("Unknown Error Occur. Please Try again");
                    }
                }else{
                    if(responce.data.errors.hasOwnProperty('otp')){
                        $('#error-otp').html(responce.data.errors.otp);
                    }else{
                        $('#error-otp').html('');
                    }
                }
            }
        );
    }


    $scope.getAppData = function(id){
        $http({
            method : "GET",
            url    : BASE_URL+"/api/webapp/show/"+id,
        }).then(function success(responce){
            $scope.data = responce.data.data;
            $scope.setStyle();
            $scope.facebookPixcel();
        },function error(responce){

        });
    };

    $scope.setStyle = function(){
        $scope.style.bg= {
            "background-image": "-moz-linear-gradient(-86deg, "+$scope.data.primaryColor+" 0%, "+$scope.data.primaryLightColor+" 100%)",
            "background-image": "-webkit-linear-gradient(-86deg, "+$scope.data.primaryColor+" 0%, "+$scope.data.primaryLightColor+" 100%)",
            " background-image": "-ms-linear-gradient(-86deg, "+$scope.data.primaryColor+" 0%, "+$scope.data.primaryLightColor+" 100%)",
        };

        $scope.style.priceColor = {
            "color":$scope.data.priceColor,
        }
    }

    $scope.facebookPixcel = function(){
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', $scope.data.facebookPixcel);
        fbq('track', 'PageView');
    }


});

/**
 * Schedule message
 */

app.controller('scheduleMessageController', function($scope, $http, csrf_token, BASE_URL) {

    $scope.createSchedule = function(id, key) {

        console.log("clicked");
        $http({
                method: "POST",
                url: BASE_URL + "/app/schedules/create/" + id,
                data: $scope.appdata,
                headers: {
                    'X-CSRF-TOKEN': csrf_token,
                }
            })
            .then(
                function(responce) {
                    if (responce.data.status == 101) {
                        if (responce.data.errors.hasOwnProperty('message')) {
                            $('#message').addClass('has-error');
                            $('#error-message').html(responce.data.errors.message);
                        } else {
                            $('#message').removeClass('has-error');
                            $('#error-message').html();
                        }
                    } else {
                        location.href = BASE_URL + "/app/schedules/" + key;
                    }
                }
            );
    };
});

/**
 * Schedule Types
 */

app.controller('scheduleTypesController', function($scope, $http, csrf_token, BASE_URL) {

    $scope.scheduletype = {};

    $scope.create = function() {

        console.log("clicked the button");
        $http({
                method: "POST",
                url: BASE_URL + "/administrator/schedules/types/store",
                data: $scope.scheduletype,
                headers: {
                    'X-CSRF-TOKEN': csrf_token,
                }
            })
            .then(
                function success(responce) {
                    $('#scheduletype').modal('hide');
                    $scope.status = responce.data.status

                    if (responce.data.status == 100) {

                        $scope.user = {};

                        $('#method').removeClass('has-error');
                        $('#error-method').html("");

                        $('#description').removeClass('has-error');
                        $('#error-description').html("");

                        toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

                    } else if (responce.data.status == 101) {
                        if (responce.data.errors) {
                            if (responce.data.errors.hasOwnProperty('method')) {
                                $('#method').addClass('has-error');
                                $('#error-method').html(responce.data.errors.method);
                            } else {
                                $('#roles_methodid').removeClass('has-error');
                                $('#error-method').html("");
                            }

                            if (responce.data.errors.hasOwnProperty('description')) {
                                $('#description').addClass('has-error');
                                $('#error-description').html(responce.data.errors.description);
                            } else {
                                $('#description').removeClass('has-error');
                                $('#error-description').html("");
                            }

                        }
                        toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
                    }
                },
                function error(responce) {

                }
            );

    }

    $scope.update = function(id) {

        console.log("clicked the button");
        $http({
                method: "POST",
                url: BASE_URL + "/administrator/schedules/types/" + id + "/update",
                data: $scope.scheduletype,
                headers: {
                    'X-CSRF-TOKEN': csrf_token,
                }
            })
            .then(
                function success(responce) {
                    $('#scheduletype').modal('hide');
                    $scope.status = responce.data.status

                    if (responce.data.status == 100) {

                        $scope.user = {};

                        $('#method').removeClass('has-error');
                        $('#error-method').html("");

                        $('#description').removeClass('has-error');
                        $('#error-description').html("");

                        toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

                    } else if (responce.data.status == 101) {
                        if (responce.data.errors) {
                            if (responce.data.errors.hasOwnProperty('method')) {
                                $('#method').addClass('has-error');
                                $('#error-method').html(responce.data.errors.method);
                            } else {
                                $('#roles_methodid').removeClass('has-error');
                                $('#error-method').html("");
                            }

                            if (responce.data.errors.hasOwnProperty('description')) {
                                $('#description').addClass('has-error');
                                $('#error-description').html(responce.data.errors.description);
                            } else {
                                $('#description').removeClass('has-error');
                                $('#error-description').html("");
                            }

                        }
                        toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
                    }
                },
                function error(responce) {

                }
            );

    }

    $scope.getsheduleById = function(id) {
        $http({
            method: "GET",
            url: BASE_URL + "/administrator/schedules/types/get/" + id,
        }).then(function success(responce) {

            $scope.scheduletype = responce.data.data;

        }, function error(responce) {

        });
    }
});
/**
 * Settings
 */

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

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");


        },function error(responce){
            $('#setting').modal('hide');
            toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
        });
    };
});

/**
 * subscribe controller
 */

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
 * support controller
 */
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
 * user controller
 */


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

            

        },function error(responce){
            $('#usercreate').modal('hide');
            
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

            toastr.error("<i class='fa fa-warning'></i> &nbsp; Some required fields are missing.");
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

        },function error(responce){
            $('#usercreate').modal('hide');

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
            toastr.error("<i class='fa fa-warning'></i> &nbsp;Oops! Some required fields are missing.");
        });

    };
});

/**
 * user settings controller
 */

app.controller('userSettingsController',function($scope,$http,csrf_token,BASE_URL){

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

            console.log("responce" + responce);

            $scope.status = responce.data.status

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


        },function error(responce){

            $('#updateBasic').modal('hide');

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
            toastr.error("<i class='fa fa-warning'></i> &nbsp; Oops! Something went wrong.");
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

        },function error(responce){
            $('#updateOrganization').modal('hide');

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
                toastr.error("<i class='fa fa-warning'></i> &nbsp; Oops! Something went wrong.");
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

            $('#newpassword').removeClass('has-error');
            $('#error-newpassword').html("");

            $('#currentpassword').removeClass('has-error');
            $('#error-currentpassword').html("");

            $scope.data = responce.data.data;
            $scope.errors = null;

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

        },function error(responce){
            $('#updateSequrity').modal('hide');

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
            toastr.error("<i class='fa fa-warning'></i> &nbsp; Oops! Something went wrong.");
        });

    }
});
/**
 * webapp controller
 */

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

            $('#webapptheam_error').removeClass('has-error');
            $scope.webAppErrors.webapptheams_id = "";
            window.location.href= BASE_URL+"/webapp/dashboard/"+responce.data.data.key;

        },function error(responce){
            if(responce.data.errors.hasOwnProperty('webapptheams_id')){
                $('#webapptheam_error').addClass('has-error');
                $scope.webAppErrors.webapptheams_id = responce.data.errors.webapptheams_id[0];
            }else{
                $('#webapptheam_error').removeClass('has-error');
                $scope.webAppErrors.webapptheams_id = "";
            }
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

            $('#title').removeClass('has-error');
            $('#app-name').removeClass('has-error');
            $('#price').removeClass('has-error');
            $('#dialogapp_id').removeClass('has-error');
            $('#mobitelapp_id').removeClass('has-error');
            $('#phoneLabel').removeClass('has-error');
            $('#pinLabel').removeClass('has-error');
            $('#successMessage').removeClass('has-error');

            $scope.settingErrors.title = "";
            $scope.settingErrors.price = "";

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");

        },function error(responce){

            
            if(responce.data.errors.hasOwnProperty('title')){
                $('#title').addClass('has-error');
                $scope.settingErrors.title = responce.data.errors.title[0];
            }else{
                $('#title').removeClass('has-error');
                $scope.settingErrors.title = "";
            }

            if(responce.data.errors.hasOwnProperty('name')){
                $('#app-name').addClass('has-error');
                $scope.settingErrors.name = responce.data.errors.name[0];
            }else{
                $('#app-name').removeClass('has-error');
                $scope.settingErrors.name = "";
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

            if(responce.data.errors.hasOwnProperty('mobitelapp_id')){
                $('#mobitelapp_id').addClass('has-error');
                $scope.settingErrors.mobitelapp_id = responce.data.errors.mobitelapp_id[0];
            }else{
                $('#mobitelapp_id').removeClass('has-error');
                $scope.settingErrors.mobitelapp_id = "";
            }

            if(responce.data.errors.hasOwnProperty('phoneLabel')){
                $('#phoneLabel').addClass('has-error');
                $scope.settingErrors.phoneLabel = responce.data.errors.phoneLabel[0];
            }else{
                $('#phoneLabel').removeClass('has-error');
                $scope.settingErrors.phoneLabel = "";
            }

            if(responce.data.errors.hasOwnProperty('pinLabel')){
                $('#pinLabel').addClass('has-error');
                $scope.settingErrors.pinLabel = responce.data.errors.pinLabel[0];
            }else{
                $('#pinLabel').removeClass('has-error');
                $scope.settingErrors.pinLabel = "";
            }

            if(responce.data.errors.hasOwnProperty('successMessage')){
                $('#successMessage').addClass('has-error');
                $scope.settingErrors.successMessage = responce.data.errors.successMessage[0];
            }else{
                $('#successMessage').removeClass('has-error');
                $scope.settingErrors.successMessage = "";
            }

            if(responce.data.errors.hasOwnProperty('successMessage')){
                $('#successMessage').addClass('has-error');
                $scope.settingErrors.successMessage = responce.data.errors.successMessage[0];
            }else{
                $('#successMessage').removeClass('has-error');
                $scope.settingErrors.successMessage = "";
            }

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
            $('#webapptheams_id').removeClass('has-error');
            $('#updatewebapp').modal('toggle');
            $scope.getAppSettings($scope.setting.key);
            $scope.settingErrors.webapptheams_id = "";

            toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");
            
        },function error(responce){
            if(responce.data.errors.hasOwnProperty('webapptheams_id')){
                $('#webapptheams_id').addClass('has-error');
                $scope.settingErrors.webapptheams_id = responce.data.errors.webapptheams_id[0];
            }else{
                $('#webapptheams_id').removeClass('has-error');
                $scope.settingErrors.webapptheams_id = "";
            }
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
 * short url
 */
app.controller('shortController',function($scope,$http,csrf_token,BASE_URL){

    $scope.shortUrl = {};
    $scope.shortUrlErrors = {};
   
    $scope.createShortUrl = function(){
        $http({
            method : "POST",
            url    : BASE_URL+"/api/shorturl/store",
            data   : $scope.shortUrl,
            headers:{
                'X-CSRF-TOKEN':csrf_token,
            }
        }).then(function success(responce){

            $('#error_name').removeClass('has-error');
            $scope.shortUrlErrors.error_name = "";

            $('#error_longurl').removeClass('has-error');
            $scope.shortUrlErrors.error_name = "";

            window.location.href= BASE_URL+"/shorturl/home/";

        },function error(responce){
            if(responce.data.errors.hasOwnProperty('name')){
                $('#error_name').addClass('has-error');
                $scope.shortUrlErrors.name = responce.data.errors.name[0];
            }else{
                $('#error_name').removeClass('has-error');
                $scope.shortUrlErrors.webapptheams_id = "";
            }

            if(responce.data.errors.hasOwnProperty('longUrl')){
                $('#webapptheam_error').addClass('has-error');
                $scope.shortUrlErrors.longUrl = responce.data.errors.longUrl[0];
            }else{
                $('#webapptheam_error').removeClass('has-error');
                $scope.shortUrlErrors.longUrl = "";
            }
        });
    }
});

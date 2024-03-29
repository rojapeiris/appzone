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

            if(responce.data.status ==100){
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


            }else if(responce.data.status ==101){

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

            }
        },function error(responce){

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

            if(responce.data.status ==100){
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

            }else if(responce.data.status ==101){

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

            }
        },function error(responce){

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

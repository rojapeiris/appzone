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

            if(responce.data.status ==100){
                $('#name').removeClass('has-error');
                $('#thumbnail').removeClass('has-error');

                $scope.androidCategoryDataErrors.titnamele = "";
                $scope.androidCategoryDataErrors.thumbnail = "";

                $scope.androidCategoryData.name = "";
                $scope.androidCategoryData.thumbnail ="";

                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; Post created successfully");

            }else if(responce.data.status ==101){

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

});

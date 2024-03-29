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

            if(responce.data.status ==100){
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

            }else if(responce.data.status ==101){

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

            }
        },function error(responce){

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

            if(responce.data.status ==100){
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

            }else if(responce.data.status ==101){

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

            }
        },function error(responce){

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

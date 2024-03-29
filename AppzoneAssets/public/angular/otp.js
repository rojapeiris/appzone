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
* changed
*/




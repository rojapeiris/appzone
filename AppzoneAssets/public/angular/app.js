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

            if (responce.data.status == 100) {

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

            } else if (responce.data.status == 101) {

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

            }


        }, function error(responce) {

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

            if (responce.data.status == 100) {
                $scope.getAppSettings($scope.setting.key);
                toastr.success("<i class='fa fa-check-circle'></i> &nbsp; We're updating your details");
            } else if (responce.data.status == 101) {

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


            }

        }, function error(responce) {

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

/// testff s
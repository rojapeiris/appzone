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
* changed
*/
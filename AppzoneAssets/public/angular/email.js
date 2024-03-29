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

            if (responce.data.status == 100) {
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

            } else if (responce.data.status == 101) {

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

            }
        }, function error(responce) {

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
* changed
*/
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
* changed
*/
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
* changed
*/
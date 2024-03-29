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
                    if (responce.data.status == 100) {
                        $scope.questionData.content = "";
                        $scope.questionData.answer = "";
                        $scope.answers = [{ answer: 1 }];

                        toastr.success(
                            "<i class='fa fa-check-circle'></i> &nbsp; Post created successfully"
                        );
                    } else if (responce.data.status == 101) {
                        if (responce.data.errors.hasOwnProperty("content")) {
                            $("#content").addClass("has-error");
                            $scope.questionDataError.content =
                                responce.data.errors.content[0];
                        } else {
                            $("#content").removeClass("has-error");
                            $scope.questionDataError.content = "";
                        }
                    }
                },
                function error(responce) {}
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
                    if (responce.data.status == 100) {
                        toastr.success(
                            "<i class='fa fa-check-circle'></i> &nbsp; Post created successfully"
                        );
                    } else if (responce.data.status == 101) {
                        if (responce.data.errors.hasOwnProperty("content")) {
                            $("#content").addClass("has-error");
                            $scope.questionDataError.content =
                                responce.data.errors.content[0];
                        } else {
                            $("#content").removeClass("has-error");
                            $scope.questionDataError.content = "";
                        }
                    }
                },
                function error(responce) {}
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

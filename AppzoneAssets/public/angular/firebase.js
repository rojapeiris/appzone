app.controller('firebaseController',function($scope,$http,csrf_token,BASE_URL){

    $scope.posts =[];

    $scope.initFirebase = function(){
        var config = {
            apiKey: "AIzaSyDskcYQA7xbu86X3V24TVm2VbjhAJsrZMc",
            authDomain: "fastjobs-59969.firebaseapp.com",
            databaseURL: "https://fastjobs-59969.firebaseio.com",
            projectId: "fastjobs-59969",
            storageBucket: "fastjobs-59969.appspot.com",
            messagingSenderId: "949937939862",
            appId: "1:949937939862:web:19d46788005fa26453a9b7",
            measurementId: "G-S9E5MBMWHK"
          };
          firebase.initializeApp(config);

          console.log("firebase initialized");
    };

    $scope.getSettings = function(){
        var db = firebase.firestore();
        var index = 1;
        db.collection("post").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                $scope.$apply(function () {
                    $scope.posts.push({
                        'index': index,
                        id:doc.id,
                        'category':doc.data().category,
                        'title':doc.data().title,
                        'application':doc.data().application,
                        'company':doc.data().company,
                        'content':doc.data().content,
                        'deadline':doc.data().deadline,
                        'free':doc.data().free,
                        'image':doc.data().image,
                        'language':doc.data().language,
                    });
                });
                index++;
            });
        });
    };

    $scope.updateSettings = function(){

    }

});

/**
* changed
*/
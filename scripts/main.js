(function () {
    var canvasElement = document.getElementById("the-canvas"),
        canvasRenderer = renderer.getCanvas(canvasElement),
        game = games.get(canvasRenderer),
        highScoreList = document.getElementById("score-list"),
        startBtn = document.getElementById("startBtn");
        startBtn.addEventListener("click", function (ev) {
            game.start();
            startBtn.disabled = true;
        });
    function addScore() {
        Parse.initialize("gPqCepg4p24YXTHI0BwFGGBY56LrpgjrG08R2QVf", "V9xbHOPE64TRnPPAQRYcJdp22f0glmvRqD0nMfTw");
        var GameScore = Parse.Object.extend("GameScore");
        var gameScore = new GameScore();
        var score = theGame.doneScore;
        var name = prompt("Enter your name:");
        while (name == null || name == undefined || name == ""||name.length>30||name.length<=3) {
            name = prompt("Enter a valid name:");
        }
        gameScore.set("score", score);
        gameScore.set("playerName", name);
        gameScore.save(null, {
            success: function (gameScore) {
                // Execute any logic that should take place after the object is saved.
                alert('Score added.');
                score = 0;
                theGame.doneScore = 0;
                theGame.score = 0;
            },
            error: function (gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new high score: ' + error.description);
            }
        });
    }
    function reset() {
        location.reload();
    }
    function getHighScore() {
        var scores = [];
        Parse.initialize("gPqCepg4p24YXTHI0BwFGGBY56LrpgjrG08R2QVf", "V9xbHOPE64TRnPPAQRYcJdp22f0glmvRqD0nMfTw");
        var GameScore = Parse.Object.extend("GameScore");
        var query = new Parse.Query(GameScore);
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    scores.push({ id: object.id, name: object.get("playerName"), score: object.get("score") });

                }
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        }).then(
        function () {
            scores.sort(function (a, b) { return b.score - a.score });

        }).then(function () {
            var len = scores.length;
            if (len >= 10) {
                for (var i = 0; i < 10; i++) {
                    highScoreList.innerHTML += "<tr><td class='num'>" + (i + 1) + ".</td>" + "<td>" + scores[i].name + "</td><td>" + scores[i].score + "</td></tr>";
                }
            }
            if (len < 10) {
                for (var i = 0; i < scores.length; i++) {
                    highScoreList.innerHTML += "<tr><td class='num'>" + (i + 1) + ".</td>" + "<td>" + scores[i].name + "</td><td>" + scores[i].score + "</td></tr>";
                }
            }
        });

    }
    getHighScore();
    var resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", reset, false);
    var sendScore = document.getElementById("send-score");
    sendScore.addEventListener("click", addScore, false);

})();
var drinks = (function () {
    var direction;
    function GameObject(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    GameObject.prototype.getPosition = function () {
        return {
            x: this.x,
            y: this.y
        };
    }

    function Beer(x, y, speed) {
        GameObject.call(this, x, y, speed);
    }
    Beer.prototype = new GameObject();
    Beer.prototype.constructor = Beer;
    Beer.prototype.move = function (speed) {
        this.y += speed;
    }

    function Rakia(x, y, speed) {
        GameObject.call(this, x, y, speed);
    }
    Rakia.prototype = new GameObject();
    Rakia.prototype.constructor = Rakia;
    Rakia.prototype.move = function (speed) {
        this.y += speed;
    }

    function Rock(x, y, speed) {
        GameObject.call(this, x, y, speed);
    }
    Rock.prototype = new GameObject();
    Rock.prototype.constructor = Rock;
    Rock.prototype.move = function (speed) {
        this.y += speed;
    }

    function Dwarf(x, y, speed) {
        GameObject.call(this, x, y, speed);
    }
    Dwarf.prototype = new GameObject();
    Dwarf.prototype.constructor = Dwarf;
    Dwarf.prototype.move = function () {
        if (this.direction == "left") {
            this.x -= this.speed;
        }
        if (this.direction == "right") {
            this.x += this.speed;
        }
    }


    return {
        getDwarf: function (x, y, speed) {
            return new Dwarf(x, y, speed);
        },
        getBeer: function (x, y, speed) {
            return new Beer(x, y, speed);
        },
        getRakia: function (x, y, speed) {
            return new Rakia(x, y, speed);
        },
        getRock: function (x, y, speed) {
            return new Rock(x, y, speed);
        },
        BeerType: Beer,
        RakiaType: Rakia,
        RockType: Rock,
        DwarfType: Dwarf
    };

}());
var renderer = (function () {

    function CanvasRenderer(selector) {
        if (selector instanceof HTMLCanvasElement) {
            this.canvas = selector;
        } else if (typeof selector === "String" ||
			typeof selector === "string") {
            this.canvas = document.querySelector(selector);
        }
    }

    var dwarfImg = new Image;
    dwarfImg.src = "pictures/Dwarf.png";
    var dwarfImmuneImg = new Image;
    dwarfImmuneImg.src = "pictures/Dwarf-Immune.png";

    var drawDwarf = function (canvas, dwarf) {
        var ctx = canvas.getContext("2d");
        var position = dwarf.getPosition();
        ctx.drawImage(dwarfImg, position.x, position.y - 80, 30, 80);
    }
    var drawDwarfImmune = function (canvas, dwarf) {
        var ctx = canvas.getContext("2d");
        var position = dwarf.getPosition();
        ctx.drawImage(dwarfImmuneImg, position.x, position.y - 80, 30, 80);
    }
    var drawBeer = function (canvas, beer) {
        var ctx = canvas.getContext("2d");
        var position = beer.getPosition();
        //bottle
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(position.x, position.y - 25);
        ctx.lineTo(position.x + 5, position.y - 30);
        ctx.lineTo(position.x + 5, position.y - 40);
        ctx.lineTo(position.x + 10, position.y - 40);
        ctx.lineTo(position.x + 10, position.y - 30);
        ctx.lineTo(position.x + 15, position.y - 25);
        ctx.lineTo(position.x + 15, position.y);
        ctx.lineTo(position.x + 13, position.y + 2);
        ctx.lineTo(position.x + 2, position.y + 2);
        ctx.lineTo(position.x, position.y);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "#B85C00";
        ctx.fill();

        //(b)
        ctx.beginPath();
        ctx.moveTo(position.x + 4, position.y - 2);
        ctx.lineTo(position.x + 11, position.y - 2);
        ctx.lineTo(position.x + 11, position.y - 6);
        ctx.lineTo(position.x + 7, position.y - 6);
        ctx.lineTo(position.x + 7, position.y - 2);
        ctx.moveTo(position.x + 7, position.y - 6);
        ctx.lineTo(position.x + 4, position.y - 6);
        ctx.lineTo(position.x + 4, position.y - 2);
        //(e)
        ctx.moveTo(position.x + 4, position.y - 9);
        ctx.lineTo(position.x + 11, position.y - 9);
        ctx.lineTo(position.x + 11, position.y - 13);
        ctx.moveTo(position.x + 7, position.y - 9);
        ctx.lineTo(position.x + 7, position.y - 13);
        ctx.moveTo(position.x + 4, position.y - 9);
        ctx.lineTo(position.x + 4, position.y - 13);
        //(e)
        ctx.moveTo(position.x + 4, position.y - 16);
        ctx.lineTo(position.x + 11, position.y - 16);
        ctx.lineTo(position.x + 11, position.y - 20);
        ctx.moveTo(position.x + 7, position.y - 16);
        ctx.lineTo(position.x + 7, position.y - 20);
        ctx.moveTo(position.x + 4, position.y - 16);
        ctx.lineTo(position.x + 4, position.y - 20);
        //(R)
        ctx.moveTo(position.x + 4, position.y - 23);
        ctx.lineTo(position.x + 12, position.y - 23);
        ctx.moveTo(position.x + 4, position.y - 23);
        ctx.lineTo(position.x + 6, position.y - 26);
        ctx.lineTo(position.x + 8, position.y - 23);
        ctx.lineTo(position.x + 11, position.y - 26);

        ctx.stroke();
    }
    var drawRakia = function (canvas, rakia) {
        var ctx = canvas.getContext("2d");
        var position = rakia.getPosition();
        //bottle
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(position.x, position.y - 25);
        ctx.lineTo(position.x + 5, position.y - 30);
        ctx.lineTo(position.x + 5, position.y - 40);
        ctx.lineTo(position.x + 10, position.y - 40);
        ctx.lineTo(position.x + 10, position.y - 30);
        ctx.lineTo(position.x + 15, position.y - 25);
        ctx.lineTo(position.x + 15, position.y);
        ctx.lineTo(position.x + 13, position.y + 2);
        ctx.lineTo(position.x + 2, position.y + 2);
        ctx.lineTo(position.x, position.y);
        ctx.strokeStyle = "orange";
        ctx.stroke();
        ctx.fillStyle = "lightblue";
        ctx.fill();
    }
    var drawRock = function (canvas, rock) {
        var ctx = canvas.getContext("2d");
        var position = rock.getPosition();
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(position.x, position.y)
        ctx.lineTo(position.x + 10, position.y + 2);
        ctx.lineTo(position.x + 5, position.y + 30);
        ctx.closePath();
        ctx.fillStyle = "lightblue";
        ctx.fill();
        ctx.stroke();

    }

    CanvasRenderer.prototype = {
        draw: function (obj) {
            if (obj instanceof drinks.DwarfType && theGame.rakiaEffect == 0) {
                drawDwarf(this.canvas, obj);
            }
            else if (obj instanceof drinks.DwarfType && theGame.rakiaEffect != 0) {
                drawDwarfImmune(this.canvas, obj);
            }
            else if (obj instanceof drinks.BeerType) {
                drawBeer(this.canvas, obj);
            }
            else if (obj instanceof drinks.RakiaType) {
                drawRakia(this.canvas, obj);
            }
            else if (obj instanceof drinks.RockType) {
                drawRock(this.canvas, obj);
            }
        },
        clear: function () {
            var ctx = this.canvas.getContext("2d");
            var w = this.canvas.width;
            var h = this.canvas.height;
            ctx.clearRect(0, 0, w, h);
        },
        drawInfo: function () {
            var ctx = this.canvas.getContext("2d");
            ctx.font = "20px Georgia";
            ctx.fillStyle = "black";
            ctx.fillText("Level: " + theGame.lvl, 10, 470);
            ctx.fillText("Score: " + theGame.score, 10, 490);
        },
        drawBeerRakiaEffect: function () {
            var ctx = this.canvas.getContext("2d");
            if (theGame.beerEffect > 0 && theGame.rakiaEffect == 0) {
                ctx.font = "30px Georgia";
                ctx.fillStyle = "purple";
                ctx.fillText("Under the effect of the beer !", 230, 70);
                ctx.fillText("Time: " + theGame.beerEffect, 270, 100);
            }
            else if (theGame.rakiaEffect > 0 && theGame.beerEffect == 0) {
                ctx.font = "30px Georgia";
                ctx.fillStyle = "yellow";
                ctx.fillText("Under the effect of the rakia !", 230, 70);
                ctx.fillText("Time: " + theGame.rakiaEffect, 270, 100);
            }
            else if (theGame.rakiaEffect > 0 && theGame.beerEffect > 0) {
                ctx.font = "30px Georgia";
                ctx.fillStyle = "purple";
                ctx.fillText("Under the effect of the beer !", 230, 70);
                ctx.fillText("Time: " + theGame.beerEffect, 270, 100);
                ctx.fillStyle = "yellow";
                ctx.fillText("Under the effect of the rakia !", 230, 130);
                ctx.fillText("Time: " + theGame.rakiaEffect, 270, 160);
            }
        },
        drawEndGame: function () {
            var ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, 800, 500);
            ctx.fillStyle = "black";
            ctx.font = "120px Georgia";
            ctx.fillText("GAME OVER!", 20, 250);
            ctx.font = "26px Georgia";
            ctx.fillText("Your score is: " + theGame.doneScore, 100, 300);
        }
    }

    return {
        getCanvas: function (selector) {
            return new CanvasRenderer(selector);
        }
    };

}());
var games = (function () {
    function Game(renderer) {
        this.renderer = renderer;
        this.dwarf = new drinks.getDwarf(400, 500, 8);
        this.fallingRocks = [];
        this.fallingBeers = [];
        this.fallingRakias = [];
        this.bindKeyEvents();
        this.state = "stopped";
        this.score = 0;
        this.lvl = 0;
        this.rakiaEffect = 0;
        this.beerEffect = 0;
        this.rockCounter = 100;
        this.beerCounter = 150;
        this.rakiaCounter = 600;
        this.rockInterval = 50;
        this.beerInterval = 150;
        this.rakiaInterval = 600;
        this.fallSpeed = 4;
        this.doneScore = 0;
    }
    //function createRakia() {
    //    var x = getRandomValue(0, 800);
    //    var rakia = new drinks.getRakia(x, 10, 4);
    //    theGame.fallingRakias.push(rakia);
    //}
    //function createBeer() {
    //    var x = getRandomValue(0, 800);
    //    var beer = new drinks.getBeer(x, 10, 4);
    //    theGame.fallingBeers.push(beer);
    //}
    //function createRock() {
    //    var x = getRandomValue(0, 800);
    //    var rock = new drinks.getRock(x, 10, 4);
    //    theGame.fallingRocks.push(rock);
    //}
    function getRandomValue(min, max) {
        return (Math.random() * (max - min) + min) | 0;
    }



    function animationFrame() {

        theGame.score += 1;
        if (theGame.score % 1000 === 0) {
            theGame.lvl += 1;
        }
        //the levels of the game
        switch (theGame.lvl) {
            case 0: theGame.fallSpeed = 3; theGame.rockInterval = 50; theGame.beerInterval = 150; theGame.rakiaInterval = 600; break;
            case 1: theGame.fallSpeed = 4; theGame.rockInterval = 40; theGame.beerInterval = 120; theGame.rakiaInterval = 550; break;
            case 2: theGame.fallSpeed = 4; theGame.rockInterval = 35; theGame.beerInterval = 110; theGame.rakiaInterval = 520; break;
            case 3: theGame.fallSpeed = 4; theGame.rockInterval = 30; theGame.beerInterval = 100; theGame.rakiaInterval = 500; break;
            case 4: theGame.fallSpeed = 4; theGame.rockInterval = 25; theGame.beerInterval = 90; theGame.rakiaInterval = 490; break;
            case 5: theGame.fallSpeed = 4; theGame.rockInterval = 20; theGame.beerInterval = 85; theGame.rakiaInterval = 480; break;
            case 6: theGame.fallSpeed = 4; theGame.rockInterval = 15; theGame.beerInterval = 80; theGame.rakiaInterval = 470; break;
            case 7: theGame.fallSpeed = 4; theGame.rockInterval = 10; theGame.beerInterval = 75; theGame.rakiaInterval = 460; break;
            case 8: theGame.fallSpeed = 5; theGame.beerInterval = 70; theGame.rakiaInterval = 440; break;
            case 9: theGame.fallSpeed = 6; theGame.rockInterval = 7; theGame.beerInterval = 60; break;
            case 10: theGame.fallSpeed = 7; theGame.rockInterval = 7; theGame.beerInterval = 60; break;
        }
        //making the rocks
        if (theGame.rockCounter == theGame.rockInterval) {
            theGame.createRock();
        }
        theGame.rockCounter--;
        if (theGame.rockCounter == 0) {
            theGame.rockCounter = theGame.rockInterval;
        }
        //making the beers
        if (theGame.beerCounter == theGame.beerInterval) {
            theGame.createBeer();
        }
        theGame.beerCounter--;
        if (theGame.beerCounter == 0) {
            theGame.beerCounter = theGame.beerInterval;
        }
        //making the rakias
        if (theGame.rakiaCounter == theGame.rakiaInterval) {
            theGame.createRakia();
        }
        theGame.rakiaCounter--;
        if (theGame.rakiaCounter == 0) {
            theGame.rakiaCounter = theGame.rakiaInterval;
        }
        //the dwarf
        theGame.renderer.clear();
        theGame.dwarf.move();
        if (theGame.dwarf.x + 30 >= 800) {
            theGame.dwarf.x -= theGame.dwarf.speed;
        }
        if (theGame.dwarf.x < 0) {
            theGame.dwarf.x += theGame.dwarf.speed;
        }
        theGame.renderer.draw(theGame.dwarf);
        //drawing, moving and removing the falling objects
        for (var i = 0; i < theGame.fallingBeers.length; i++) {
            theGame.fallingBeers[i].y += theGame.fallSpeed;
            theGame.renderer.draw(theGame.fallingBeers[i]);
            if (theGame.fallingBeers[i].y - 80 >= 500) {
                theGame.fallingBeers.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < theGame.fallingRocks.length; i++) {
            theGame.fallingRocks[i].y += theGame.fallSpeed;
            theGame.renderer.draw(theGame.fallingRocks[i]);
            if (theGame.fallingRocks[i].y >= 500) {
                theGame.fallingRocks.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < theGame.fallingRakias.length; i++) {
            theGame.fallingRakias[i].y += theGame.fallSpeed;
            theGame.renderer.draw(theGame.fallingRakias[i]);
            if (theGame.fallingRakias[i].y - 80 >= 500) {
                theGame.fallingRakias.splice(i, 1);
                i--;
            }
        }
        //beer and rakia effects
        for (var i = 0; i < theGame.fallingBeers.length; i += 1) {

            if (((theGame.fallingBeers[i].x + 15 >= theGame.dwarf.x)
                && (theGame.fallingBeers[i].x - 15 <= theGame.dwarf.x + 30))
                && (theGame.fallingBeers[i].y + 2 >= theGame.dwarf.y - 80)) {
                theGame.dwarf.speed = 1;
                theGame.beerEffect = 400;
                theGame.fallingBeers.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < theGame.fallingRakias.length; i += 1) {

            if (((theGame.fallingRakias[i].x + 15 >= theGame.dwarf.x)
                && (theGame.fallingRakias[i].x - 15 <= theGame.dwarf.x + 30))
                && (theGame.fallingRakias[i].y + 2 >= theGame.dwarf.y - 80)) {
                theGame.rakiaEffect = 400;
                theGame.fallingRakias.splice(i, 1);
                i--;
            }
        }
        if (theGame.rakiaEffect > 0) {
            theGame.rakiaEffect -= 1;
        }
        if (theGame.beerEffect > 0) {
            theGame.beerEffect -= 1;
            if (theGame.beerEffect == 0) {
                theGame.dwarf.speed = 8;
            }
        }
        theGame.renderer.drawInfo();
        theGame.renderer.drawBeerRakiaEffect();
        //if dwarf get hit from a rock
        for (var i = 0; i < theGame.fallingRocks.length; i += 1) {
            if (((theGame.fallingRocks[i].x + 10 >= theGame.dwarf.x)
                && (theGame.fallingRocks[i].x <= theGame.dwarf.x + 30))
                && (theGame.fallingRocks[i].y + 30 >= theGame.dwarf.y - 80)
                && theGame.rakiaEffect == 0) {
                theGame.doneScore = theGame.score;
                theGame.stop();
                theGame.renderer.drawEndGame();
                theGame.score = 0;
                theGame.fallingBeers = [];
                theGame.fallingRakias = [];
                theGame.fallingRocks = [];
                break;

            }
        }

        if (theGame.state === "running") {
            requestAnimationFrame(animationFrame);
        }
    }
    Game.prototype = {
        start: function () {
            theGame = this;
            requestAnimationFrame(animationFrame);
            this.state = "running";
        },
        stop: function () {
            theGame.state = "stopped";
        },
        createRakia: function () {
            var x = getRandomValue(0, 800);
            var rakia = new drinks.getRakia(x, 10, 4);
            theGame.fallingRakias.push(rakia);
        },
        createBeer: function () {
            var x = getRandomValue(0, 800);
            var beer = new drinks.getBeer(x, 10, 4);
            theGame.fallingBeers.push(beer);
        },
        createRock: function () {
            var x = getRandomValue(0, 800);
            var rock = new drinks.getRock(x, 10, 4);
            theGame.fallingRocks.push(rock);
        },
        bindKeyEvents: function () {
            var self = this;
            document.body.addEventListener("keydown", function (ev) {
                var keyCode = ev.keyCode;
                if (keyCode == 37) {
                    theGame.dwarf.direction = "left";
                }
                if (keyCode == 39) {
                    theGame.dwarf.direction = "right";
                }
            });
            document.body.addEventListener("keyup", function (ev) {
                var keyCode = ev.keyCode;
                if (keyCode == 37) {
                    theGame.dwarf.direction = "none";
                }
                if (keyCode == 39) {
                    theGame.dwarf.direction = "none";
                }
            });

        },
        getState: function () {
            return this.state;
        }
    }

    return {
        get: function (renderer) {
            return new Game(renderer);
        }
    };
}());
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
        while (name == null || name == undefined || name == "" || name.length > 30 || name.length <= 3) {
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
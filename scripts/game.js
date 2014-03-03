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
            case 1: theGame.fallSpeed = 4;theGame.rockInterval = 40; theGame.beerInterval = 120; theGame.rakiaInterval = 550; break;
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
            if (theGame.fallingBeers[i].y - 40 >= 500) {
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
            if (theGame.fallingRakias[i].y-40 >= 500) {
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
        createRakia:function(){
            var x = getRandomValue(0, 800);
            var rakia = new drinks.getRakia(x, 10, 4);
            theGame.fallingRakias.push(rakia);
        },
        createBeer:function () {
            var x = getRandomValue(0, 800);
            var beer = new drinks.getBeer(x, 10, 4);
            theGame.fallingBeers.push(beer);
        },
        createRock:function(){
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
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
            ctx.fillText("Level: "+theGame.lvl, 10, 470);
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
            else if(theGame.rakiaEffect > 0 && theGame.beerEffect == 0){
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
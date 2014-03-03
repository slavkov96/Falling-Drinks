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
            this.x -=this.speed;
        }
        if (this.direction == "right") {
            this.x +=this.speed;
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
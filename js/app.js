function getRandomSpeed() {
    var min = Math.ceil(200);
    var max = Math.floor(400);
    this.speed = Math.floor(Math.random() * (max - min)) + min;
}


var levelup = new Audio('sounds/levelup.wav');
var difficulty = 1;
var gameover = false;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //this.y = 225;
    var min = Math.ceil(200);
    var max = Math.floor(400);
    this.speed = Math.floor(Math.random() * (max - min)) + min;
    //console.log("speed: " + this.speed);

};

////values for  bugs.y
///60,145,
var death = new Audio('sounds/death.wav');
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * difficulty * dt;
    this.reset();
    this.checkCollision(player);

    //console.log("player stuff" + player.x);
};

Enemy.prototype.checkCollision = function(inputPlayer) {

    //console.log("check inputplayer: " + inputPlayer.x);
    if (inputPlayer.x < this.x + 75 &&
        inputPlayer.x + 65 > this.x &&
        inputPlayer.y < this.y + 50 &&
        inputPlayer.y + 70 > this.y) {
        inputPlayer.reset();
        death.play();
        console.log("collision");
        gem.reset();
        gemtaken = false;
        if (livesleft > 0) {
            livesleft = livesleft - 1;
        }
    }

};

///moves the enemy back to the left after it falls off the edge of the canvas
Enemy.prototype.reset = function() {
    if (this.x >= 490) {
        this.x = -90;
        //console.log(this.speed);
        //this.speed = Math.random()*1000;
        var min = Math.ceil(200);
        var max = Math.floor(400);
        this.speed = Math.floor(Math.random() * (max - min)) + min;
        //console.log("speed " + this.speed);

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    for (var i = 1; i < 4; i++) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 410;
};

Player.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log("player y: " + this.y);
    this.checkGem();
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.reset = function() {
    this.y = 410;
    this.x = 200;
};

Player.prototype.checkGem = function() {
    //    if (gemtaken = true && this.y > 325) {
    //        console.log("gem is home");
    //    }
    if (gemtaken === true && this.y >= 410 && this.x == 200) {
        console.log("gemtaken " + gemtaken);
        gemtaken = false;
        levelup.play();
        gemScored = gemScored + 1;
        difficulty = difficulty + .1;
        console.log("difficulty: " + difficulty);
        gem.reset();
        leveluptext.reset();
        levelupnow = true;
    }
};

Player.prototype.handleInput = function(event) {
    if (levelupnow === true) {
        ctx.clearRect(250, 300, 100, 10);
        levelupnow = false;
        console.log("somthing");

    }

    if (gameover === false) {
        switch (event) {

            case "left":
                if (this.x >= 100) {
                    this.x -= 100;
                }
                break;
            case "right":
                if (this.x <= 300) {
                    this.x += 100;
                }
                break;
            case "up":
                if (this.y >= 45) {
                    this.y -= 85;
                }
                break;
            case "down":
                if (this.y <= 409) {
                    this.y += 85;
                }
                break;
            default:
                break;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];


// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//for (var i = 1; i < 4; i++) {
//    allEnemies.push( new Enemy());
//    console.log("hi");
//    console.log(allEnemies);
//};

var buggy1 = new Enemy(-130, 225);
var buggy2 = new Enemy(-130, 142);
var buggy3 = new Enemy(-130, 60);
allEnemies.push(buggy1);
allEnemies.push(buggy2);
allEnemies.push(buggy3);
//console.log(buggy1);

///sounds for gem
var pickup = new Audio('sounds/pickup.wav');
var gemtaken = false;

var Gem = function() {
    this.sprite = 'images/gem-orange-small.png';
    this.x = 315;
    this.y = 48;
    this.width = 10;
    this.height = 10;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkCollision(player);
    // console.log("xxx");
};

Gem.prototype.reset = function() {
    this.x = 315;
}

Gem.prototype.checkCollision = function(inputPlayer) {
    //console.log("gem start");
    if (inputPlayer.x < this.x + 75 &&
        inputPlayer.x + 65 > this.x &&
        inputPlayer.y < this.y + 50 &&
        inputPlayer.y + 70 > this.y) {
        //inputPlayer.reset();
        gemtaken = true;
        pickup.play();
        this.x = -100;
        console.log("gem collision");

    }

};

var gem = new Gem();

var livesleft = 3;
var Lives = function() {
    this.sprite = 'images/Heart-small.png';
    this.x = 10;
    this.y = 550;
    this.width = 10;
    this.height = 10;
};

Lives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText((" = " + livesleft), 60, 575);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeText((" = " + livesleft), 60, 575);
}

Lives.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var lives = new Lives();




var gemScored = 0;
var GemScore = function() {
    this.sprite = 'images/Heart-small.png';
    this.x = 110;
    this.y = 550;
    this.width = 10;
    this.height = 10;
};

GemScore.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText((" = " + gemScored), 160, 575);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeText((" = " + gemScored), 160, 575);
}

GemScore.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var gemscore = new GemScore();


var levelupnow = false;

var Leveluptext = function() {
    //this.sprite = 'images/Heart-small.png';
    this.x = 110;
    this.y = 550;
    this.width = 10;
    this.height = 10;
};

Leveluptext.prototype.render = function() {
    // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (levelupnow === true) {
        ctx.font = "40pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "yellow";
        ctx.fillText(("Level Up!"), 250, 300);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeText(("Level Up!"), 250, 300);
    };
    if (levelupnow === false) {
        ctx.font = "40pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "yellow";
        ctx.fillText(("Level Up!"), -150, 300);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeText(("Level Up!"), -150, 300);
    };

}

Leveluptext.prototype.update = function() {
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Leveluptext.prototype.reset = function() {

    console.log("why doesnt it work");

}

var leveluptext = new Leveluptext();
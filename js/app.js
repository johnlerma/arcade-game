//// sounds for game
var levelup = new Audio('sounds/levelup.wav');
var endgame = new Audio('sounds/endgame.wav');
var death = new Audio('sounds/death.wav');
var pickup = new Audio('sounds/pickup.wav');

//// set the variable for game state, gem state, difficulty etc
var difficulty = 1;
var gameover = false;
var livesleft = 3;
var gemtaken = false;
var gemScored = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    var min = Math.ceil(200);
    var max = Math.floor(400);
    this.speed = Math.floor(Math.random() * (max - min)) + min;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Also checks for collision with player
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * difficulty * dt;
    this.reset();
    this.checkCollision(player);
};

// checks for collision as well as checks to see if any 
//lives remain and plays proper sound for player dead/game over
Enemy.prototype.checkCollision = function(inputPlayer) {

    if (inputPlayer.x < this.x + 75 &&
        inputPlayer.x + 65 > this.x &&
        inputPlayer.y < this.y + 50 &&
        inputPlayer.y + 70 > this.y) {
        gemtaken = false;

        ////updates lives counter and resets gem unless end of game
        if (livesleft > 1) {
            livesleft = livesleft - 1;
            death.play();
            console.log("minus 1");
            gem.reset();
        } else {
            endgame.play();
            livesleft = livesleft - 1;
            console.log("end");
        }
        inputPlayer.reset();
    }

};

///moves the enemy back to the left after it falls off the edge of the canvas
Enemy.prototype.reset = function() {
    if (this.x >= 490) {
        this.x = -90;
        var min = Math.ceil(200);
        var max = Math.floor(400);
        this.speed = Math.floor(Math.random() * (max - min)) + min;
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
// sets x and y of player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 410;
};

// draws sprite and checks to see if gem was taken and reaches goal
Player.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkGem();
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//resets player to starting point unless game over
//game over state moves player off the screen
Player.prototype.reset = function() {
    if (livesleft >= 1) {
        this.y = 410;
        this.x = 200;
    } else {
        this.x = -100;
        this.y = 410;
    }
};

//checks to see if player has reached the goal
//if yes, difficulty is increased, levelup text appears on screen
Player.prototype.checkGem = function() {
    if (gemtaken === true && this.y >= 410 && this.x == 200) {
        gemtaken = false;
        levelup.play();
        gemScored = gemScored + 1;
        difficulty = difficulty + 0.1;
        gem.reset();
        leveluptext.reset();
        levelupnow = true;
    }
};

// sets keyboard input to move player around screen.
// also clears up leve up text
Player.prototype.handleInput = function(event) {
    if (levelupnow === true) {
        ctx.clearRect(250, 300, 100, 10);
        levelupnow = false;
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

// creates the 3 bugs and positions them
var buggy1 = new Enemy(-130, 225);
var buggy2 = new Enemy(-130, 142);
var buggy3 = new Enemy(-130, 60);
allEnemies.push(buggy1);
allEnemies.push(buggy2);
allEnemies.push(buggy3);

// sets the possible x and y values where the gem will appear on screen
var gemxArray = [14, 115, 216, 316, 420];
var gemyArray = [48, 129, 214, 298];

// creates a random position for the gem to appear on screen
var Gem = function() {
    this.sprite = 'images/gem-orange-small.png';
    this.x = gemxArray[Math.floor(Math.random() * gemxArray.length)];
    this.y = gemyArray[Math.floor(Math.random() * gemyArray.length)];
    this.width = 10;
    this.height = 10;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update function checks for collision with player
Gem.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkCollision(player);
};

// resets the gem after player has died or moves to the gem goal
Gem.prototype.reset = function() {
    this.x = gemxArray[Math.floor(Math.random() * gemxArray.length)];
    this.y = gemyArray[Math.floor(Math.random() * gemyArray.length)];
};

// checks to see if player has collided with gem
// moves gem off screen to appear as if player picked it up
Gem.prototype.checkCollision = function(inputPlayer) {
    if (inputPlayer.x < this.x + 75 &&
        inputPlayer.x + 65 > this.x &&
        inputPlayer.y < this.y + 20 &&
        inputPlayer.y + 70 > this.y) {
        gemtaken = true;
        pickup.play();
        this.x = -100;
    }
};

var gem = new Gem();

// creates Lives object for icon placement and score keeping
var Lives = function() {
    this.sprite = 'images/Heart-small.png';
    this.x = 10;
    this.y = 550;
    this.width = 10;
    this.height = 10;
};

// creates the text on screen for score keeping
Lives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText((" = " + livesleft), 60, 575);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeText((" = " + livesleft), 60, 575);
};

Lives.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var lives = new Lives();

// creates Gem object for icon placement and score keeping
var GemScore = function() {
    this.sprite = 'images/gem-icon.png';
    this.x = 110;
    this.y = 550;
    this.width = 10;
    this.height = 10;
};

// creates text on screen for score keeping
GemScore.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText((" = " + gemScored), 160, 575);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeText((" = " + gemScored), 160, 575);
};

GemScore.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var gemscore = new GemScore();

var levelupnow = false;


// creates text object on screen to show user they have leveled up
var Leveluptext = function() {
    this.x = 110;
    this.y = 550;
    this.width = 10;
    this.height = 10;
};

// creates text on screen
Leveluptext.prototype.render = function() {
    if (levelupnow === true) {
        ctx.font = "40pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "yellow";
        ctx.fillText(("Level Up!"), 250, 300);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeText(("Level Up!"), 250, 300);
    }
    if (levelupnow === false) {
        ctx.font = "40pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "yellow";
        ctx.fillText(("Level Up!"), -150, 300);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeText(("Level Up!"), -150, 300);
    }

};

Leveluptext.prototype.update = function() {
};

Leveluptext.prototype.reset = function() {
};

var leveluptext = new Leveluptext();
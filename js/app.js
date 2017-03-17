// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 225;
};

////values for  bugs.y
///60,145,

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 1 * dt;
};

//Enemy.prototype.move = function(num) {
//
//};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    for (var i = 1; i < 4; i++) {
         ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
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
    //.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(event){

   switch (event) {

        case "left":
            if (this.x >= 100){
            this.x -= 100;
           }
           break;
        case "right":
             if (this.x <= 300){
            this.x += 100;
           }
            break;
        case "up":
            if (this.y >= 140){
            this.y -= 84;
           }
            break;
        case "down":
           if (this.y <= 409){
            this.y += 84;
           }
            break;
        default:
            break;
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
for (var i = 1; i < 4; i++) {
    allEnemies.push( new Enemy());
    console.log("hi");
    console.log(allEnemies);
};


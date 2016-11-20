// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = Math.random() * (250 - 40) + 50;
    this.width = 75;
    this.height = 75;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 550) {
        this.x = 0;
    }
    this.checkCollision();
};

// Collision detection using Axis-Aligned Bounding Box algorithm
Enemy.prototype.checkCollision = function() {
    if (this.x < (player.x + player.width) && (this.x + this.width) > player.x && this.y < (player.y + player.height) && (this.height + this.y) > player.y) {
        this.resetMessage();
    }
};

// Reset the game, if a collision is detected
Enemy.prototype.resetMessage = function() {
    alert('Don\'t give up. Try again !');
    player.reset();
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.width = 50;
    this.height = 75;
};

// Instantiate the player object
var player = new Player();

// Reset the player position to default
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        this.x -= 101;
    } else if (direction === 'right') {
        this.x += 101;
    } else if (direction === 'up') {
        this.y -= 83;
    } else if (direction === 'down') {
        this.y += 83;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Restrict player movement within canvas
Player.prototype.update = function(dt) {
    if (this.y < 68) {
        alert('You have won !');
        this.x = 200;
        this.y = 400;
    }

    if (this.x < -2) {
        this.x = -2;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x > 402) {
        this.x = 402;
    }
};

// Instantiate enemy objects
var enemy1 = new Enemy(0, 65);
var enemy2 = new Enemy(0, 150);
var enemy3 = new Enemy(0, 230);
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


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
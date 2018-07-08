// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here, we've provided one for
    // you to get started The image/sprite for our enemies, this uses a helper we've
    // provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed
};

// Update the enemy's position, required method for game Parameter: dt, a time
// delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter which will ensure the
    // game runs at the same speed for all computers.
    this.x = this.x + this.speed * dt;

    // When the enemy object moves off the screen reset its starting position
    if (this.x > 500) {
        this.x = randomPosition();

        // Ramp up enemy speed on each pass to a max of 600 then reset
        if (this.speed > 700) {
            this.speed -= 300;
        } else {
            this.speed += 50;
        }
    }

    // Get difference of position for the enemy object and the player object
    const xDiff = Math.abs(player.x.current - this.x);
    const yDiff = Math.abs(player.y.current - this.y);

    // Reset the player if the difference in position falls within the collision
    // threshhold
    if (xDiff <= player.x.step / 1.75 && yDiff <= 15) {
        player.update(true);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = {
            current: 200,
            max: 400,
            min: 0,
            step: 100
        };

        this.y = {
            current: 400,
            max: 400,
            min: 67,
            step: 83
        };
    }

    update(collision = false, victory = false) {
        // Reset player if an enemy collides with them
        if (collision) {
            this.handleCollision();
        }

        // Show victory message when player makes it to the water
        if (victory) {
            this.handleVictory();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x.current, this.y.current);
    }

    handleCollision() {
        // Using timeout to allow time for the user to see the player object movement
        // before it gets reset on collision
        setTimeout(function () {
            player = new Player();
        }, 50);
    }

    handleVictory() {
        // show victory message and reset the player object
        alert('YOU WIN!!');
        player = new Player();
    }

    handleInput(direction) {
        switch (direction) {
            case 'left':
                if (this.x.current > this.x.min) 
                    this.x.current = this.x.current - this.x.step;
                break;
            case 'right':
                if (this.x.current < this.x.max) 
                    this.x.current = this.x.current + this.x.step;
                break;
            case 'up':
                if (this.y.current > this.y.min) 
                    this.y.current = this.y.current - this.y.step;
                break;
            case 'down':
                if (this.y.current < this.y.max) 
                    this.y.current = this.y.current + this.y.step;
                }
            
            // Reset player if they move into the water
            if (this.y.current <= this.y.min) {
                player.update(false, true);
            }
        }
    }

    // Function to generate a random starting position for the enemy objects
    function randomPosition() {
        return Math.floor(Math.random() * -2500);
    }

    // Now instantiate your objects. Place all enemy objects in an array called
    // allEnemies Place the player object in a variable called player
    const allEnemies = [
        new Enemy(-100, 65, 350),
        new Enemy(-500, 148, 410),
        new Enemy(-300, 231, 605),
        new Enemy(-100, 65, 518),
        new Enemy(-300, 231, 500)
    ];

    let player = new Player();

    // This listens for key presses and sends the keys to your Player.handleInput()
    // method. You don't need to modify this.
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

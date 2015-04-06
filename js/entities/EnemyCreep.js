game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function() {
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
            }]);
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        // this.attacking lets us know if
        // the enemy is attacking.
        this.attacking = false;
        // Keeps track of when our creep last attacked anything.
        this.lastAttacking = new Date().getTime();
        // Keeps track of the last time our creep hit anything.
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);

        this.type = "EnemyCreep";
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    
    
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    
    update: function(delta) {
        console.log("this.health");
        if(this.health <= 0) {
            me.game.world.removeChild(this);
        }
        
        this.now = new Date().getTime();


        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);


        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerBase') {
            this.attacking = true;
            // this.lastAttacking=this.now;
            this.body.vel.x = 0;
            // Keeps moving the creep to the
            // right to maintain its position.
            this.pos.x = this.pos.x = 1;
            // Checks that it has been at least
            // 1 second since this creep hit a base.
            if ((this.now - this.lastHit >= 1000)) {
                // Updates the lastHit timer.
                this.lastHit = this.now;
                // Makes the player base call its
                // loseHealth function and passes it a
                // damage of 1.
                response.b.loseHealth(game.data.enemyCreepAttack);

            }
        } else if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;
            this.attacking = true;
            // this.lastAttacking=this.now;
            if (xdif > 0) {
                // Keeps moving the creep to the
                // right to maintain its position.
                this.pos.x = this.pos.x = 1;
                this.body.vel.x = 0;
            }
            // Checks that it has been at least
            // 1 second since this creep hit something.
            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                // Updates the lastHit timer.
                this.lastHit = this.now;
                // Makes the player base call its
                // loseHealth function and passes it a
                // damage of 1.
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }
    }

});
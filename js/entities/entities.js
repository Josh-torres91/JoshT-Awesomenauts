game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                // The settings above give the orc character
                // its settings for height, width, and the x, y
                // settings
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.body.setVelocity(5, 20);

    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            // Adds to the position of my x by the velocity
            // defined above in setVelocity() and multiplying
            // it by timer.tick.
            // me.timer.tick makes player movement look smooth.
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
        this.body.update(delta);
        return true;
    }
});
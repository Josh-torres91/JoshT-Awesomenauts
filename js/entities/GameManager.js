game.GameManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();

        if (game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(0, 550);
        }
        
        if (Math.round(this.now / 1000) %20 === 0 && (this.now - this.lastCreep >= 1000)) {
               game.data.gold += 1;
               console.log("Current gold:" + game.data.gold);
        }
        
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            // Math.round is a function that checks
            //  if we have a multiple of ten.
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 100, 0, {});
            me.game.world.addChild(creepe, 730);
        }

        return true;
    }
});
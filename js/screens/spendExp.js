game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [335, 240, 300, 50]);
                this.font = new me.Font("Press Start 2P", 46, "White");

            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Start A New Game?", this.pos.x, this.pos.y);
            }
            
        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
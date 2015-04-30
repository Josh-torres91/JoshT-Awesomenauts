game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
        
        game.data.option1 = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [335, 240, 300, 50]);
                this.font = new me.Font("Press Start 2P", 46, "White");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true )
                
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Start A New Game?", this.pos.x, this.pos.y);   
            },
            
            update: function(dt) {
                return true;
            },
            
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.input.releasePointerEvent('pointerdown', game.data.option2);
                me.state.change(me.state.NEW);
            }
            
        }));
        
        me.game.world.addChild(game.data.option1);
        
        game.data.option2 = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [420, 340, 250, 50]);
                this.font = new me.Font("Press Start 2P", 46, "White");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true )
                
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Continue?", this.pos.x, this.pos.y);   
            },
            
            update: function(dt) {
                return true;
            },
            
            newGame: function() {
                game.data.exp = me.save.exp;
                game.data.exp1 = me.save.exp1;
                game.data.exp2 = me.save.exp2;
                game.data.exp3 = me.save.exp3;
                game.data.exp4 = me.save.exp4;
                me.input.releasePointerEvent('pointerdown', this);
                me.input.releasePointerEvent('pointerdown', game.data.option1);
                me.state.change(me.state.LOAD);
            }
        }));
        
        
    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
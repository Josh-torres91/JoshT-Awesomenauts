game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        me.input.bindKey(me.input.KEY.F4, "F4");
        me.input.bindKey(me.input.KEY.F5, "F5");
        var exp1cost = ((game.data.exp1 + 1) * 10);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Press Start 2P", 26, "White");

            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Press F1-F4 to buy abilities, F5 to continue your campaign.", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Current XP: " + game.data.exp.toString(), this.pos.x + 95, this.pos.y + 50);
               
                this.font.draw(renderer.getContext(), "F1: Increased gold production. Current Level: " + game.data.exp1.toString() + "Cost: " + exp1cost, this.pos.x, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "F2: Add starting gold. ", this.pos.x, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "F3: Increased attack damage. ", this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "F4: Greater jump height. ", this.pos.x, this.pos.y + 250);
            
            
            }
            
            
        })));
        
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
            if(action === "F1"){
                
            }else if(action === "F2"){
                if(game.data.exp >= exp1cost){
                    game.data.exp1 += 1;
                    game.data.exp1 -= exp1cost;
                    me.state.change(me.state.PLAY);
                }
            }else if(action === "F3"){
                console.log("Not Enough XP!");
            }else if(action === "F4"){
                
            }else if(action === "F5"){
                me.state.change(me.state.PLAY);
            }
        });
        
        
    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.input.unbindKey(me.input.KEY.F5, "F5");
        me.event.unsubscribe(this.handler);
    }
});
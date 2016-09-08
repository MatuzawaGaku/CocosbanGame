var titleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        var sprite = cc.Sprite.create(res.title_png);
                  sprite.setPosition(size.width / 2, size.height / 2);
                  sprite.setScale(5);
                  this.addChild(sprite, 0);
        cc.eventManager.addListener({
                   event: cc.EventListener.TOUCH_ONE_BY_ONE,
                   swallowTouches: true,
                   onTouchBegan: this.onTouchBegan,
                   onTouchMoved: this.onTouchMoved,
                   onTouchEnded: this.onTouchEnded
                 }, this);
                 return true;
               },
           onTouchBegan: function(touch, event) {
               return true;
           },
           onTouchMoved: function(touch, event) {},
           onTouchEnded: function(touch, event) {
             flg = 0;
             cc.director.runScene(new gameScene());
             title = [
               [1, 1, 1, 1, 1, 1, 1],
               [1, 1, 0, 0, 0, 0, 1],
               [1, 0, 3, 0, 2, 0, 1],
               [1, 0, 0, 4, 0, 0, 1],
               [1, 0, 3, 0, 0, 2, 1],
               [1, 0, 0, 1, 1, 1, 1],
               [1, 1, 1, 1, 1, 1, 1]
             ];
           },
       });
var titleScene = cc.Scene.extend({
onEnter: function() {
 this._super();
 var titlelayer = new titleLayer();
 this.addChild(titlelayer);
}
});

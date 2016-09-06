var LevelLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        scoreText = cc.LabelTTF.create("ゲームクリア!!" ,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(size.width / 2, size.height / 2);
        
 // タップイベントリスナーを登録する
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
 // 次のシーンに切り替える
 cc.director.clearScene(new gameScene());
},
});

var LevelScene = cc.Scene.extend({
onEnter: function() {
 this._super();
 var Levellayer = new LevelLayer();
 this.addChild(Levellayer);
}
});

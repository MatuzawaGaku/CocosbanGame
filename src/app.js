var size;

var level = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 3, 0, 2, 0, 1],
  [1, 0, 0, 4, 0, 0, 1],
  [1, 0, 3, 0, 0, 2, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1]
];

var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite; //プレイヤーのスプライト
var cratesArray = []; //配置した木箱のスプライトを配列に保持する

var crateflag=0;
var gameflag=0;
var startTouch;
var endTouch;
var swipeTolerance = 10;//スワイプかを判断する閾値
var audioEngine; //BGM再生

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();

    var layer0 = new gameLayer();
    layer0.init();
    this.addChild(layer0);
    //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          audioEngine.playMusic("res/bgm_main.mp3", true);
          //audioEngine.playMusic(res.bgm_main, true);
  }
}
});

var gameLayer = cc.Layer.extend({
  init: function() {
    this._super();
    //スプライトフレームのキャッシュオブジェクトを作成する
    cache = cc.spriteFrameCache;
    //スプライトフレームのデータを読み込む
    cache.addSpriteFrames(res.spritesheet_plist);
    var backgroundSprite = cc.Sprite.create(cache.getSpriteFrame("background.png"));
    //アンチエイリアス処理を止める
    backgroundSprite.getTexture().setAliasTexParameters();

    backgroundSprite.setPosition(240, 160);
    //スプライトがとても小さいので拡大する
    backgroundSprite.setScale(5);
    this.addChild(backgroundSprite);

    var levelSprite = cc.Sprite.create(cache.getSpriteFrame("level.png"));
    levelSprite.setPosition(240, 110);
    levelSprite.setScale(5);
    this.addChild(levelSprite);


    var sprite2 = new reset;
   sprite2.setPosition(100, 120);
   sprite2.setScale(1.2);
   this.addChild(sprite2, 0);

   var label = cc.LabelTTF.create("クリアはよ!!", "Arial", 26);
       label.setPosition(90,150);
       this.addChild(label, 1);

    for (i = 0; i < 7; i++) {　　　　　　
      cratesArray[i] = [];　 //配列オブジェクトの生成
      for (j = 0; j < 7; j++) {
        switch (level[i][j]) {
          case 2:
            crateflag+=1;
          break;
          case 4:
          case 6:
            playerSprite = cc.Sprite.create(cache.getSpriteFrame("player.png"));
            playerSprite.setPosition(165 + 25 * j, 185 - 25 * i);
            playerSprite.setScale(5);
            this.addChild(playerSprite);
            playerPosition = {
              x: j,
              y: i
            };　　　　　　　　　　　　
            cratesArray[i][j] = null;　 //playerがいるので、その場所には木箱はないのでnullを代入する
            break;
          case 3:
          case 5:
            var crateSprite = cc.Sprite.create(cache.getSpriteFrame("crate.png"));
            crateSprite.setPosition(165 + 25 * j, 185 - 25 * i);
            crateSprite.setScale(5);
            this.addChild(crateSprite);
            cratesArray[i][j] = crateSprite;//(i,j)の位置にcrateSpriteを入れる
            break;
          default:
            cratesArray[i][j] = null;//木箱のコード以外の場合は、その場所に木箱がない値としてnullを代入する
            break;
        }
      }
    }
    //return true;
    cc.eventManager.addListener(listener, this);
  },
});

var reset = cc.Sprite.extend({
  ctor:function(){
    this._super();
    this.initWithFile(res.reset_png);
    cc.eventManager.addListener(listener2.clone(), this);
  }
});

var listener2 = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan:function(touch, event) {
    var targettouch = event.getCurrentTarget();
    var location = targettouch.convertToNodeSpace(touch.getLocation());
    var targetsize = targettouch.getContentSize();
    var targetRectangle = cc.rect(0,0,targetsize.width, targetsize.height);
    if(cc.rectContainsPoint(targetRectangle, location)){
    level = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 1],
      [1, 0, 3, 0, 2, 0, 1],
      [1, 0, 0, 4, 0, 0, 1],
      [1, 0, 3, 0, 0, 2, 1],
      [1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ];
    crateflag = 0;
    gameflag = 0;
    cc.director.runScene(new gameScene());
  }
}
});

var listener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: true,
onTouchBegan:function (touch,event) {
startTouch = touch.getLocation();
return true;
},
onTouchEnded:function(touch, event){
endTouch = touch.getLocation();
swipeDirection();
}
});
//スワイプ方向を検出する処理
function swipeDirection(){


    var distX = endTouch.x - startTouch.x ;
    var distY = endTouch.y - startTouch.y ;
    if(Math.abs(distX)+Math.abs(distY)>swipeTolerance){
        if(Math.abs(distX)>Math.abs(distY)){
            if(distX>0){//右方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x+25,playerSprite.getPosition().y);
                move(1,0);
            }
            else{//左方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x-25,playerSprite.getPosition().y);
                move(-1,0);
            }
        }
        else{
        //  console.log("endTouch.y "+endTouch.y );
        //  console.log("startTouch.y "+startTouch.y );
        //  console.log("distY "+ distY );
            if(distY>0){ //上方向移動
            //  playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y+25);
               console.log("上 move(0,-1) distY "+ distY );
              move(0,-1);

            }
            else{ //下方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y-25);
              console.log("下 move(0,1) distY "+ distY );
              move(0,1);
            }
        }
    }
}

function move(deltaX,deltaY){
switch(level[playerPosition.y+deltaY][playerPosition.x+deltaX]){
    case 0:
    case 2:
        level[playerPosition.y][playerPosition.x]-=4;
        playerPosition.x+=deltaX;
        playerPosition.y+=deltaY;
        level[playerPosition.y][playerPosition.x]+=4;
        playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);
    break;
    case 3:
    case 5:
        if(level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==0 ||
           level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==2){
            level[playerPosition.y][playerPosition.x]-=4;
            //console.log(level[playerPosition.y+deltaY][playerPosition.x+deltaX]);木箱移動前
            if(level[playerPosition.y+deltaY][playerPosition.x+deltaX] == 5){
              gameflag -= 1;
            }
            playerPosition.x+=deltaX;
            playerPosition.y+=deltaY;
            level[playerPosition.y][playerPosition.x]+=1;
            playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);
            level[playerPosition.y+deltaY][playerPosition.x+deltaX]+=3;
            //console.log(level[playerPosition.y+deltaY][playerPosition.x+deltaX]);木箱移動後
            if(level[playerPosition.y+deltaY][playerPosition.x+deltaX]==5){
              gameflag += 1;
              if(gameflag == crateflag){
                setTimeout(function(){
                  cc.director.runScene(new LevelScene());
                },1000);
                }
            }
            var movingCrate = cratesArray[playerPosition.y][playerPosition.x];
            movingCrate.setPosition(movingCrate.getPosition().x+25*deltaX,movingCrate.
            getPosition().y-25*deltaY);
            cratesArray[playerPosition.y+deltaY][playerPosition.x+deltaX]=movingCrate;
            cratesArray[playerPosition.y][playerPosition.x]=null;
        }
        break;
    }
}

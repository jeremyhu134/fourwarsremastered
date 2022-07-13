class ChooseHeroScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ChooseHeroScene' })
	}
    preload(){
        //this.load.image('menubg','tf2arenaimages/menubg.png');
        
        //this.load.spritesheet('redscout','tf2arenaimages/redscout.png',{frameWidth: 33,frameHeight:53});
    }
    create(){
        
    }
    update(){
        
    }
}

class ArenaScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ArenaScene' })
	}
    preload(){
        //this.load.image('menubg','tf2arenaimages/menubg.png');
        
        //this.load.spritesheet('redscout','tf2arenaimages/redscout.png',{frameWidth: 33,frameHeight:53});
    }
    create(){
        gameState.scroll = 0;
        gameState.mapWidth = 2000;
        gameState.globalScene = this;
        gameState.arena = this;
        /*this.physics.add.collider(gameState.player, gameState.barriers,(hero,barrier)=>{
            
        });*/
        gameState.input=this.input;
        gameState.mouse=this.input.mousePointer;
        //this.input.mouse.disableContextMenu();
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC,LEFT,RIGHT');
        gameState.bullets = this.physics.add.group();
        gameState.enemy = this.physics.add.group();
        gameState.troops = this.physics.add.group();
        
        gameState.createMap(this, 'human', 'human',null, gameState.mapWidth);
        gameState.camera = this.cameras.main;
        
        
        gameState.globalScene.scene.launch("BuyTroopScene");
        this.time.addEvent({
            delay: 20000,
            callback: ()=>{
                gameState.createTroop(this,gameState.humanTrooperStats,1);
                gameState.createTroop(this,gameState.humanTrooperStats,1);
                gameState.createTroop(this,gameState.humanTrooperStats,1);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        this.time.addEvent({
            delay: 40000,
            callback: ()=>{
                gameState.createTroop(this,gameState.humanEndoTrooperStats,1);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        this.time.addEvent({
            delay: 60000,
            callback: ()=>{
                gameState.createTroop(this,gameState.humanMechStats,1);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        this.time.addEvent({
            delay: 120000,
            callback: ()=>{
                gameState.createTroop(this,gameState.humanTankStats,1);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        this.time.addEvent({
            delay: 180000,
            callback: ()=>{
                gameState.createTroop(this,gameState.humanBattleShipStats,1);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
       
        
        
        gameState.camera.x = 0;
        gameState.camera.y = 0;
        //gameState.buildings = this.physics.add.group();
        //this.physics.add.collider(gameState.character, gameState.buildings);
        //this.physics.add.overlap(gameState.blueprint, gameState.buildings)
    }
    update(){
        if(gameState.keys.D.isDown && gameState.scroll <= gameState.mapWidth-1300){
            gameState.camera.scrollX += 10;
            gameState.scroll += 10;
        } else if (gameState.keys.A.isDown && gameState.scroll >= 10){
            gameState.camera.scrollX -= 10;
            gameState.scroll -= 10;
        }
    }
}
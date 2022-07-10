const config = {
    type: Phaser.AUTO,
    width : 1300,
    height: 650,
    backgroundColor: "#999999",
    audio: {
        disableWebAudio: false
      },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true
            //debug: true
        }
    },
    scene:[MenuScene,PauseScene,ArenaScene,BuyTroopScene],
    scale: {
        zoom: 1,
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NONE
    }
};

const game = new Phaser.Game(config);

let gameState = {
    
    /*createGeneralRooks : function(scene,x,y){
        gameState.character = scene.physics.add.sprite(x,y,'generalRooks').setInteractive().setDepth(1);
        gameState.character.setCollideWorldBounds(true);
        gameState.character.body.width = 30;
        gameState.character.body.offset.x = 30;
        gameState.character.body.height = 50;
        gameState.character.body.offset.y = 10;
        gameState.character.anims.play('generalRooksIdle',true);
        
        //Attributes
        gameState.character.health = gameState.generalRooksStats.health;
        
        gameState.createHealthBar(scene,gameState.character,gameState.generalRooksStats.health);
        //stats
        var health = gameState.generalRooksStats.health;
        var selected = false;
        var moving = false;
        var selectCircle;
        var select = gameState.character.on('pointerdown', function (pointer) {
            if(selected == false){
                selectCircle = scene.add.image(0,0,'selectedCircle').setScale((gameState.character.body.width+10)/80).setDepth(0);
                selected = true;
            }else {
                selectCircle.destroy();
                selected = false;
            }
        });
        var movement = gameState.input.on('pointerdown', function (pointer) {
            if(selected == true){
                scene.physics.moveTo(gameState.character,gameState.input.x, gameState.input.y,gameState.generalRooksStats.speed);
                gameState.character.anims.play('generalRooksMove',true);
                if(gameState.character.x > gameState.input.x){
                    gameState.character.flipX = true;
                }else {
                    gameState.character.flipX = false;
                }
                var dist = Phaser.Math.Distance.BetweenPoints(gameState.character, gameState.input);
                if(gameState.heroMoveTimer){
                    gameState.heroMoveTimer.destroy();
                }
                gameState.heroMoveTimer = scene.time.addEvent({
                    delay: (dist/gameState.generalRooksStats.speed)*1000,
                    callback: ()=>{
                        gameState.character.anims.play('generalRooksIdle',true);
                        gameState.character.setVelocityX(0);
                        gameState.character.setVelocityY(0);
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        });
        var behaviorLoop = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                gameState.character.depth = gameState.character.y;
                if(selectCircle){
                    if(gameState.keys.ESC.isDown){
                        selectCircle.destroy();
                        selected = false;
                    }
                    selectCircle.x = gameState.character.x;
                    selectCircle.y = gameState.character.y+(gameState.character.body.height/2);
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    */
    //Create castle
    gameWindow:{
        width: 1300,
        height: 650
    },
    
    humanTrooperStats:{
        name: 'Human Trooper',
        description: 'Basic ground unit equipped with an assault rifle that has medium range and can target air and ground units.',
        sprite: 'humanTrooper',
        cost: 50,
        health: 50,
        speed: 100,
        range: 150,
        damage: 5,
        fireRate: 200,
        type: 'ground',
        target: 'ground&air',
        attack: function(scene,troop){
            troop.target.health -= gameState.humanTrooperStats.damage;
        }
        
    },
    humanTankStats:{
        name: 'Human Tank',
        description: 'Heavy ground unit with a devestating cannon that deals massive area damage.',
        sprite: 'humanTank',
        cost: 150,
        health: 200,
        speed: 50,
        range: 350,
        damage: 70,
        areaDamage: 40,
        explodeRadius: 100,
        fireRate: 3000,
        type: 'ground',
        target: 'ground',
        attack: function(scene,troop){
            troop.target.health -= gameState.humanTankStats.damage;
            if(Phaser.Math.Distance.BetweenPoints(troop, troop.target)<gameState.humanTankStats.explodeRadius){
                troop.health -= gameState.humanTankStats.areaDamage;
            }
            gameState.createExplosion(scene,troop.target.x,troop.target.y);
            for (var i = 0; i < gameState.troops.getChildren().length; i++){ 
                dist = Phaser.Math.Distance.BetweenPoints(gameState.troops.getChildren()[i], troop.target);
                if(dist<gameState.humanTankStats.explodeRadius && gameState.troops.getChildren()[i].team != troop.team){
                    gameState.troops.getChildren()[i].health -= gameState.humanTankStats.areaDamage;
                }
            }
        }
    },
    humanMechStats:{
        name: 'Human Mech',
        description: 'Moderate ground unit equipped with twin auto machine guns.',
        sprite: 'humanMech',
        cost: 125,
        health: 100,
        speed: 80,
        range: 175,
        damage: 7,
        fireRate: 200,
        type: 'ground',
        target: 'ground&air',
        attack: function(scene,troop){
            troop.target.health -= gameState.humanMechStats.damage;
        }
        
    },
    
    
    createHealthBar: function(scene, object,maxHP){
        var hbBG = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0xff0000).setScale(object.body.width/100).setDepth(window.innerHeight);  
        var hb = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0x2ecc71).setScale(object.body.width/100).setDepth(window.innerHeight);
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(object.health > 0){
                    hbBG.x = object.x;
                    hbBG.y = (object.y-object.body.height/2)-10;
                    hb.x = object.x;
                    hb.y = (object.y-object.body.height/2)-10;
                    hb.width = object.health/maxHP*100;
                } else {
                    hbBG.destroy();
                    hb.destroy();
                    checkHealth.destroy();
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    
    
    createTroop: function(scene,troopStats,team){
        var troop = gameState.troops.create(-100,Math.ceil(Math.random()*window.innerHeight), `${troopStats.sprite}`);
        var color = '';
        if(team == 1){
            color = 'Green';
        }
        //troop.setCollideWorldBounds(true);
        scene.physics.add.collider(troop, gameState.troops);
        if(team == 0){
            troop.x = -100;
        } else {
            troop.x = gameState.mapWidth+100;
        }
        troop.health = troopStats.health;
        troop.target;
        troop.team = team;
        
        gameState.createHealthBar(scene,troop,troopStats.health);
        
        var attackLoop = scene.time.addEvent({
            delay: troopStats.fireRate,
            callback: ()=>{
                troopStats.attack(scene,troop);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        attackLoop.paused = true;
        
        var mainLoop = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(troop.health > 0){
                    if(!troop.target || troop.target.health <= 0){
                        var dist;
                        var closest = 10000;
                        if(gameState.troops.getChildren().length > 0){
                            for (var i = 0; i < gameState.troops.getChildren().length; i++){ 
                                dist = Phaser.Math.Distance.BetweenPoints(gameState.troops.getChildren()[i], troop);
                                if(dist<closest && gameState.troops.getChildren()[i].team != troop.team){
                                    closest = dist;
                                    troop.target = gameState.troops.getChildren()[i];
                                }
                            }
                        }
                    }else {
                        troop.setRotation(Phaser.Math.Angle.Between(troop.x,troop.y,troop.target.x,troop.target.y)); 
                        if(Phaser.Math.Distance.BetweenPoints(troop.target, troop) < troopStats.range && troop.target.health > 0){
                            troop.anims.play(`${troopStats.sprite}`+color+`Attack`,true);
                            troop.setVelocityX(0);
                            troop.setVelocityY(0);
                            attackLoop.paused = false;
                        }else {
                            scene.physics.moveTo(troop, troop.target.x, troop.target.y,troopStats.speed);
                            attackLoop.paused = true;
                            troop.anims.play(`${troopStats.sprite}`+color+`Move`,true);
                        }
                    }
                } else {
                    mainLoop.destroy();
                    troop.destroy();
                    attackLoop.destroy();
                }
                
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        
    },
    
    
    createExplosion: function(scene,x,y){
        var explode = scene.physics.add.sprite(x,y,`buildingExplosion`).setScale(2);
        explode.anims.play('explode',true);
        scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                explode.destroy();
            },  
            startAt: 0,
            timeScale: 1
        }); 
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
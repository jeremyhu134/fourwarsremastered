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
    gameWindow:{
        width: 1300,
        height: 650
    },
    
    money: 0,
    
    humanTrooperStats:{
        name: 'Human Trooper',
        description: 'Basic ground unit equipped with an assault rifle that has medium range and can target air and ground units.',
        sprite: 'humanTrooper',
        cost: 50,
        health: 50,
        speed: 100,
        range: 150,
        damage: 4,
        armourDamage: 3,
        fireRate: 250,
        type: 'ground',
        armour: false,
        target: 'ground&air',
        attack: function(scene,troop){
            if(troop.target.armour == true){
                troop.target.health -= gameState.humanTrooperStats.armourDamage;
            } else {
                troop.target.health -= gameState.humanTrooperStats.damage;
            }
        },
        death: function(scene,troop){
            troop.destroy();
        }
    },
    humanSniperStats:{
        name: 'Human Sniper',
        description: 'Long ranged ground unit equipped with a powerful rifle.',
        sprite: 'humanSniper',
        cost: 100,
        health: 40,
        speed: 90,
        range: 600,
        damage: 65,
        armourDamage: 35,
        fireRate: 5500,
        width: 50,
        height: 50,
        type: 'ground',
        armour: false,
        target: 'ground&air',
        attack: function(scene,troop){
            if(troop.target.armour == true){
                troop.target.health -= gameState.humanSniperStats.armourDamage;
            }else {
                troop.target.health -= gameState.humanSniperStats.damage;
            }
        },
        death: function(scene,troop){
            troop.destroy();
        }
    },
    humanEndoTrooperStats:{
        name: 'Human Endo-Trooper',
        description: 'Bulky ground unit that is meant to take the front lines.',
        sprite: 'humanEndoTrooper',
        cost: 100,
        health: 110,
        speed: 70,
        range: 175,
        damage: 30,
        armourDamage: 35,
        fireRate: 1200,
        type: 'ground',
        armour: true,
        target: 'ground',
        attack: function(scene,troop){
            var missile = gameState.bullets.create(troop.x,troop.y, `missile1`);
            missile.setRotation(Phaser.Math.Angle.Between(troop.x,troop.y,troop.target.x,troop.target.y)); 
            scene.physics.moveTo(missile, troop.target.x, troop.target.y,1000);
            
            scene.physics.add.overlap(missile, troop.target,(missile, targ)=>{
                gameState.createExplosion(scene,troop.target.x,troop.target.y,0.8);
                missile.destroy();
                if(troop.target.armour == true){
                    troop.target.health -= gameState.humanEndoTrooperStats.armourDamage;
                }else {
                    troop.target.health -= gameState.humanEndoTrooperStats.damage;
                }
            });
        },
        death: function(scene,troop){
            gameState.createExplosion(scene,troop.x,troop.y,0.9);
            troop.destroy();
        }
    },
    humanTankStats:{
        name: 'Human Tank',
        description: 'Heavy ground unit with a devestating cannon that deals massive area damage.',
        sprite: 'humanTank',
        cost: 175,
        health: 200,
        speed: 50,
        range: 325,
        damage: 30,
        areaDamage: 40,
        explodeRadius: 60,
        fireRate: 3000,
        type: 'ground',
        armour: true,
        target: 'ground',
        attack: function(scene,troop){
            troop.target.health -= gameState.humanTankStats.damage;
            if(Phaser.Math.Distance.BetweenPoints(troop, troop.target)<gameState.humanTankStats.explodeRadius){
                troop.health -= gameState.humanTankStats.areaDamage;
            }
            gameState.createExplosion(scene,troop.target.x,troop.target.y,1.5);
            for (var i = 0; i < gameState.troops.getChildren().length; i++){ 
                dist = Phaser.Math.Distance.BetweenPoints(gameState.troops.getChildren()[i], troop.target);
                if(dist<gameState.humanTankStats.explodeRadius && gameState.troops.getChildren()[i].team != troop.team && gameState.troops.getChildren()[i].type == 'ground'){
                    gameState.troops.getChildren()[i].health -= gameState.humanTankStats.areaDamage;
                }
            }
        },
        death: function(scene,troop){
            gameState.createExplosion(scene,troop.x,troop.y,1.1);
            troop.destroy();
        }
    },
    humanMechStats:{
        name: 'Human Mech',
        description: 'Moderate ground unit equipped with twin auto machine guns.',
        sprite: 'humanMech',
        cost: 125,
        health: 125,
        speed: 80,
        range: 225,
        damage: 5,
        airDamage: 7,
        fireRate: 200,
        type: 'ground',
        armour: true,
        target: 'ground&air',
        attack: function(scene,troop){
            if(troop.target.type == 'air'){
                troop.target.health -= gameState.humanMechStats.airDamage;
            }else {
                troop.target.health -= gameState.humanMechStats.damage;
            }
        },
        death: function(scene,troop){
            gameState.createExplosion(scene,troop.x,troop.y,1);
            troop.destroy();
        }
    },
    humanFalconStats:{
        name: 'Human Falcon',
        description: 'Aggressive Air unit that is profficient in destroying air units.',
        sprite: 'humanFalcon',
        cost: 150,
        health: 125,
        speed: 150,
        range: 175,
        damage: 20,
        airDamage: 40,
        fireRate: 1600,
        type: 'air',
        armour: true,
        target: 'ground&air',
        attack: function(scene,troop){
            if(troop.target.type == 'air'){
                var missile = gameState.bullets.create(troop.x,troop.y, `missile1`);
                missile.setRotation(Phaser.Math.Angle.Between(troop.x,troop.y,troop.target.x,troop.target.y)); 
                scene.physics.moveTo(missile, troop.target.x, troop.target.y,1000);
                
                scene.physics.add.overlap(missile, troop.target,(missile, targ)=>{
                    gameState.createExplosion(scene,troop.target.x,troop.target.y,0.8);
                    missile.destroy();
                    troop.target.health -= gameState.humanFalconStats.airDamage;
                });
            } else {
                var laser = gameState.bullets.create(troop.x,troop.y, `laser1`);
                laser.setRotation(Phaser.Math.Angle.Between(troop.x,troop.y,troop.target.x,troop.target.y)); 
                scene.physics.moveTo(laser, troop.target.x, troop.target.y,1300);

                scene.physics.add.overlap(laser, troop.target,(laser, targ)=>{
                    gameState.createExplosion(scene,troop.target.x,troop.target.y,0.4);
                    laser.destroy();
                    troop.target.health -= gameState.humanFalconStats.damage;
                });
            }
        },
        death: function(scene,troop){
            gameState.createExplosion(scene,troop.x,troop.y,1.1);
            troop.destroy();
        }
    },
    
    humanArmageddonStats:{
        name: 'Human Armageddon',
        description: 'Massive Tank that deploys troops and has light attack.',
        sprite: 'humanArmageddon',
        cost: 800,
        health: 500,
        speed: 30,
        range: 250,
        damage: 2,
        fireRate: 200,
        passiveRate: 30000,
        type: 'ground',
        armour: true,
        target: 'ground&air',
        attack: function(scene,troop){
            troop.target.health -= gameState.humanArmageddonStats.damage;
        },
        passive: function(scene,troop){
            troop.depth = 2;
            troop.anims.play(`humanArmageddon`+troop.color+`Idle`,true);
            var pause = scene.time.addEvent({
                delay: 1,
                callback: ()=>{
                    if(troop.health <= 0){
                        pause.destroy();
                    } else {
                        troop.setVelocityX(0);
                        troop.setVelocityY(0);
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: 400,
            }); 
            scene.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    scene.physics.moveTo(troop, troop.target.x, troop.target.y,gameState.humanArmageddonStats.speed);
                    troop.anims.play(`humanArmageddon`+troop.color+`Move`,true);
                },  
                startAt: 0,
                timeScale: 1,
            });
            var rand = Math.ceil(Math.random()*5);
            if (rand == 1){
                gameState.createTroop(scene,gameState.humanTrooperStats,troop.team,troop.x,troop.y+50);
                gameState.createTroop(scene,gameState.humanTrooperStats,troop.team,troop.x,troop.y);
                gameState.createTroop(scene,gameState.humanTrooperStats,troop.team,troop.x,troop.y-50);
            } else if (rand == 2){
                gameState.createTroop(scene,gameState.humanTrooperStats,troop.team,troop.x,troop.y+20);
                gameState.createTroop(scene,gameState.humanEndoTrooperStats,troop.team,troop.x,troop.y-30);
            } else if (rand == 3){
                gameState.createTroop(scene,gameState.humanTankStats,troop.team,troop.x,troop.y);
            } else if (rand == 4){
                gameState.createTroop(scene,gameState.humanMechStats,troop.team,troop.x,troop.y);
            } else if (rand == 5){
                gameState.createTroop(scene,gameState.humanSniperStats,troop.team,troop.x,troop.y+30);
                gameState.createTroop(scene,gameState.humanSniperStats,troop.team,troop.x,troop.y-30);
            }
        },
        death: function(scene,troop){
            gameState.createExplosion(scene,troop.x,troop.y,2);
            troop.destroy();
        }
    },
    
    humanBattleShipStats:{
        name: 'Human Battleship',
        description: 'Powerful air unit that deals massive damage.',
        sprite: 'humanBattleShip',
        cost: 550,
        health: 500,
        speed: 50,
        range: 300,
        damage: 50,
        armourDamage: 50,
        fireRate: 2250,
        type: 'air',
        armour: true,
        target: 'ground&air',
        attack: function(scene,troop){
            var laser = gameState.bullets.create(troop.x,troop.y, `laser1`);
            laser.setRotation(Phaser.Math.Angle.Between(troop.x,troop.y,troop.target.x,troop.target.y)); 
            scene.physics.moveTo(laser, troop.target.x, troop.target.y,1300);
            
            scene.physics.add.overlap(laser, troop.target,(laser, targ)=>{
                gameState.createExplosion(scene,troop.target.x,troop.target.y,0.4);
                laser.destroy();
                if(troop.target.armour == true){
                    troop.target.health -= gameState.humanBattleShipStats.armourDamage;
                }else {
                    troop.target.health -= gameState.humanBattleShipStats.damage;
                }
            });
        },
        death: function(scene,troop){
            gameState.createExplosion(scene,troop.x,troop.y,2);
            troop.destroy();
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
    
    
    createMap: function(scene, race1, race2, environment, length){
        game.scale.resize(1300, 650);
        var base;
        var enemyBase;
        if(race1 == 'human'){
            var base = gameState.troops.create(100,650/2, `humanHq`).setImmovable().setDepth(10000);
            base.anims.play('humanHqMove');
            
        }
        if(race2 == 'human'){
            var enemyBase = gameState.troops.create(gameState.mapWidth-100,650/2, `humanHqGreen`).setImmovable().setDepth(10000);
            enemyBase.anims.play('humanHqGreenMove');
        }
        
        base.team = 0;
        base.health = 5000;
        gameState.createHealthBar(scene,base,5000);
        base.type = 'building';
        base.depth = 4;
        var baseLoop = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(base.health <= 0){
                    baseLoop.destroy();
                    base.destroy();
                    scene.scene.pause("ArenaScene");
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        
        enemyBase.setRotation(Phaser.Math.Angle.Between(enemyBase.x,enemyBase.y,enemyBase.x-1,enemyBase.y)); 
        enemyBase.team = 1;
        enemyBase.health = 5000;
        gameState.createHealthBar(scene,enemyBase,5000);
        enemyBase.type = 'building';
        enemyBase.depth = 4;
        var enemyBaseLoop = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(enemyBase.health <= 0){
                    enemyBaseLoop.destroy();
                    enemyBase.destroy();
                    scene.scene.pause("ArenaScene");
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    
    
    createTroop: function(scene,troopStats,team,x,y){
        var troop = gameState.troops.create(-100,Math.ceil(Math.random()*600), `${troopStats.sprite}`);
        if(y){
            troop.y = y;
        }
        /*var rand = Math.ceil(Math.random()*2);
        if(rand == 1){
            troop.y = Math.ceil(Math.random()*(window.innerHeight/2-100));
        }else {
            troop.y = (window.innerHeight/2+100) + Math.ceil(Math.random()*(window.innerHeight/2-100));
        }*/
        
        var color = '';
        troop.color = ''
        if(team == 1){
            color = 'Green';
            troop.color = 'Green';
        }
        if(team == 0){
            troop.x = -100;
        } else {
            troop.x = gameState.mapWidth+100;
        }
        if(x){
            troop.x = x;
        }
        troop.health = troopStats.health;
        troop.target;
        troop.team = team;
        troop.type = troopStats.type;
        troop.armour = troopStats.armour;
        if(troop.type == 'ground'){
            troop.depth = 1;
        } else if (troop.type == 'air'){
            troop.depth = 5;
        } else {
            troop.depth = 0;
        }
        
        
        for (var i = 0; i < gameState.troops.getChildren().length; i++){ 
            if(gameState.troops.getChildren()[i].type == troop.type){
                scene.physics.add.collider(troop, gameState.troops.getChildren()[i]);
            }
        }
        
        if(troopStats.width){
            troop.body.width = troopStats.width;
            troop.body.offset.y = troopStats.width/5;
        } if (troopStats.height){
            troop.body.height = troopStats.height;
            troop.body.offset.y = troopStats.height/5;
        }
        
        gameState.createHealthBar(scene,troop,troopStats.health);
        
        var passiveLoop;
        if (troopStats.passive){
            passiveLoop = scene.time.addEvent({
                delay: troopStats.passiveRate,
                callback: ()=>{
                    troopStats.passive(scene,troop);
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            }); 
        }
        
        var attackLoop = scene.time.addEvent({
            delay: troopStats.fireRate,
            callback: ()=>{
                troop.anims.play(`${troopStats.sprite}`+color+`Attack`,true);
                troopStats.attack(scene,troop);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        attackLoop.paused = true;
        var idlePlayed = false;
        var mainLoop = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(troop.health > 0){
                    var dist;
                    var closest = 10000;
                    if(gameState.troops.getChildren().length > 0){
                        for (var i = 0; i < gameState.troops.getChildren().length; i++){ 
                            dist = Phaser.Math.Distance.BetweenPoints(gameState.troops.getChildren()[i], troop);
                            if(dist<closest && gameState.troops.getChildren()[i].team != troop.team){
                                closest = dist;
                                if(troopStats.target == 'ground&air'){
                                    troop.target = gameState.troops.getChildren()[i];
                                } else if (troopStats.target == 'ground' && gameState.troops.getChildren()[i].type == 'ground'){
                                    troop.target = gameState.troops.getChildren()[i];
                                } else if (troopStats.target == 'air' && gameState.troops.getChildren()[i].type == 'air'){
                                    troop.target = gameState.troops.getChildren()[i];
                                } else if (gameState.troops.getChildren()[i].type == 'building'){
                                    troop.target = gameState.troops.getChildren()[i];
                                }
                            }
                        }
                    }
                    if(!troop.target || troop.target.health <= 0){
                        
                    }else {
                        troop.setRotation(Phaser.Math.Angle.Between(troop.x,troop.y,troop.target.x,troop.target.y)); 
                        if(Phaser.Math.Distance.BetweenPoints(troop.target, troop) < troopStats.range && troop.target.health > 0){
                            if(idlePlayed == false){
                                troop.anims.play(`${troopStats.sprite}`+color+`Idle`,true);
                                idlePlayed = true;
                            }
                            troop.setVelocityX(0);
                            troop.setVelocityY(0);
                            attackLoop.paused = false;
                        }else {
                            idlePlayed = false;
                            scene.physics.moveTo(troop, troop.target.x, troop.target.y,troopStats.speed);
                            attackLoop.paused = true;
                            troop.anims.play(`${troopStats.sprite}`+color+`Move`,true);
                        }
                    }
                } else {
                    mainLoop.destroy();
                    attackLoop.destroy();
                    if(passiveLoop){
                        passiveLoop.destroy();
                    }
                    troopStats.death(scene,troop);
                }
                
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        
    },
    
    
    createExplosion: function(scene,x,y,scale){
        var explode = scene.physics.add.sprite(x,y,`buildingExplosion`).setScale(scale).setDepth(5);
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
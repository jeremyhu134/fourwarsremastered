
class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
	}
    preload(){
        this.load.image('selectedCircle','images/selectedCircle.png');
        this.load.image('confirmButton','images/confirmButton.png');
        this.load.image('cancelButton','images/cancelButton.png');
        this.load.image('buildMenuButton','images/buildMenuButton.png');
        
        //Misc
        this.load.image('spacePlatformBg','images/spacePlatformBg.png');
        this.load.spritesheet('bloodDeath','images/bloodDeath.png',{frameWidth: 32,frameHeight:32});
        this.load.spritesheet('explosion','images/explosion.png',{frameWidth: 75,frameHeight:75});
        this.load.image('moneyIcon','images/moneyIcon.png');
        this.load.image('upgradeIncomeIcon','images/upgradeIncomeIcon.png');
        this.load.image('upgradeTierIcon','images/upgradeTierIcon.png');
        this.load.image('summonDefenseIcon','images/summonDefenseIcon.png');
        
        //Projectiles
        this.load.image('bullet1','images/bullet1.png');
        this.load.image('missile1','images/missile1.png');
        this.load.image('laser1','images/laser1.png');
        
        //Human Troops
            //human Trooper
            this.load.spritesheet('humanTrooper','images/humanTrooper.png',{frameWidth: 50,frameHeight:50});
            this.load.spritesheet('humanTrooperGreen','images/humanTrooperGreen.png',{frameWidth: 50,frameHeight:50});
            //human Tank
            this.load.spritesheet('humanTank','images/humanTank.png',{frameWidth: 70,frameHeight:70});
            this.load.spritesheet('humanTankGreen','images/humanTankGreen.png',{frameWidth: 70,frameHeight:70});
            //human EndoTrooper
            this.load.spritesheet('humanEndoTrooper','images/humanEndoTrooper.png',{frameWidth: 60,frameHeight:60});
            this.load.spritesheet('humanEndoTrooperGreen','images/humanEndoTrooperGreen.png',{frameWidth: 60,frameHeight:60});
            //human Mech
            this.load.spritesheet('humanMech','images/humanMech.png',{frameWidth: 60,frameHeight:60});
            this.load.spritesheet('humanMechGreen','images/humanMechGreen.png',{frameWidth: 60,frameHeight:60});
            //human Sniper
            this.load.spritesheet('humanSniper','images/humanSniper.png',{frameWidth: 70,frameHeight:70});
            this.load.spritesheet('humanSniperGreen','images/humanSniperGreen.png',{frameWidth: 70,frameHeight:70});
            //human Armageddon
            this.load.spritesheet('humanArmageddon','images/humanArmageddon.png',{frameWidth: 140,frameHeight:140});
            this.load.spritesheet('humanArmageddonGreen','images/humanArmageddonGreen.png',{frameWidth: 140,frameHeight:140});
            //human Falcon
            this.load.spritesheet('humanFalcon','images/humanFalcon.png',{frameWidth: 70,frameHeight:70});
            this.load.spritesheet('humanFalconGreen','images/humanFalconGreen.png',{frameWidth: 70,frameHeight:70});
            //human BattleShip
            this.load.spritesheet('humanBattleShip','images/humanBattleShip.png',{frameWidth: 110,frameHeight:90});
            this.load.spritesheet('humanBattleShipGreen','images/humanBattleShipGreen.png',{frameWidth: 110,frameHeight:90});
        //Human Buildings
            //human Hq
            this.load.spritesheet('humanHq','images/humanHq.png',{frameWidth: 200,frameHeight:200});
            this.load.spritesheet('humanHqGreen','images/humanHqGreen.png',{frameWidth: 200 ,frameHeight:200});
            //human Turret
            this.load.spritesheet('humanTurret','images/humanTurret.png',{frameWidth: 90,frameHeight:90});
            this.load.spritesheet('humanTurretGreen','images/humanTurretGreen.png',{frameWidth: 90,frameHeight:90});
        
        
        //demon Buildings
            //demon Hq
            this.load.spritesheet('demonHq','images/demonHq.png',{frameWidth: 200,frameHeight:200});
            //demon Crawler
            this.load.spritesheet('demonCrawler','images/demonCrawler.png',{frameWidth: 40,frameHeight:30});
        
        
        //Buy Towers Stuff
        this.load.image('buyTowersBar','images/buyTowersBar.png');
        
        
    }
    create() {
        
        gameState.input=this.input;
        var scene = this;
        const connectId = Math.ceil(Math.random()*100);
        var peer = new Peer(connectId);
        gameState.connection;
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
            gameState.createTempText(scene,100,100,"ID: "+id,10000000,20);
        });
        var textbox = document.createElement("INPUT");
        textbox.setAttribute("type", "text");
        textbox.setAttribute("value", "Hello World!");
        textbox.setAttribute("id", "peerid");
        document.body.appendChild(textbox);
        var b = document.createElement("INPUT");
        b.setAttribute("type", "button");
        b.setAttribute("value", "Connect");
        document.body.appendChild(b);
        b.onclick = function(){
            if(gameState.connection){
                
            }else {
                gameState.connection = peer.connect(`${document.getElementById("peerid").value}`);
            }
        };
        
        
        peer.on('connection', x => {
            x.on('data', data => {
                if(data[0] == 'create'){
                    if(data[1] == 1){
                        console.log("MAKE");
                        gameState.createTroop(gameState.arena,gameState.humanTrooperStats,1,gameState.mapWidth+100,data[3],'Green');
                    } else if(data[1] == 2){
                        gameState.createTroop(gameState.arena,gameState.humanSniperStats,1,gameState.mapWidth+100,data[3],'Green');
                    } else if(data[1] == 3){
                        gameState.createTroop(gameState.arena,gameState.humanEndoTrooperStats,1,gameState.mapWidth+100,data[3],'Green');
                    } else if(data[1] == 4){
                        gameState.createTroop(gameState.arena,gameState.humanTankStats,1,gameState.mapWidth+100,data[3],'Green');
                    } else if(data[1] == 5){
                        gameState.createTroop(gameState.arena,gameState.humanMechStats,1,gameState.mapWidth+100,data[3],'Green');
                    } else if(data[1] == 6){
                        gameState.createTroop(gameState.arena,gameState.humanFalconStats,1,gameState.mapWidth+100,data[3],'Green');
                    } else if(data[1] == 7){
                        gameState.createTroop(gameState.arena,gameState.humanBattleShipStats,1,gameState.mapWidth+100,data[3],'Green');
                    } else if(data[1] == 8){
                        gameState.createTroop(gameState.arena,gameState.humanArmageddonStats,1,gameState.mapWidth+100,data[3],'Green');
                    }
                }
            })
            x.on('open', () => {
                console.log('open called from peer', x.peer);
                scene.scene.start('ArenaScene');
                if(!gameState.connection){
                    gameState.connection = peer.connect(x.peer);
                }
            })
        });
        
        gameState.playerTeam = 0;
        
        this.scale.pageAlignVertically = true;
        //Misc
            // explode
            this.anims.create({
                key: 'explode',
                frameRate: 10,
                frames:this.anims.generateFrameNames('explosion',{start: 0,end: 7})
            });
        
            //blood Death
            this.anims.create({
                key: 'bloodDeathMove',
                frameRate: 24,
                frames:this.anims.generateFrameNames('bloodDeath',{start: 0,end: 4})
            });
        
        
        //Humans
            //Human Hq
            //Blue
                this.anims.create({
                    key: 'humanHqMove',
                    frameRate: 1,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanHq',{start: 0,end: 1})
                });
            //Green
                this.anims.create({
                    key: 'humanHqGreenMove',
                    frameRate: 1,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanHqGreen',{start: 0,end: 1})
                });
            //Human Turret
            //Blue
                this.anims.create({
                    key: 'humanTurretIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanTurret',{start: 12,end: 12})
                });
                this.anims.create({
                    key: 'humanTurretMove',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanTurret',{start: 12,end: 12})
                });
                this.anims.create({
                    key: 'humanTurretAttack',
                    frameRate: 20,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTurret',{start: 12,end: 13})
                });
                this.anims.create({
                    key: 'humanTurretSpawn',
                    frameRate: 15,
                    frames:this.anims.generateFrameNames('humanTurret',{start: 1,end: 10})
                });
            //Green
                this.anims.create({
                    key: 'humanTurretGreenIdle',
                    frameRate: 1,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTurretGreen',{start: 12,end: 12})
                });
                this.anims.create({
                    key: 'humanTurretGreenMove',
                    frameRate: 1,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTurretGreen',{start: 12,end: 12})
                });
                this.anims.create({
                    key: 'humanTurretGreenAttack',
                    frameRate: 20,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTurretGreen',{start: 12,end: 13})
                });
                this.anims.create({
                    key: 'humanTurretGreenSpawn',
                    frameRate: 15,
                    frames:this.anims.generateFrameNames('humanTurretGreen',{start: 1,end: 10})
                });
        
        
            //Human Trooper
            //Blue
                this.anims.create({
                    key: 'humanTrooperIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanTrooper',{start: 4,end: 4})
                });
                this.anims.create({
                    key: 'humanTrooperMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTrooper',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTrooperAttack',
                    frameRate: 15,
                    frames:this.anims.generateFrameNames('humanTrooper',{start: 4,end: 5})
                });
                this.anims.create({
                    key: 'humanTrooperDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanTrooper',{start: 6,end: 8})
                });
            //Green
                this.anims.create({
                    key: 'humanTrooperGreenIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanTrooperGreen',{start: 4,end: 4})
                });
                this.anims.create({
                    key: 'humanTrooperGreenMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTrooperGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTrooperGreenAttack',
                    frameRate: 15,
                    frames:this.anims.generateFrameNames('humanTrooperGreen',{start: 4,end: 5})
                });
                this.anims.create({
                    key: 'humanTrooperGreenDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanTrooperGreen',{start: 6,end: 8})
                });
        
            //Human Tank
            //Blue
                this.anims.create({
                    key: 'humanTankIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanTank',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanTankMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTank',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTankAttack',
                    frameRate: 7,
                    frames:this.anims.generateFrameNames('humanTank',{start: 4,end: 7})
                });
                this.anims.create({
                    key: 'humanTankDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanTank',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanTankGreenIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanTankGreen',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanTankGreenMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTankGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTankGreenAttack',
                    frameRate: 15,
                    frames:this.anims.generateFrameNames('humanTankGreen',{start: 4,end: 7})
                });
                this.anims.create({
                    key: 'humanTankGreenDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanTankGreen',{start: 0,end: 0})
                });
        
            //Human Mech
            //Blue
                this.anims.create({
                    key: 'humanMechIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanMech',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanMechMove',
                    frameRate: 8,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanMech',{start: 0,end: 7})
                });
                this.anims.create({
                    key: 'humanMechAttack',
                    frameRate: 10,
                    frames:this.anims.generateFrameNames('humanMech',{start: 8,end: 9})
                });
                this.anims.create({
                    key: 'humanMechDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanMech',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanMechGreenIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanMechGreen',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanMechGreenMove',
                    frameRate: 8,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanMechGreen',{start: 0,end: 7})
                });
                this.anims.create({
                    key: 'humanMechGreenAttack',
                    frameRate: 10,
                    frames:this.anims.generateFrameNames('humanMechGreen',{start: 8,end: 9})
                });
                this.anims.create({
                    key: 'humanMechGreenDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanMechGreen',{start: 0,end: 0})
                });
        
            //Human Sniper
            //Blue
                this.anims.create({
                    key: 'humanSniperIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanSniper',{start: 4,end: 4})
                });
                this.anims.create({
                    key: 'humanSniperMove',
                    frameRate: 8,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanSniper',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanSniperAttack',
                    frameRate: 10,
                    frames:this.anims.generateFrameNames('humanSniper',{start: 4,end: 6})
                });
                this.anims.create({
                    key: 'humanSniperDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanSniper',{start: 7,end: 9})
                });
            //Green
                this.anims.create({
                    key: 'humanSniperGreenIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanSniperGreen',{start: 4,end: 4})
                });
                this.anims.create({
                    key: 'humanSniperGreenMove',
                    frameRate: 8,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanSniperGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanSniperGreenAttack',
                    frameRate: 10,
                    frames:this.anims.generateFrameNames('humanSniperGreen',{start: 4,end: 6})
                });
                this.anims.create({
                    key: 'humanSniperGreenDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanSniperGreen',{start: 7,end: 9})
                });
        
            //Human EndoTrooper
            //Blue
                this.anims.create({
                    key: 'humanEndoTrooperIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanEndoTrooper',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanEndoTrooperMove',
                    frameRate: 5,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanEndoTrooper',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanEndoTrooperAttack',
                    frameRate: 10,
                    frames:this.anims.generateFrameNames('humanEndoTrooper',{start: 4,end: 8})
                });
                this.anims.create({
                    key: 'humanEndoTrooperDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanEndoTrooper',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanEndoTrooperGreenIdle',
                    frameRate: 1,
                    frames:this.anims.generateFrameNames('humanEndoTrooperGreen',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanEndoTrooperGreenMove',
                    frameRate: 5,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanEndoTrooperGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanEndoTrooperGreenAttack',
                    frameRate: 10,
                    frames:this.anims.generateFrameNames('humanEndoTrooperGreen',{start: 4,end: 8})
                });
                this.anims.create({
                    key: 'humanEndoTrooperGreenDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanEndoTrooperGreen',{start: 0,end: 0})
                });
            
            //Human BattleShip
            //Blue
                this.anims.create({
                    key: 'humanBattleShipIdle',
                    frameRate: 10,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanBattleShip',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanBattleShipMove',
                    frameRate: 5,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanBattleShip',{start: 4,end: 7})
                });
                this.anims.create({
                    key: 'humanBattleShipAttack',
                    frameRate: 10,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanBattleShip',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanBattleShipDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanBattleShip',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanBattleShipGreenIdle',
                    frameRate: 1,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanBattleShipGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanBattleShipGreenMove',
                    frameRate: 5,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanBattleShipGreen',{start: 4,end: 7})
                });
                this.anims.create({
                    key: 'humanBattleShipGreenAttack',
                    frameRate: 10,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanBattleShipGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanBattleShipGreenDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanBattleShipGreen',{start: 0,end: 0})
                });
        
            //Human Falcon
            //Blue
                this.anims.create({
                    key: 'humanFalconIdle',
                    frameRate: 0,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanFalcon',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanFalconMove',
                    frameRate: 24,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanFalcon',{start: 1,end: 4})
                });
                this.anims.create({
                    key: 'humanFalconAttack',
                    frameRate: 20,
                    frames:this.anims.generateFrameNames('humanFalcon',{start: 5,end: 9})
                });
                this.anims.create({
                    key: 'humanFalconDeath',
                    frameRate: 0,
                    frames:this.anims.generateFrameNames('humanFalcon',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanFalconGreenIdle',
                    frameRate: 0,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanFalconGreen',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanFalconGreenMove',
                    frameRate: 24,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanFalconGreen',{start: 1,end: 4})
                });
                this.anims.create({
                    key: 'humanFalconGreenAttack',
                    frameRate: 20,
                    frames:this.anims.generateFrameNames('humanFalconGreen',{start: 5,end: 9})
                });
                this.anims.create({
                    key: 'humanFalconGreenDeath',
                    frameRate: 0,
                    frames:this.anims.generateFrameNames('humanFalconGreen',{start: 0,end: 0})
                });
        
            //Human Armageddon
            //Blue
                this.anims.create({
                    key: 'humanArmageddonIdle',
                    frameRate: 14,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanArmageddon',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanArmageddonMove',
                    frameRate: 9,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanArmageddon',{start: 0,end: 8})
                });
                this.anims.create({
                    key: 'humanArmageddonAttack',
                    frameRate: 16,
                    frames:this.anims.generateFrameNames('humanArmageddon',{start: 13,end: 15})
                });
                
                this.anims.create({
                    key: 'humanArmageddonDeath',
                    frameRate: 0,
                    frames:this.anims.generateFrameNames('humanArmageddon',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanArmageddonGreenIdle',
                    frameRate: 14,
                    frames:this.anims.generateFrameNames('humanArmageddonGreen',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'humanArmageddonGreenMove',
                    frameRate: 9,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanArmageddonGreen',{start: 0,end: 8})
                });
                this.anims.create({
                    key: 'humanArmageddonGreenAttack',
                    frameRate: 16,
                    frames:this.anims.generateFrameNames('humanArmageddonGreen',{start: 13,end: 15})
                });
                this.anims.create({
                    key: 'humanArmageddonGreenDeath',
                    frameRate: 0,
                    frames:this.anims.generateFrameNames('humanArmageddonGreen',{start: 0,end: 0})
                });
        
        
        
        //demons
            //demon Hq
            //Red
                this.anims.create({
                    key: 'demonHqMove',
                    frameRate: 1,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('demonHq',{start: 0,end: 1})
                });
            //demon Crawler
            //Red
                this.anims.create({
                    key: 'demonCrawlerIdle',
                    frameRate: 0,
                    frames:this.anims.generateFrameNames('demonCrawler',{start: 0,end: 0})
                });
                this.anims.create({
                    key: 'demonCrawlerMove',
                    frameRate: 24,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('demonCrawler',{start: 0,end: 5})
                });
                this.anims.create({
                    key: 'demonCrawlerAttack',
                    frameRate: 60,
                    frames:this.anims.generateFrameNames('demonCrawler',{start: 6,end: 15})
                });
                this.anims.create({
                    key: 'demonCrawlerDeath',
                    frameRate: 0,
                    frames:this.anims.generateFrameNames('demonCrawler',{start: 0,end: 0})
                });
            
        
        
        //var button = this.add.image(window.innerWidth/2,window.innerHeight/2,'startButton').setInteractive();
        gameState.input = this.input;
        /*button.on('pointerdown', function(pointer){
            
        });*/
	}
    update(){
        
    }
}
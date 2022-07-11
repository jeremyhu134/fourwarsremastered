
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
        this.load.spritesheet('explosion','images/explosion.png',{frameWidth: 75,frameHeight:75});
        this.load.image('moneyIcon','images/moneyIcon.png');
        this.load.image('upgradeIncomeIcon','images/upgradeIncomeIcon.png');
        
        //bullets
        this.load.image('bullet1','images/bullet1.png');
        
        //Human Troops
            //human Trooper
            this.load.spritesheet('humanTrooper','images/humanTrooper.png',{frameWidth: 50,frameHeight:50});
            this.load.spritesheet('humanTrooperGreen','images/humanTrooperGreen.png',{frameWidth: 50,frameHeight:50});
            //human Tank
            this.load.spritesheet('humanTank','images/humanTank.png',{frameWidth: 70,frameHeight:70});
            this.load.spritesheet('humanTankGreen','images/humanTankGreen.png',{frameWidth: 70,frameHeight:70});
            //human Mech
            this.load.spritesheet('humanMech','images/humanMech.png',{frameWidth: 60,frameHeight:60});
            this.load.spritesheet('humanMechGreen','images/humanMechGreen.png',{frameWidth: 60,frameHeight:60});
            //human Sniper
            this.load.spritesheet('humanSniper','images/humanSniper.png',{frameWidth: 70,frameHeight:70});
            this.load.spritesheet('humanSniperGreen','images/humanSniperGreen.png',{frameWidth: 70,frameHeight:70});
        //Human Buildings
            //human Hq
            this.load.spritesheet('humanHq','images/humanHq.png',{frameWidth: 200,frameHeight:200});
            this.load.spritesheet('humanHqGreen','images/humanHqGreen.png',{frameWidth: 200 ,frameHeight:200});
        
        //Buy Towers Stuff
        this.load.image('buyTowersBar','images/buyTowersBar.png');
        
        
    }
    create() {
        this.scale.pageAlignVertically = true;
        //Misc
            // explode
            this.anims.create({
                key: 'explode',
                frameRate: 10,
                frames:this.anims.generateFrameNames('explosion',{start: 0,end: 7})
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
            
        
        
        
        //var button = this.add.image(window.innerWidth/2,window.innerHeight/2,'startButton').setInteractive();
        gameState.globalScene = this;
        gameState.input = this.input;
        gameState.globalScene.scene.start('ArenaScene');
        /*button.on('pointerdown', function(pointer){
            
        });*/
	}
    update(){
        
    }
}
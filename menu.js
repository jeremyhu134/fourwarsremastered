
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
        
        //Buy Towers Stuff
        this.load.image('buyTowersBar','images/buyTowersBar.png');
        
        //Towers
            //Dust
            this.load.spritesheet('buildDust','images/buildDust.png',{frameWidth: 50,frameHeight: 50});
        this.load.spritesheet('knightBarracks','images/knightBarracks.png',{frameWidth: 70,frameHeight: 70});
        this.load.spritesheet('archerCamp','images/archerCamp.png',{frameWidth: 70,frameHeight: 70});
        
        //Troops
        //Spawnlight
            this.load.spritesheet('spawnLight','images/spawnLight.png',{frameWidth: 50,frameHeight: 50});
        this.load.spritesheet('knightTroop','images/knightTroop.png',{frameWidth: 64,frameHeight: 45});
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
            //Human Trooper
            //Blue
                this.anims.create({
                    key: 'humanTrooperMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTrooper',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTrooperAttack',
                    frameRate: 15,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTrooper',{start: 4,end: 5})
                });
                this.anims.create({
                    key: 'humanTrooperDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanTrooper',{start: 6,end: 8})
                });
            //Green
                this.anims.create({
                    key: 'humanTrooperGreenMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTrooperGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTrooperGreenAttack',
                    frameRate: 15,
                    repeat: -1,
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
                    key: 'humanTankMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTank',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTankAttack',
                    frameRate: 7,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTank',{start: 4,end: 7})
                });
                this.anims.create({
                    key: 'humanTankDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanTank',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanTankGreenMove',
                    frameRate: 6,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanTankGreen',{start: 0,end: 3})
                });
                this.anims.create({
                    key: 'humanTankGreenAttack',
                    frameRate: 15,
                    repeat: -1,
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
                    key: 'humanMechMove',
                    frameRate: 8,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanMech',{start: 0,end: 7})
                });
                this.anims.create({
                    key: 'humanMechAttack',
                    frameRate: 10,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanMech',{start: 8,end: 9})
                });
                this.anims.create({
                    key: 'humanMechDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanMech',{start: 0,end: 0})
                });
            //Green
                this.anims.create({
                    key: 'humanMechGreenMove',
                    frameRate: 8,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanMechGreen',{start: 0,end: 7})
                });
                this.anims.create({
                    key: 'humanMechGreenAttack',
                    frameRate: 10,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('humanMechGreen',{start: 8,end: 9})
                });
                this.anims.create({
                    key: 'humanMechGreenDeath',
                    frameRate: 5,
                    frames:this.anims.generateFrameNames('humanMechGreen',{start: 0,end: 0})
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
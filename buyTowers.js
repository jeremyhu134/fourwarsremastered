class BuyTroopScene extends Phaser.Scene {
    constructor() {
		super({ key: 'BuyTroopScene' })
	}
    preload(){
        
    }
    create() {
        this.scene.bringToTop();
        
        var scene = this;
        
        var bar = this.add.image(0,570,'buyTowersBar').setOrigin(0,0).setScale(4);
        
        if(!gameState.towerSelected){
            gameState.towerSelected = 'none';
        }
        if(!gameState.towerStats){
            gameState.towerStats = 'none';
        }
        var confirm = this.add.image(1180,585,'confirmButton').setOrigin(0,0).setInteractive();
        confirm.on('pointerup', () => {
            if(gameState.towerSelected != 'none'){
                gameState.createBluePrint(gameState.globalScene,gameState.towerStats);
            }
		});
        
        var cancel = this.add.image(1235,585,'cancelButton').setOrigin(0,0).setInteractive();
        cancel.on('pointerup', () => {
            gameState.bluePrint.destroy();
		});
        
        var nameAndCost = scene.add.text( 800, 590, `Select Troop`, {
            fill: '#OOOOOO', 
            fontSize: '25px',
            fontFamily: 'Qahiri',
            strokeThickness: 10,
        });
        
        //Human Trooper
        var humanTrooper = this.add.image(30,585,'humanTrooper').setOrigin(0,0).setInteractive()
        humanTrooper.setScale(50/humanTrooper.height);
        humanTrooper.on('pointerover', () => {
            nameAndCost.setText(`${gameState.humanTrooperStats.name} $${gameState.humanTrooperStats.cost}`);
		});
        humanTrooper.on('pointerdown', () => {
            gameState.createTroop(gameState.arena,gameState.humanTrooperStats,0);
		});
        
        //Human Tank
        var humanTank = this.add.image(100,585,'humanTank').setOrigin(0,0).setInteractive()
        humanTank.setScale(50/humanTank.height);
        humanTank.on('pointerover', () => {
            nameAndCost.setText(`${gameState.humanTankStats.name} $${gameState.humanTankStats.cost}`);
		});
        humanTank.on('pointerdown', () => {
            gameState.createTroop(gameState.arena,gameState.humanTankStats,0);
		});
        
        //Human Mech
        var humanMech = this.add.image(170,585,'humanMech').setOrigin(0,0).setInteractive()
        humanMech.setScale(50/humanMech.height);
        humanMech.on('pointerover', () => {
            nameAndCost.setText(`${gameState.humanMechStats.name} $${gameState.humanMechStats.cost}`);
		});
        humanMech.on('pointerdown', () => {
            gameState.createTroop(gameState.arena,gameState.humanMechStats,0);
		});
	}
    update(){
        
    }
}
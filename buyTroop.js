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
        var nameAndCost = scene.add.text( 750, 590, `Select Troop`, {
            fill: '#OOOOOO', 
            fontSize: '25px',
            fontFamily: 'Qahiri',
            strokeThickness: 10,
        });
        
        
        gameState.moneyIncome = 0.1;
        gameState.upgrades = 0;
        this.add.image(10,10,'moneyIcon').setOrigin(0,0);
        gameState.moneyText = scene.add.text( 50, 10, `${gameState.money}`, {
            fill: '#OOOOOO', 
            fontSize: '20px',
            fontFamily: 'Qahiri',
            strokeThickness: 3,
        }).setDepth(window.innerHeight+3);
        gameState.updateMoney = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                gameState.money += gameState.moneyIncome;
                gameState.moneyText.setText(`${Math.ceil(gameState.money)}`);
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        }); 
        var upgradeIncome = this.add.image(1200,585,'upgradeIncomeIcon').setOrigin(0,0).setInteractive();
        gameState.upgradeIncomeCost = 100;
        upgradeIncome.setScale(50/upgradeIncome.height);
        upgradeIncome.on('pointerover', () => {
            if(gameState.upgrades >= 5){
                nameAndCost.setText(`Upgrade Income  MAXED`);
            }else {
                nameAndCost.setText(`Upgrade Income  $${gameState.upgradeIncomeCost}`);
            }
		});
        upgradeIncome.on('pointerdown', () => {
            if(gameState.money >= gameState.upgradeIncomeCost && gameState.upgrades < 5){
                gameState.upgrades++;
                gameState.money -= gameState.upgradeIncomeCost;
                gameState.upgradeIncomeCost += 100;
                nameAndCost.setText(`Upgrade Income  $${gameState.upgradeIncomeCost}`);
                gameState.moneyIncome += .1;
            }
		});
        
        
        
        gameState.tier = 1;
        var upgradeTier = this.add.image(1130,585,'upgradeTierIcon').setOrigin(0,0).setInteractive();
        gameState.upgradeTierCost = 200;
        upgradeTier.setScale(50/upgradeTier.height);
        upgradeTier.on('pointerover', () => {
            if(gameState.tier >= 3){
                nameAndCost.setText(`Upgrade Tier  MAXED`);
            }else {
                nameAndCost.setText(`Upgrade Tier : ${gameState.tier}   $${gameState.upgradeTierCost}`);
            }
		});
        upgradeTier.on('pointerdown', () => {
            if(gameState.money >= gameState.upgradeTierCost && gameState.tier < 3){
                gameState.tier++;
                gameState.money -= gameState.upgradeTierCost;
                if(gameState.tier == 2){
                    gameState.upgradeTierCost = 500;
                    //Human Tank
                    var humanTank = scene.add.image(240,585,'humanTank').setOrigin(0,0).setInteractive()
                    humanTank.setScale(50/humanTank.height);
                    humanTank.on('pointerover', () => {
                        nameAndCost.setText(`${gameState.humanTankStats.name} $${gameState.humanTankStats.cost}`);
                    });
                    humanTank.on('pointerdown', () => {
                        if(gameState.money >= gameState.humanTankStats.cost){
                            gameState.createTroop(gameState.arena,gameState.humanTankStats,0,null,null,gameState.color);
                            gameState.money -= gameState.humanTankStats.cost;
                        }
                    });

                    //Human Mech
                    var humanMech = scene.add.image(310,585,'humanMech').setOrigin(0,0).setInteractive()
                    humanMech.setScale(50/humanMech.height);
                    humanMech.on('pointerover', () => {
                        nameAndCost.setText(`${gameState.humanMechStats.name} $${gameState.humanMechStats.cost}`);
                    });
                    humanMech.on('pointerdown', () => {
                        if(gameState.money >= gameState.humanMechStats.cost){
                            gameState.createTroop(gameState.arena,gameState.humanMechStats,0,null,null,gameState.color);
                            gameState.money -= gameState.humanMechStats.cost;
                        }
                    });

                    //Human Falcon
                    var humanFalcon = scene.add.image(380,585,'humanFalcon').setOrigin(0,0).setInteractive()
                    humanFalcon.setScale(50/humanFalcon.height);
                    humanFalcon.on('pointerover', () => {
                        nameAndCost.setText(`${gameState.humanFalconStats.name} $${gameState.humanFalconStats.cost}`);
                    });
                    humanFalcon.on('pointerdown', () => {
                        if(gameState.money >= gameState.humanFalconStats.cost){
                            gameState.createTroop(gameState.arena,gameState.humanFalconStats,0,null,null,gameState.color);
                            gameState.money -= gameState.humanFalconStats.cost;
                        }
                    });
                } else if (gameState.tier == 3){
                    //Human BattleShip
                    var humanBattleShip = scene.add.image(450,585,'humanBattleShip').setOrigin(0,0).setInteractive()
                    humanBattleShip.setScale(50/humanBattleShip.height);
                    humanBattleShip.on('pointerover', () => {
                        nameAndCost.setText(`${gameState.humanBattleShipStats.name} $${gameState.humanBattleShipStats.cost}`);
                    });
                    humanBattleShip.on('pointerdown', () => {
                        if(gameState.money >= gameState.humanBattleShipStats.cost){
                            gameState.createTroop(gameState.arena,gameState.humanBattleShipStats,0,null,null,gameState.color);
                            gameState.money -= gameState.humanBattleShipStats.cost;
                        }
                    });
                    
                    //Human Armageddon
                    var humanArmageddon = scene.add.image(520,585,'humanArmageddon').setOrigin(0,0).setInteractive()
                    humanArmageddon.setScale(50/humanArmageddon.height);
                    humanArmageddon.on('pointerover', () => {
                        nameAndCost.setText(`${gameState.humanArmageddonStats.name} $${gameState.humanArmageddonStats.cost}`);
                    });
                    humanArmageddon.on('pointerdown', () => {
                        if(gameState.money >= gameState.humanArmageddonStats.cost){
                            gameState.createTroop(gameState.arena,gameState.humanArmageddonStats,0,null,null,gameState.color);
                            gameState.money -= gameState.humanArmageddonStats.cost;
                            
                        }
                    });
                }
            }
		});
        
        var defense = false;
        
        var upgradeDefense = this.add.image(1060,585,'summonDefenseIcon').setOrigin(0,0).setInteractive();
        upgradeDefense.setScale(50/upgradeDefense.height);
        upgradeDefense.on('pointerover', () => {
            if(defense == true){
                nameAndCost.setText(`Summon Defense : MAX`);
            }else {
                nameAndCost.setText(`Summon Defense  $${200}`);
            }
		});
        upgradeDefense.on('pointerdown', () => {
            if(gameState.money >= 200 && defense == false){
                defense = true;
                gameState.money -= 200;
                if(gameState.race == 'human'){
                    gameState.createDefense(this,0,gameState.color,gameState.humanTurretStats);
                }
            }
		});
        
        
        
        
        
        //Human Trooper
        var humanTrooper = scene.add.image(30,585,'humanTrooper').setOrigin(0,0).setInteractive()
        humanTrooper.setScale(50/humanTrooper.height);
        humanTrooper.on('pointerover', () => {
            nameAndCost.setText(`${gameState.humanTrooperStats.name} $${gameState.humanTrooperStats.cost}`);
		});
        humanTrooper.on('pointerdown', () => {
            if(gameState.money >= gameState.humanTrooperStats.cost){
                gameState.createTroop(gameState.arena,gameState.humanTrooperStats,0,null,null,gameState.color);
                gameState.money -= gameState.humanTrooperStats.cost;
            }
		});
        
        //Human Sniper
        var humanSniper = scene.add.image(100,585,'humanSniper').setOrigin(0,0).setInteractive();
        humanSniper.setScale(60/humanSniper.height);
        humanSniper.on('pointerover', () => {
            nameAndCost.setText(`${gameState.humanSniperStats.name} $${gameState.humanSniperStats.cost}`);
		});
        humanSniper.on('pointerdown', () => {
            if(gameState.money >= gameState.humanSniperStats.cost){
                gameState.createTroop(gameState.arena,gameState.humanSniperStats,0,null,null,gameState.color);
                gameState.money -= gameState.humanSniperStats.cost;
            }
		});
        
        //Human EndoTrooper
        var humanEndoTrooper = scene.add.image(170,585,'humanEndoTrooper').setOrigin(0,0).setInteractive();
        humanEndoTrooper.setScale(50/humanEndoTrooper.height);
        humanEndoTrooper.on('pointerover', () => {
            nameAndCost.setText(`${gameState.humanEndoTrooperStats.name} $${gameState.humanEndoTrooperStats.cost}`);
		});
        humanEndoTrooper.on('pointerdown', () => {
            if(gameState.money >= gameState.humanEndoTrooperStats.cost){
                gameState.createTroop(gameState.arena,gameState.humanEndoTrooperStats,0,null,null,gameState.color);
                gameState.money -= gameState.humanEndoTrooperStats.cost;
            }
		});
        
	}
    update(){
        
    }
}
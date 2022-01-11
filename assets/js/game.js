//Player's Information
var playerInfo= {
    name: window.prompt ("What is your robot's name?"),
    health: 100,
    attack : 10,
    money : 10,
     //the function inside of an object is known as a  METHOD
    //"this" refers to object. in this case- playerInfo
    reset:function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //comma before new method
    refillHealth:function(){
        this.health += 20;
        this.money -=7;
    },//comma!
    upgradeAttack: function(){
        this.attack +=6;
        this.money -= 7;
    }
};

//function generates random numerical value
var randomNumber = function(min, max){
    var value = Math.floor(Math.random()*(max-min+1)) + min;

    return value;
};
//Enemy Robots informtion: Name and attack. Attack will be a random value between 10 and 14
var enemyInfo = [
    {
        name: "Roboto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

var startGame = function(){
    //reset player stats
    playerInfo.reset();
    for ( var i = 0; i <enemyInfo.length; i++) {
        if (playerInfo.health > 0){
            window.alert( "Welcome to Robot Gladiators! Round " + (i+1))
            var pickedEnemyObj = enemyInfo[i]
            //randomize enemy's health between 40 and 60
            pickedEnemyObj.health = randomNumber(40, 60);
            //call fight function with enemy-robot
            fight(pickedEnemyObj);
            //if we're not at the last enemy in the array
            if(playerInfo.health > 0 && i < enemyInfo.length-1){
                var storeConfirm = window.confirm("The fight is over. Enter the store before next round?");

                //if yes, take them to the store ()
                if(storeConfirm){
                    shop();
                }
            }
        }else{
            window.alert(" You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //play again
    endGame ();
};

var fight = function(enemy) {

    console.log(enemy);
    
    while (enemy.health > 0 && playerInfo.health > 0){
        //Prompt the user to FIGHT or SKIP
        var promptFight = window.prompt("Whould you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        //if palyer picks skip confrim then stop the loop
        if( promptFight === "skip" || promptFight === "SKIP"){
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");
            //if yes (true), skip fight

            if (confirmSkip){
                window.alert(playerInfo.name + " has choosen to skip the fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money)
                break;
            }
        }

        //Subtract the value of 'playerInfo.attack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
        //Generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        //Log a resulting message to the console so we know that it worked. 
        console.log( 
             playerInfo.name + " attacked " + enemy.name + " . " + enemy.name + " now has " + enemy.health + " health remaining."
        );
                
        //Check enemy's health
        if (enemy.health<=0){
            window.alert( enemy.name + " has died.");
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            //Leave while loop since enemy is dead
             break;
        } else{
            window.alert( enemy.name + " still has " + enemy.health + " health left.");
        }
                
        //Subtract the value of 'enemyAttack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable
        //Generate random damage based on enemy's attack power
        var damage = randomNumber (enemy.attack - 3, enemy.attack)
        playerInfo.health = Math.max(0, playerInfo.health - damage); 
        //Log a resulting message to the console so we know that it worked. 
        console.log(           
             enemy.name + " attacked " + playerInfo.name + " . " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
        )         
           
        //Check player's health
        if(playerInfo.health <= 0){
            window.alert( playerInfo.name + " has died.");
            break;
        } else{
            window.alert (playerInfo.name + " still has " + playerInfo.health + " health left.");             
        }
    }
};            

//function to end the entire game
var endGame = function(){
    //if the player is still alive, player wins!
    if (playerInfo.health > 0){
        window.alert("Great job! You survived the game. You have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }
    //ask player if they would like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm){
        //restart the game
        startGame()
    } else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function(){
    console.log( "Entered the shop.");
    //ask the player what they'd like to do
    var shopOptionPrompt = window.prompt ("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE' or 'LEAVE; to make a choice.");
    
    //Use switch to carry out action
    switch (shopOptionPrompt){
        case "REFILL":
        case "refill":
            if(playerInfo.money>=7){
                window.alert("Refilling the player's health by 20 for 7 dollars.");
                //refill health and decrease money
                playerInfo.health = playerInfo.health + 20;
                playerInfo.money = playerInfo.money-7;
            }else{
                window.alert("You don't have enough money!");
                break;
            }
        
        
        case "UPGRADE":
        case "upgrade":
            if(playerInfo.money >= 7){
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                //upgrade attack and decrease money
                playerInfo.attack = playerInfo.attack + 6;
                playerInfo.money = playerInfo.money - 7;
            } else {
                window.alert("You don't have enough money!");
                break;
            }

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
            
        default:
            window.alert("You did not pick a valid option. Try again.")
            //call shop again to force the player to pick a valid option
            shop();
            break;
    };

    

}

//start the game when the webpage loads
startGame();

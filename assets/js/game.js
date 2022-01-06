//Player's Information
var playerName = window.prompt ("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You can also log multiple values at one like this
//console.log(playerName, playerAttack, playerHealth);

var enemyNames= ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//console.log(enemyNames);

//console.log(enemyNames.length);


var fight = function(enemyName) {
    
    while (enemyHealth > 0 && playerHealth > 0){
        //Prompt the user to FIGHT or SKIP
        var promptFight = window.prompt("Whould you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
                   
        if( promptFight === "skip" || promptFight === "SKIP"){
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");
            //if yes (true), skip fight
            if (confirmSkip){
            window.alert(playerName + " has choosen to skip the fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney", playerMoney)
            break;
            }
        }


        //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
            enemyHealth = enemyHealth - playerAttack;
        //Log a resulting message to the console so we know that it worked. 
        console.log( 
             playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + " health remaining."
        );
                
        //Check enemy's health
        if (enemyHealth<=0){
            window.alert( enemyName + " has died.");
            //award player money for winning
            playerMoney = playerMoney + 20;
            //Leave while loop since enemy is dead
             break;
        } else{
            window.alert( enemyName + " still has " + enemyHealth + " health left.");
        }
                
        //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
        playerHealth = playerHealth - enemyAttack; 
        //Log a resulting message to the console so we know that it worked. 
        console.log(           
             enemyName + " attacked " + playerName + " . " + playerName + " now has " + playerHealth + " health remaining. "
        )         
           
        //Check player's health
        if(playerHealth <= 0){
            window.alert( playerName + " has died.");
            break;
        } else{
            window.alert (playerName + " still has " + playerHealth + " health left.");             
        }
    }
};            
            
for ( var i = 0; i <enemyNames.length; i++) {
    if (playerHealth > 0){
        window.alert( "Welcome to Robot Gladiators! Round " + (i+1))
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50;
        //call fight function with enemy-robot
        fight(pickedEnemyName);
    }else{
        window.alert(" You have lost your robot in battle! Game Over!");
        break;
    }
}


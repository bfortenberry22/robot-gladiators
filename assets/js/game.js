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

//Games States
//"WIN" -Player robot has defeated all enemy-robots
//    *Fight all enemy-robots
//     *Defeat all enemy-robots  
//"LOSE"-Player robot's health is zero or less

var fight = function(enemyName) {
    
    while (enemyHealth > 0){
        //Prompt the user to FIGHT or SKIP
        var promptFight = window.prompt("Whould you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
        //if the plater choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT"){ 
        
           
            //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
            enemyHealth = enemyHealth - playerAttack;
            
            
            //Log a resulting message to the console so we know that it worked. 
            console.log( 
                playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + " health remaining."
            );
                
            //Check enemy's health
            if (enemyHealth<=0){
                 window.alert( enemyName + " has died.");
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
            } else{
                window.alert (playerName + " still has " + playerHealth + " health left.");             
            }

        //if the player choses SKIP
                    
        }else if( promptFight === "skip" || promptFight === "SKIP"){
                    //confirm player wants to skip
                    var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");
                    //if yes (true), skip fight
                    if (confirmSkip){
                        window.alert(playerName + " has choosen to skip the fight!");
                        //subtract money from playerMoney for skipping
                        playerMoney = playerMoney - 2;
                        //if no (false), ask question again by running fight() again
                    } else {
                        fight();
                    }
                    //if player does not type in a proper response    
                } else{
                    window.alert("You need to choose a valid option. Try again!");
                }
            }
        }    
            
            
for ( var i = 0; i <enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    //call fight function with enemy-robot
    fight(pickedEnemyName);
}

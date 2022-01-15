/* Game Functions*/

//function generates random numerical value
var randomNumber = function(min, max){
    var value = Math.floor(Math.random()*(max-min+1)) + min;

    return value;
};

//function to see if player wants to fight or skip
var fightOrSkip = function(){
    //ask player if they would like to fight or skip
    var promptFight = window.prompt("Whould you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
   
    //validate prompt answer
    if (promptFight === "" || promptFight=== null){
        window.alert("You need to provide a valid answer! Please try again.");        
        fightOrSkip();
    }

    //convert promptFight to all lowercase so we can check with less options
    promptFight = promptFight.toLowerCase();

    if( promptFight === "skip"){
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

        //if yes (true), skip fight
        if (confirmSkip){
            window.alert(playerInfo.name + " has choosen to skip the fight. Goodbye!");
            //subtract money from playerInfo.money for skipping
             playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            
            //return true if player wants to leave
             return true;
            
        }
    }
    return false;
};

//fight function (now with parameter for enemy's object holding name, and attack values)
var fight = function(enemy) {

    //Keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5){
        isPlayerTurn = false;
    }
    
    while (enemy.health > 0 && playerInfo.health > 0){
        if (isPlayerTurn) {
            //Prompt the user to FIGHT or SKIP using fightOrSKip function
            if (fightOrSkip ()){
                //if true, leave the fight by break loop
                break;
            }

            //Generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            //Subtract the value of 'playerInfo.attack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
            enemy.health = Math.max(0, enemy.health - damage);
            //Log a resulting message to the console so we know that it worked. 
            console.log( 
                playerInfo.name + " attacked " + enemy.name + " . " + enemy.name + " now has " + enemy.health + " health remaining.");
                
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
        //player gets attacked first        
        } else{   
            //Generate random damage based on enemy's attack power
            var damage = randomNumber (enemy.attack - 3, enemy.attack)
            //Subtract the value of 'enemyAttack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable
            playerInfo.health = Math.max(0, playerInfo.health - damage); 
            //Log a resulting message to the console so we know that it worked. 
            console.log(           
                enemy.name + " attacked " + playerInfo.name + " . " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
            );         
            
            //Check player's health
            if(playerInfo.health <= 0){
                window.alert( playerInfo.name + " has died.");
                break;
            } else{
                window.alert (playerInfo.name + " still has " + playerInfo.health + " health left.");             
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};            


//function to start a new game
var startGame = function(){
    //reset player stats
    playerInfo.reset();

    //fight each enemy robot by looping over them and fighting them one at a time
    for ( var i = 0; i <enemyInfo.length; i++) {
        //check player stats
        console.log(playerInfo);

        //if the player is still alive, keep fighting
        if (playerInfo.health > 0){
            //let the player know what round theyre in
            window.alert( "Welcome to Robot Gladiators! Round " + (i+1));
            
            //pick a new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i]

            //randomize enemy's health between 40 and 60
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            //call fight function with enemy-robot
            fight(pickedEnemyObj);

            //if player is still alive after the fight and we're not at the last enemy in the array
            if(playerInfo.health > 0 && i < enemyInfo.length-1){
                var storeConfirm = window.confirm("The fight is over. Enter the store before next round?");

                //if yes, take them to the store ()
                if(storeConfirm){
                    shop();
                }
            }
        }
        //if player is not alive, break out of the loop and let endGame function run
        else{
            window.alert(" You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //play again
    endGame ();
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

//go to shop between battle function
var shop = function(){
    console.log( "Entered the shop.");
    //ask the player what they'd like to do
    var shopOptionPrompt = window.prompt ("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter a number: \n 1. Refill \n 2. Upgrade \n 3. Leave");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    //Use switch to carry out action
    switch (shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;    
        default:
            window.alert("You did not pick a valid option. Try again.")
            //call shop again to force the player to pick a valid option
            shop();
            break;
    };
}

//function to set name
var getPlayerName = function(){
    var name = "";
    while (name === "" || name === null){
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};

/* END OF GAME FUNCTIONS */

/*GAME INFORMAITON / VARIBLES */

//Player's Information
var playerInfo= {
    name: getPlayerName(),
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
        if( this.money>=7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -=7;
        }else{
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function(){
        if(this.money>=7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack +=6;
            this.money -= 7;
        }else{
            window.alert("You don't have enough money!");
        }
    }
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

/* END OF GAME INFORMATION / VARIABLES */

//start the game when the webpage loads
startGame();

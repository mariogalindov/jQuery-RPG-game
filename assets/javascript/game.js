// 1. Display characters to select in designated area
// Here we create dinamically the card and display each of the characters available in the initial area. We need a function to create this cards
// 2. Select character and pass it to designated area, the same for the opponent and then the rest of the enemies to their designated area
// 
// 3. Select enemy to fight with and pass it to it's designated area
// 4. Attack, reduce opponent's health, increase character's attac power (multiply it by current turn) and receive counterattack
// reducind character's health
// 5. Every turn analyze character and opponent's health to see if it's still alive, if character's health reaches <=0 game over display restart button, 
// if opponent's health <= 0 next opponent message to choose next enemy
// 6. If there are no enemies left you win

// Execute when DOM has fully loaded
$(document).ready(function() {

    // Creating object for the characters
    var characters = {
        "Qui-Gon Jinn": {
            name: "Qui-Gon Jinn",
            health: 130,
            attack: 12,
            imageUrl: "assets/images/qui-gon jinn.jpg",
            counterAttack: 15
        },
        "Darth Sidious": {
            name: "Darth Sidious",
            health: 185,
            attack: 15,
            imageUrl: "assets/images/darth sidious.jpg",
            counterAttack: 25
        },
        "Yoda": {
            name: "Yoda", 
            health: 165,
            attack: 25,
            imageUrl: "assets/images/yoda.jpg",
            counterAttack: 20
        },
        "Darth Maul": {
            name: "Darth Maul",
            health: 140,
            attack: 15,
            imageUrl: "assets/images/Darth-Maul.jpeg",
            counterAttack: 12
        }
    };

    // Define all variables
    var selectedCharacter;
    var enemies = [];
    var opponent; 
    var turnCount = 1;
    var killCount = 0;

    // This function creates the character card, creating the div and appending all the info and then appending it to the designated area
    var displayCharacter = function(character, characterArea) {
        var characterCard = $("<div class='character-card' data-name='" + character.name + "'>");
        var cardName = $("<div class='character-name'>").text(character.name);
        var cardImg = $("<img class='character-image'>").attr("src", character.imageUrl);
        var characterHealth = $("<div class='character-health'>").text(character.health);
        characterCard.append(cardName, cardImg, characterHealth);
        $(characterArea).append(characterCard);
    };

    // This function places all characters in their designated area
    var gameStart = function() {
        for (var key in characters) {
            displayCharacter(characters[key], "#character-selection");
        }
    };

    gameStart();

    // This function will trigger the previous function to pass the character to the designated area, player or enemy.
    var updateCharacter = function(char, area) {
        $(area).empty();
        displayCharacter(char, area);
    };

    var placeEnemies = function(enemiesArray) {
        for (var i = 0; i < enemiesArray.length; i++) {
            displayCharacter(enemiesArray[i], "#enemies-here")
        }
    };

    // This function will display all the messages every turn. 
    var messages = function(messageToDisplay) {
        // $("#status").empty();
        var messageDiv = $("#status");
        var msgText = $("<div>").text(messageToDisplay);
        messageDiv.append(msgText);
        
    };

    var clearMessage = function() {
        messageDiv = $("#status");
        messageDiv.text("");
    };

    var restart = function(message) {

        // Create restart button that when clicked reloads the page
        var restartBtn = $("<button>Restart</<button>").click(function() {
            location.reload();
        });

        // Create div with status message
        var gameState = $("<div>").text(message);

        $("body").append(gameState);
        $("body").append(restartBtn);
    }


    // Click event to select player, place it in it's designated area and send the enemies to their area
    $("#character-selection").on("click", ".character-card", function() {

        // Retrieving the name of the player
        var player = $(this).attr("data-name");
        console.log(player);

        // If there's no player selected...
        if (!selectedCharacter) {
            // Assign the name of the character to the variable used for the selected character
            selectedCharacter = characters[player];

            // Push the available opponents to the enemies array
            for (var key in characters) {
                if (key != player) {
                    enemies.push(characters[key]);
                }
            };

            // Hide initial character selection area
            $("#characters-section").hide();
            
            // Move our player to it's designated area
            updateCharacter(selectedCharacter, "#character-here");

            // Move enemies to their area
            placeEnemies(enemies)

        }

        console.log(selectedCharacter);

    });

    // Click event to select the opponent
    $("#enemies-here").on("click",".character-card", function() {
        // Save opponent's name y variable
        var opponentName = $(this).attr("data-name");

        // there's no opponent in it's area... 
        if ($("#opponent-here").children().length === 0) {
            opponent = characters[opponentName];
            updateCharacter(opponent, "#opponent-here");

            $(this).remove();
        }

    })

    $("#attack-button").on("click", function() {

        // If there's an opponent in place
        if ($("#opponent-here").children().length !== 0) {

            console.log("Attack!")
            // Variable to store the attack power of each turn
            var currentAttackPwr = selectedCharacter.attack * turnCount;

            // Attack and counterAttack messages
            var attackMsg = "You attacked " + opponent.name + " for " + currentAttackPwr + " damage.";
            var counterAttack = opponent.name + "counter-attacked you for  " + opponent.counterAttack;
            clearMessage();

            // Health decrease for opponent
            opponent.health -= currentAttackPwr;

            if (opponent.health > 0) {
                // Display attack and counter messages
                messages(attackMsg);
                messages(counterAttack);

                // Health decrease for selected character
                selectedCharacter.health -= opponent.counterAttack;

                // Updates health for both characters
                updateCharacter(opponent, "#opponent-here");
                updateCharacter(selectedCharacter, "#character-here");

                if (selectedCharacter.health < 0) {
                    clearMessage();
                    restart("You have been defeated... Press Restart to play again");
                    $("#attack-button").off("click");
                } 
            } else {
                // Clear opponent card from section so another one can be selected
                $("#opponent-here").empty();

                // Define defeating message in variable and display it
                var defeatingMsg = "You have defeated " + opponent.name + " choose your next opponent";
                messages(defeatingMsg);

                // Increase kill count
                killCount++;

                console.log("Kill Count: " + killCount);
                console.log("Enemies length: " + enemies.length);

                if (killCount >= enemies.length) {
                    clearMessage();
                    $("#attack-button").off("click");
                    restart("Victory! Press Restart if you wish to play again.")
                }


            }

            // Increase turn count so it increases attack power
            turnCount++;

            console.log(selectedCharacter);

        } else {
            clearMessage();
            messages("Select an opponent")
        }


    });

});
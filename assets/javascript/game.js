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
            attack: 8,
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
    var turnsCount = 1;
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

    var gameStart = function() {
        for (var key in characters) {
            displayCharacter(characters[key], "#character-selection");
        }
    }

    gameStart();

    // This function will trigger the previous function to pass the character to the designated area, player or enemy.
    var moveCharacter = function(char, area) {
        $(area).empty();
        displayCharacter(char, area);
    };

    var placeEnemies = function(enemiesArray) {
        for (var i = 0; i < enemiesArray.length; i++) {
            displayCharacter(enemiesArray[i], "#enemies-here")
        }
    }



    $(".character-card").on("click", function() {

        // Retrieving the name of the player
        var player = $(this).attr("data-name");
        console.log(player);

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
            moveCharacter(selectedCharacter, "#character-here");

            // Move enemies to their area
            placeEnemies(enemies)

        }

        console.log(selectedCharacter);

    });






});
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Dog } from './dog';

/* eslint-disable no-unused-vars */

$(document).ready(function() {

    let dogBreedList;
    let dogUrl;
    let newDog;
    let updateInterval;

    $.ajax({
        url: `https://dog.ceo/api/breeds/list/all`,
        type: 'GET',
        data: {
            format: 'json'
            },
        success: function(response) {
            dogBreedList = response.message;
            for (var key in dogBreedList) {
                $("#dogBreed").append('<option>'+key+"</option>")
            }
        },
        error: function() {
            $('#errors').text("There was an error processing your request. Please try again.");
        }
    });

    $("#breedPick").submit(function(event){
        event.preventDefault();
        $("#breedPick").hide();
        $("#petNameForm").show(); 
        let breed = $("#dogBreed").val();
        $.ajax({
            url: `https://dog.ceo/api/breed/${breed}/images/random`,
            type: 'GET',
            data: {
                format: 'json'
                },
            success: function(response) {
                dogUrl = response.message;
                $("#dogPicture").attr("src", dogUrl);
             
            },
            error: function() {
                $('#errors').text("There was an error processing your request. Please try again.");
            },
        });
    })
    $("#petNameForm").submit(function(event){
        event.preventDefault();
        $("#petNameForm").hide();
        $("#letTheGameBegin").show();
        $("#yourPetName").text($("#petName").val());
        newDog = new Dog();
        newDog.startTheGame();
        newDog.deathChecker();
        updateInterval = setInterval(() => {
            $("#healthbar").attr("aria-valuenow", newDog.energy);
            $("#healthbar").attr("style", `width:${newDog.energy}%`);
            $("#hungerbar").attr("aria-valuenow", newDog.hunger);
            $("#hungerbar").attr("style", `width:${newDog.hunger}%`);
            $("#thirstbar").attr("aria-valuenow", newDog.thirst);
            $("#thirstbar").attr("style", `width:${newDog.thirst}%`);
            if(newDog.dead === true){
                
                $("#yourPetName").text($("#petName").val() + " is dead!!!");
            }
        }, 50);

     
    })

    $("#feedDog").click(function(){
        newDog.feed();
    })

    $("#giveDrink").click(function(){
        newDog.giveWater();
    })

    $("#restDog").click(function(){
        newDog.rest();
    })


});

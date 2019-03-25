$(document).ready(function () {
    $("#time-left").hide();
    $("#start").on("click", metodos.startgame);
    $("#choices").on("click", "input", metodos.checkguess);
})
var triviacontent = {
    questions: {
        Q1: "Which now retired NBA player starred in the 1996 movie Kazaam?",
        Q2: "What song does Jiminy Cricket famously sing during the opening credits of Pinocchio?",
        Q3: "Executives of William Randolph Hearst’s media empire conspired to stop the release of which 1941 film?",
        Q4: "In the sitcom Family Matters and film Die Hard, actor Reginald VelJohnson’s character had what occupation?",
        Q5: "What is the name of the character played by Johnny Depp in the Pirates of the Caribbean film series?",
        Q6: "Which 1997 action thriller film stars Nicolas Cage, John Cusack, and John Malkovich?",
        Q7: "Which song from the Disney film “Coco” won the 2018 Academy Award for Best Original Song?",
        Q8: "In the X-Men film franchise, Halle Berry played the role of which character?",
        Q9: "Who directed the romantic comedy fantasy adventure film The Princess Bride?",
        Q10: "How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?"
    },
    choices: {
        Q1: ["Michael Jordan", "Shaquille O’Neal", "Karl Malone", "Magic Johnson"],
        Q2: ["Come what May", "Inkle twinkle little star", "La cucaracha", "When You Wish Upon a Star"],
        Q3: ["Dumbo", "Meet Joe Doe", "Citizen Kane", "The Maltese Falcon"],
        Q4: ["Police officer", "Fire fighter", "Janitor", "Criminal"],
        Q5: ["Blackbeard", "Long John Silver", "Captain Jack Sparrow", "Hector Barbossa"],
        Q6: ["Being John Malkovich", "Con Air", "Die Hard", "Armaggedon"],
        Q7: ["Let it Go", "Circle of Life", "Mighty River", "Remember Me"],
        Q8: ["Storm", "Rogue", "Jean Grey", "Batgirl"],
        Q9: ["Steven Spielberg", "Harvey Weinstein", "Rob Reiner", "Guillermo del Toro"],
        Q10: ["Jim Cazaviel", "Jim Carrey", "Kevin Dillon", "Brad Pitt"],
    },
    answers: {
        Q1: "Shaquille O’Neal",
        Q2: "When You Wish Upon a Star",
        Q3: "Citizen Kane",
        Q4: "Police officer",
        Q5: "Captain Jack Sparrow",
        Q6: "Con Air",
        Q7: "Remember Me",
        Q8: "Storm",
        Q9: "Rob Reiner",
        Q10: "Jim Carrey"
    }
}
var correctcount = 0;
var incorrectcount = 0;
var unanswered = 0;
var currentSet = 0;
var time = 9;
var timeRunning = false;
var intervalId = '';
var metodos = {
    startgame: function () {
        currentSet = 0;
        correctcount = 0;
        incorrectcount = 0;
        unanswered = 0;
        clearInterval(intervalId);
        $("#game").show();
        $("#results").html('');
        $("#time").text(time);
        $("#start").hide();
        $("#time-left").show();
        metodos.question();
    },
    question: function () {
        $("#choices").empty();
        $("#results").empty();
        time = 3;
        $("#time").text(time);
        if (!timeRunning) {
            intervalId = setInterval(metodos.starttime, 1000);
        }
        var questionContent = Object.values(triviacontent.questions)[currentSet];
        $("#question").text(questionContent);
        var questionOptions = Object.values(triviacontent.choices)[currentSet];
        $.each(questionOptions, function (index, key) {
            $("#choices").append("<input type='radio'><span>" + key + " </span><br>");
            // name='nombre' value='triviacontent.answers[currentSet]'><span>
        })
    },
    starttime: function () {
        if (time > -1 && currentSet < Object.keys(triviacontent.questions).length) {
            $("#time").text(time);
            time--;
        }
        else if (time === -1) {
            unanswered++;
            // triviacontent.result = false;
            clearInterval(intervalId);
            resultId = setTimeout(metodos.results, 1000);
            $("#results").html("<h4>Ran out of time! The answer is " + Object.values(triviacontent.answers)[currentSet] + "</h4>");
        }
        else if (currentSet === Object.keys(triviacontent.questions).length) {
            $("#results")
                .html("<h2>All Done!</h2>" +
                    "<p><strong>Correct Answers</strong>: " + correctcount + "</p>" +
                    "<p><strong>Incorrect Answers</strong>: " + incorrectcount + "</p>" +
                    "<p><strong>Unanswered</strong>: " + unanswered + "</p>");
            $("#game").hide();
            $("#start").hide();
        }
    },
    checkguess: function () {
        var resultId;
        var currentAnswer = Object.values(triviacontent.answers)[currentSet];
        var userAnswer = $("input[type='radio']:checked").val();
        console.log(userAnswer);
        if ($("input[type='radio']:checked").val() === currentAnswer) {
            correctcount++;
            clearInterval(intervalId);
            resultId = setTimeout(metodos.results, 1000);
            $("#results").html("<h4>Great Job!</h4>");
        }
        else {
            incorrectcount++;
            clearInterval(intervalId);
            resultId = setTimeout(metodos.results, 1000);
            $("#results").html("<h4>Wrong guess! The right answer is: " + currentAnswer + "</h4>");
        }
    },
    results: function () {
        currentSet++;
        $("#results h3").remove();
        metodos.question();
    }
}
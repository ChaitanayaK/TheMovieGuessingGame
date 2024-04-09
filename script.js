const allAlphabet = [
    "a",
    "e",
    "i",
    "o",
    "u",
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
];

var rowData = null,
    guessesLeft = Infinity,
    guessed = null;

function changeName(name) {
    var alphabet = allAlphabet;
    for (let i = 0; i < guessed.length; i++) {
        var index = alphabet.indexOf(guessed[i]);
        if (index !== -1) {
            alphabet.splice(index, 1);
        }
    }
    var temp = "",
        lowerName = String(name).toLowerCase();
    var name = name;

    for (let i = 0; i < name.length; i++) {
        if (alphabet.includes(lowerName[i])) {
            temp += "_" + "&nbsp;&nbsp;";
        } else {
            temp += name[i] + "&nbsp;";
        }
    }
    return [name, temp];
}

function getRandomRow() {
    var csvFilePath = null;

    var headingTitle = document.getElementById("bollywood_txt_id");
    if (headingTitle.innerText == "B O L L Y W O O D") {
        csvFilePath = "BollywoodMovieDetail.csv";
    } else if (headingTitle.innerText == "H O L L Y W O O D") {
        csvFilePath = "IMDB-Movie-Data.csv";
    }

    document.getElementById("game_div_id").style.display = "flex";
    document.getElementById("startBollywoodBtnId").style.display = "none";
    document.getElementById("result_div_id").style.display = "none";
    var hintBtn = document.getElementById("hint_btn_id");
    var hintTxt = document.getElementById("hint_txt_id");
    hintBtn.style.display = "flex";
    hintTxt.style.display = "none";

    fetch(csvFilePath)
        .then((response) => response.text())
        .then((data) => {
            var rows = data.split("\n");
            var headerRow = rows.shift();
            console.log(headerRow);

            var randomRowIndex = Math.floor(Math.random() * rows.length);

            rowData = rows[randomRowIndex].replaceAll('"', "").split(",");

            // Initialise number of guesses
            guessesLeft = 9;
            document.getElementById("guess_chances_id").innerHTML = guessesLeft;
            guessed = ["a", "e", "i", "o", "u"];

            var name = changeName(rowData[1])[1];

            document.getElementById("bollywood_game_txt_id").innerHTML = name;
        })
        .catch((error) => {
            console.error("Error fetching CSV file:", error);
        });
}

function guess() {
    var inputTxt = document.getElementById("input_id");
    var val = inputTxt.value,
        win = false;
    inputTxt.value = null;
    console.log(val);

    if (rowData[1].toLowerCase().includes(val.toLowerCase())) {
        val = val.toLowerCase();
        for (let i = 0; i < val.length; i++) {
            if (guessed.includes(val[i])) {
                continue;
            } else {
                guessesLeft -= 1;
                document.getElementById("guess_chances_id").innerHTML =
                    guessesLeft;
                guessed.push(val[i]);
            }
        }
        var data = changeName(rowData[1]);
        var name = data[1],
            temp = data[0];
        document.getElementById("bollywood_game_txt_id").innerHTML = name;
        if (!name.includes("_")) {
            win = true;
            // confirm("You Won");
            document.getElementById("result_div_id").style.display = "flex";
            document.getElementById("game_div_id").style.display = "none";
            document.getElementById("result_image_id").src =
                "win_logo.png";
            console.log("you won");
        } else {
            console.log("True");
        }
    } else {
        guessesLeft -= 1;
        document.getElementById("guess_chances_id").innerHTML = guessesLeft;
        console.log("False");
    }

    if (!win && guessesLeft <= 0) {
        document.getElementById("result_div_id").style.display = "flex";
        document.getElementById("game_div_id").style.display = "none";
        document.getElementById("result_image_id").src = "lost_logo.png";
        // confirm("You Lost the Game!!!");
    }
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        guess();
    }
}

function showHint() {
    var hintBtn = document.getElementById("hint_btn_id");
    var hintTxt = document.getElementById("hint_txt_id");
    hintBtn.style.display = "none";
    hintTxt.style.display = "flex";

    var headingTitle = document.getElementById("bollywood_txt_id");
    if (headingTitle.innerText == "B O L L Y W O O D") {
        var hintContent =
            "<div style='text-align: center; margin-top: 50px'>" +
            "<b>Release year: </b>" +
            rowData[2] +
            "<br><b>Genre(s): </b>" +
            rowData[4] +
            "<br><b>Actor(s): </b>" +
            rowData[6] +
            "<br><b>Director(s): </b>" +
            rowData[7] +
            "</div>";
    } else if (headingTitle.innerText == "H O L L Y W O O D") {
        var hintContent =
            "<div style='text-align: center; margin-top: 50px'>" +
            "<b>Release year: </b>" +
            rowData[5] +
            "<br><b>Genre(s): </b>" +
            rowData[2] +
            "<br><b>Actor(s): </b>" +
            rowData[4] +
            "<br><b>Director(s): </b>" +
            rowData[3] +
            "</div>";
    }

    hintTxt.innerHTML = hintContent;
}

function reloadPage() {
    getRandomRow();
}

function goBack() {
    var newPageUrl = "/index.html";
    window.location.href = newPageUrl;
}

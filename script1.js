let box = document.querySelectorAll(" .box");
let resate = document.querySelector("#resate");
let turn = true; // True = Player (O), False = Computer (X)
let isGameOver = false;

let winingparten = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

// Player Click Event
for (const ele of box) {
    ele.addEventListener("click", () => {
        if (turn && ele.innerText === "" && !isGameOver) {
            makeMove(ele, "O");
            turn = false; // Switch to Computer
            
            if (!isGameOver) {
                setTimeout(computerMove, 500); // Computer moves after 0.5s
            }
        }
    });
}

// Function to handle the actual move
const makeMove = (element, icon) => {
    if (icon === "O") {
        element.style.color = "white"; 
    } else {
        element.style.color = "black";
    }
    element.innerText = icon;
    element.disabled = true;
    checkwiner();
};

// Computer Intelligence (Random Logic)
const computerMove = () => {
    if (isGameOver) return;

    // 1. Find all empty boxes
    let emptyBoxes = Array.from(box).filter(b => b.innerText === "");

    if (emptyBoxes.length > 0) {
        // 2. Pick a random one
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        makeMove(randomBox, "X");
        turn = true; // Switch back to Player
    }
};

const checkwiner = () => {
    for (const i of winingparten) {
        let pos1 = box[i[0]].innerText;
        let pos2 = box[i[1]].innerText;
        let pos3 = box[i[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner: ", pos1);
                highlightWinner(i); 
                disableAllBoxes();
                isGameOver = true;
                return;
            }
        }
    }
    
    // Check for Draw
    let allFilled = Array.from(box).every(b => b.innerText !== "");
    if (allFilled && !isGameOver) {
        console.log("It's a Draw!");
        isGameOver = true;
    }
};

const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        box[index].style.textDecoration = "line-through";
        box[index].style.textDecorationColor = "red";
        box[index].style.textDecorationThickness = "5px";
        box[index].style.border = "4px solid white";
    });
};

const disableAllBoxes = () => {
    for (let b of box) b.disabled = true;
};

// Reset Button
resate.addEventListener("click", () => {
    turn = true;
    isGameOver = false;
    for (let b of box) {
        b.innerText = "";
        b.disabled = false;
        b.style.textDecoration = "none";
        b.style.border = "none";
    }
});
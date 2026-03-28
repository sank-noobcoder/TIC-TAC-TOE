let box=document.querySelectorAll(".game .box")
console.log(box)
let resate=document.querySelector("#resate")
let turn=true
let winingparten=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
for(const ele of box) {
    console.log(ele)
    ele.addEventListener("click",()=>{
        console.log("clicked")
        if(turn){
            ele.innerText="O"
            turn=false
        }
        else{
            ele.innerText="X"
            turn=true
        }
        ele.disable=true
        checkwiner()
    })
}
const checkwiner=()=>{
    for (const i of winingparten) {
        let pos1=box[i[0]].innerText
        let pos2=box[i[1]].innerText
        let pos3=box[i[2]].innerText
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                console.log("Winner: ", pos1);
                highlightWinner(i); // Helper function to show the win
                disableAllBoxes();
            }
        }
    }
}
const disableAllBoxes = () => {
    for (let b of box) b.disabled = true;
};

// 5. Helper to visually show the win
const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        box[index].style.textDecoration = "line-through";
        box[index].style.textDecorationColor = "red";
        box[index].style.textDecorationThickness = "5px";
        
        // Alternative: Add a bright border to show the path
        box[index].style.border = "4px solid white";
    });
};
const resetGame = () => {
    turn = true;
    for (let b of box) {
        b.innerText = "";
        b.disabled = false;
        // Remove the winner styles
        b.style.textDecoration = "none";
        b.style.border = "none";
        b.style.backgroundColor = "aqua"; // Restore original color
    }
    console.log("Game Reset");
};

// Add listener to your reset button
resate.addEventListener("click", resetGame);
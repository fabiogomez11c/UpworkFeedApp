import { CandidateList } from "./upwork"
import './checkboxes'

const testList = new CandidateList();
testList.fetchJobs();

let refreshInterval = setInterval(() => {
    console.log("Refresh");
    testList.fetchJobs();
}, 1000*60*10);

// objects
class volumeController {
    constructor(){
        this.active = true; 
    }
}

// listeners
const refreshBtn   = document.querySelector(".control__btn--refresh");
const volumeBtn    = document.querySelector(".control__btn--volume");
const containInput = document.querySelector(".filter__input");
const containDiv   = document.querySelector(".filter__filters--box");

const volumeCont   = new volumeController();
const keywordsE    = {};

let counter      = 0;

refreshBtn.addEventListener('click', (event) => {
    clearInterval(refreshInterval);
    // console.log("Btn Refresh");
    testList.fetchJobs();
    // console.log("Refresh");
    refreshInterval = setInterval(() => {
        testList.fetchJobs();
    }, 1000*60*10);
});

volumeBtn.addEventListener('click', (event) => {
    if (!volumeCont.active){
        volumeBtn.src = "./assets/volumefull.svg";
    } else {
        volumeBtn.src = "./assets/volumemute.svg";
    }
    volumeCont.active = !volumeCont.active;
});

containInput.addEventListener('keyup', (event) => {
    if (event.code === "Enter" & event.target.value.length > 0){
        testList.keywords.push(event.target.value);
        testList.fetchJobs();

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = `
        <div class="filter__label">
            <p class="text-fields--contain">${event.target.value}</p>
            <img class="filter__x x__${counter}" src="./assets/xcircle.svg">
        </div>
        `
        containDiv.append(tempDiv.firstElementChild)
        keywordsE[counter] = document.querySelector(
            `.x__${counter}`
        );
        keywordsE[counter].addEventListener('click', (event) => {
            const tempElmnt = event.target.parentElement;

            containDiv.removeChild(tempElmnt);

            testList.keywords.pop(
                tempElmnt.firstElementChild.innerText
            );

            testList.fetchJobs();

        });
        
        counter++

        event.target.value = '';
    }
});
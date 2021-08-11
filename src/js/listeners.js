import { CandidateList } from "./upwork"

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


export class FilterList {

    constructor(){
        this.urlOptions = {
            fixed  : "",
            hourly : "",
            any    : "",
        }

        this.options = {
            fixed: {
                activated: false,
                html:      document.querySelector("#ray1"),
                id:        "1",
            },
            hourly: {
                activated: false,
                html:      document.querySelector("#ray2"),
                id:        "2",
            },
            anyContract: {
                activated: true,
                html:      document.querySelector("#ray3"),
                id:        "3",
            },
            expert: {
                activated: false,
                html:      document.querySelector("#ray4"),
                id:        "4",
            },
            intermediate: {
                activated: false,
                html:      document.querySelector("#ray5"),
                id:        "5",
            },
            entry: {
                activated: false,
                html:      document.querySelector("#ray6"),
                id:        "6",
            },
            anyExperience: {
                activated: false,
                html:      document.querySelector("#ray7"),
                id:        "7",
            },
        };

        for (let i in this.options){
            this.options[i].html.addEventListener('click', (event) => {
                for (let j in this.options){
                    if (event.target.id.includes(this.options[j].id)){
                        this.options[j].activated = true;
                        this.options[j].html.src = "../assets/raycheck.svg";

                        testList.changeUrl(j);
                        testList.fetchJobs();
                    } else {
                        this.options[j].activated = false;
                        this.options[j].html.src = "../assets/raynocheck.svg";
                    }
                }
            })
        }
    }
}

const FilterObject = new FilterList();
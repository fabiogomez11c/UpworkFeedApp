import { CandidateList } from "./upwork"

const testList = new CandidateList();
testList.fetchJobs();

let refreshInterval = setInterval(() => {
    console.log("Refresh")
    testList.fetchJobs()
}, 1000*60*10);

// objects
class volumeController {
    constructor(){
        this.active = true; 
    }
}

// listeners
const refreshBtn = document.querySelector(".control__btn--refresh");
const volumeBtn  = document.querySelector(".control__btn--volume")
const volumeCont = new volumeController()

refreshBtn.addEventListener('click', (event) => {
    clearInterval(refreshInterval);
    console.log("Btn Refresh")
    refreshInterval = setInterval(() => {
        console.log("Refresh")
        testList.fetchJobs()
    }, 1000*60*10);
});

volumeBtn.addEventListener('click', (event) => {
    if (!volumeCont.active){
        volumeBtn.src = "./assets/volumefull.svg"
    } else {
        volumeBtn.src = "./assets/volumemute.svg"
    }
    volumeCont.active = !volumeCont.active
});


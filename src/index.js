import "./styles/style.scss"
import { CandidateList } from "./js/upwork"
import "./js/vanilla-tilt"

VanillaTilt.init(document.querySelectorAll(".card"), {
    glare: true
})

const testList = new CandidateList();
testList.fetchJobs()

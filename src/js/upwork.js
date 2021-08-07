
// const urlUpwork = "https://cors-anywhere.herokuapp.com/https://www.upwork.com/ab/feed/topics/rss?securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425&topic=5306974"

// const parser = new DOMParser();
// let res;

// fetch(urlUpwork).then(response => response.text())
//     .then(str => new DOMParser().parseFromString(str, "text/xml"))
//     .then(data => {
//         res = data.querySelector("item")
//         console.log(res)
//         console.log(parser.parseFromString(res.querySelector("description").textContent, 'text/html'))
//     })

class CandidateList {

    constructor () {
        this.list    = {
            rank1: null,
            rank2: null,
            rank3: null,
            rank4: null,
            rank5: null,
            rank6: null
        };

        this.jobList   = [];
        this.upworkUrl = null;
    }

    fetchJobs (){
        /*
        method to fetch all the jobs from the feed
        */
    }

    sortJobs (){
        /*
        method to sort all the jobs according to the parameters
        */
        this.jobList = []
    }

    compareCreateReplace(){
        /*
        compare the sorted jobs with the existing list, replace if needed,
        create if needed
        */
    }

    doHTML(){
        /*
        reorder if needed the cards into the document
        */
    }

    getContain (){
        /*
        get the filters in the contain
        */
        this.keywords = []
    }

    changeContractType(){
        /*
        get the filters in the contract type
        */
        this.upworkUrl = null
    }

    changeExperience (){
        /*
        get the filters in the experience
        */
        this.upworkUrl = null
    }
}

class Candidate {

    constructor(title, description, link){
        this.title = title;
        this.link  = link;

        this.cleanDescription(description);
    }

    cleanDescription (description){
        this.description = null;
    }

    computeKeywords(keywords){
        this.keywordsCount = {};
        this.totalScore    = 0;
    }

    createHTML (){
        this.html = null
    }
}


// const urlUpwork = "https://cors-anywhere.herokuapp.com/https://www.upwork.com/jobs/PERN-Stack-App_~015db5456a0df705f7?source=rss";

// const parser = new DOMParser();
// let res;
// let ress;

// fetch(urlUpwork).then(response => response.text())
//     .then(str => new DOMParser().parseFromString(str, "text/html"))
//     .then(data => {
//         console.log(data)
//         // res = data.querySelector("item")
//         // // console.log(res)
//         // ress = parser.parseFromString(res.querySelector("description").textContent, 'text/html')
//         // console.log(
//         //     ress.querySelector("body").textContent
//         // )
//     })

export class CandidateList {

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
        this.topJobs   = []
        // this.upworkUrl = "https://cors-anywhere.herokuapp.com/https://www.upwork.com/ab/feed/topics/rss?securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425&topic=5306974"
        this.upworkUrl = "https://www.upwork.com/ab/feed/topics/rss?securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425&topic=5306974"

        this.keywords = ["javascript", "html"]
    }

    fetchJobs (){
        /*
        method to fetch all the jobs from the feed
        */
        
        const parser = new DOMParser();

        fetch(this.upworkUrl)
            .then(response => response.text())
            .then(str => parser.parseFromString(str, "text/xml"))
            .then(elemnts => elemnts.querySelectorAll("item"))
            .then(arr => {
                arr.forEach(itm => {
                    const tempArr = {
                        title    : "",
                        price    : "",
                        postedOn : "",
                        link     : "",
                        content  : "",
                    };

                    // console.log(itm)
                    tempArr.title   = itm.querySelector("title").textContent;
                    tempArr.link    = itm.querySelector("guid").textContent;

                    tempArr.content = parser.parseFromString(
                        itm.querySelector("description").textContent, 'text/html'
                    ).querySelector("body").innerHTML

                    const tempContent = tempArr.content.split("<br>")

                    for (let i of tempContent){
                        if (i.includes("<b>Budget</b>") | i.includes("<b>Hourly Range</b>")){
                            tempArr.price = i.replace("\n", "");
                        } else if(i.includes("<b>Posted On</b>")) {
                            tempArr.postedOn = i.replace("\n", "");
                        }
                    }

                    const preCandidate = new Candidate(
                        tempArr.title,
                        tempArr.price,
                        tempArr.postedOn,
                        tempArr.link,
                        tempArr.content
                    )
                    preCandidate.computeKeywords(this.keywords)

                    this.jobList.push(preCandidate);
                })
                // console.log(listItems)
            }).finally(() => {
                // console.log(this.jobList)
                this.sortJobs()
            })
    }

    sortJobs (){
        /*
        method to sort all the jobs according to the parameters
        */

        this.jobList.sort((a, b) => b.totalScore - a.totalScore)
        this.topJobs = this.jobList.slice(0, 6)
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

    constructor(title, price, postedOn, link, content){
        this.title    = title;
        this.price    = price
        this.postedOn = postedOn
        this.link     = link;
        this.content  = content

    }

    computeKeywords(keywords){
        this.keywordsCount = new Object();
        this.totalScore    = 0;

        // console.log(this.content)
        for (let i of keywords){
            const regExpTemp = new RegExp(i, "g");
            this.keywordsCount[i] = (this.content.toLowerCase().
                match(regExpTemp) || []).length;
            this.totalScore = this.totalScore + this.keywordsCount[i]
        }

    }

    createHTML (){
        this.html = null
    }
}

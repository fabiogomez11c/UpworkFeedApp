
export class CandidateList {

    constructor () {
        // this.upworkUrl = "https://cors-anywhere.herokuapp.com/https://www.upwork.com/ab/feed/topics/rss?securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425&topic=5306974"
        this.jobList   = [];
        this.topJobs   = [];
        this.jobTitles = [];
        this.upworkUrl = "https://www.upwork.com/ab/feed/topics/rss?securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425&topic=5306974";
        // this.keywords  = ["javascript", "html"];
        this.keywords  = [];
        this.isActive  = false;
        this.withSound = true
    }

    fetchJobs (){
        /*
        method to fetch all the jobs from the feed
        */

        this.jobList = [];
        this.topJobs = [];
        
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
                    ).querySelector("body").innerHTML;

                    const tempContent = tempArr.content.split("<br>");

                    for (let i of tempContent){
                        if (i.includes("<b>Budget</b>") | i.includes("<b>Hourly Range</b>")){
                            tempArr.price = i.replace("\n", "");
                        } else if(i.includes("<b>Posted On</b>")) {
                            tempArr.postedOn = i.replace("\n", "");
                        }
                    };

                    const preCandidate = new Candidate(
                        tempArr.title,
                        tempArr.price,
                        tempArr.postedOn,
                        tempArr.link,
                        tempArr.content
                    );
                    preCandidate.computeKeywords(this.keywords);

                    this.jobList.push(preCandidate);
                })
                // console.log(listItems)
            }).finally(() => {
                // console.log(this.jobList)
                this.sortJobs();
            })
    }

    sortJobs (){
        /*
        method to sort all the jobs according to the parameters
        */

        let newEntry = false

        // this.jobList.sort((a, b) => b.totalScore - a.totalScore);
        this.topJobs = this.jobList.slice(0, 6);

        for (let i of this.topJobs){
            if (!this.jobTitles.includes(i.title)){
                newEntry = true;
                // console.log("New entry")
            }
        };

        this.doHTML();
        
        if (newEntry){
            let audio = new Audio('./assets/ring.mp3')
            audio.play()
            this.jobTitles = []
            for (let i of this.topJobs){
                this.jobTitles.push(i.title)
            }
            // console.log(this.jobTitles)
        }
    }

    doHTML(){
        /*
        reorder if needed the cards into the document
        */

        const cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++){
            if (this.isActive){
                cards[i].removeChild(cards[i].lastElementChild);
            } 
            cards[i].append(
                this.topJobs[i].html.firstElementChild
            );
        };

        if (!this.isActive & this.withSound){
            this.isActive = true;
        }

    }

    getContain (){
        /*
        get the filters in the contain
        */
        this.keywords = [];
    }

    changeUrl(newUrl){
        /*
        get the filters in the contract type
        */

        switch (newUrl){
            case "fixed":
                this.upworkUrl = "https://www.upwork.com/ab/feed/jobs/rss?q=javascript+html+css&sort=recency&job_type=fixed&paging=0%3B50&api_params=1&securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425";
                break;
            case "hourly":
                this.upworkUrl = "https://www.upwork.com/ab/feed/jobs/rss?q=javascript+html+css&sort=recency&job_type=hourly&paging=0%3B50&api_params=1&securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425";
                break;
            case "expert":
                this.upworkUrl = "https://www.upwork.com/ab/feed/jobs/rss?contractor_tier=3&q=javascript+html+css&sort=recency&paging=0%3B50&api_params=1&securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425";
                break;
            case "intermediate":
                this.upworkUrl = "https://www.upwork.com/ab/feed/jobs/rss?contractor_tier=2&q=javascript+html+css&sort=recency&paging=0%3B50&api_params=1&securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425";
                break;
            case "entry":
                this.upworkUrl = "https://www.upwork.com/ab/feed/jobs/rss?contractor_tier=1&q=javascript+html+css&sort=recency&paging=0%3B50&api_params=1&securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425";
                break;
            default:
                this.upworkUrl = "https://www.upwork.com/ab/feed/topics/rss?securityToken=2d23f08bbd9a7ab37af8f9a3fd88f662218772c7473006ba84fc5340c4f4f8afc40b3d5b5a85561958a4f51866316e22126fd7a65a1e5a3bd2a7eed1e7431675&userUid=1099141625217413120&orgUid=1099141625221607425&topic=5306974";
        }
    }
}

class Candidate {

    constructor(title, price, postedOn, link, content){
        this.title    = title;
        this.price    = price;
        this.postedOn = postedOn;
        this.link     = link;
        this.content  = content;
    }

    computeKeywords(keywords){
        this.keywordsCount = new Object();
        this.totalScore    = 0;

        // console.log(this.content)
        for (let i of keywords){
            const regExpTemp = new RegExp(i, "g");
            this.keywordsCount[i] = (this.content.toLowerCase().
                match(regExpTemp) || []).length;
            this.totalScore = this.totalScore + this.keywordsCount[i];
        }

        this.createHTML();
    }

    createHTML (){

        let spanHTML = "";
        for (let i in this.keywordsCount){
            if (this.keywordsCount[i] > 0){
                const tempSpan = `
                <span class="keyword__text"><p>${i}</p></span>
                `
                spanHTML = spanHTML + tempSpan;
            }
        }

        const innerHtml = `
        <div class="card__card">
            <h4 class="card__title">${this.title.replace(" - Upwork", "")}</h4>
            <p class="card__text card__text--price">${this.price.replace(" Range", "")}</p>
            <div class="card__keyword keyword">${spanHTML}</div>
            <span class="card__button"><a href="${this.link}">Read more</a></span>
            <p class="card__text card__text--date">${this.postedOn}</p>
        </div>
        `;

        this.html = document.createElement('div');
        this.html.innerHTML = innerHtml;
    }
}


class ContractList {

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
            any: {
                activated: true,
                html:      document.querySelector("#ray3"),
                id:        "3",
            },
        };

        for (let i of this.options){
            i.html.addEventListener('click', (event) => {
                if (!i.activated){
                    i.html.src = "../assets/raycheck.svg"
                }
            })
        }
    }

}
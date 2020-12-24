
function fetchReposFromGithub() {
    const httpRequest = new XMLHttpRequest();
    const profileURL = "https://api.github.com/users/cfex/repos";

    httpRequest.open("GET", profileURL, true);
    httpRequest.onload = function () {
        const data = JSON.parse(this.response);
        let currentDate = new Date();

        let arr = data.sort((a, b) => a.pushed_at > b.pushed_at ? -1 : 1);
        console.log(arr);
        let repos = document.getElementById("carouselInner");

        for (let i = 0; i < arr.length; i++) {

            let latestRepoPush = new Date(arr[i].pushed_at);
            let lastTimePushed = calculateDateDifference(currentDate, latestRepoPush);
            let description = arr[i].description;

            if (description == null) {
                description = "No description";
            }

            let item = document.createElement("div");
            item.classList.add("carousel-item");

            item.innerHTML = (`
                    <div class="card">
                        <div class="card-body repo-card">
                            <a href='${arr[i].html_url}' target=_blank>${arr[i].name}</a>                           
                            <p class="card-text">${description}</p>
                            <small class='updated'>Updated: ${lastTimePushed} days ago </small>
                        </div>
                    </div>
                `);
            repos.appendChild(item);
        }

        repos.firstElementChild.classList.add('active');
    }

    httpRequest.send();

}


function calculateDateDifference(current, past) {
    return Math.ceil(Math.abs(current - past) / (1000 * 60 * 60 * 24));
}
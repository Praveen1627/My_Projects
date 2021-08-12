let searchResults = document.getElementById('searchResults');
let searchInput = document.getElementById('searchInput');
let spinner = document.getElementById('spinner');
let url = "https://apis.ccbp.in/wiki-search?search=";

function createAndAppend(dataobj) {
    console.log("ina")
    console.log(dataobj);
    let div = document.createElement('div');
    div.classList.add("result-item");

    let a1 = document.createElement('a');
    a1.href = dataobj.link;
    a1.classList.add("result-title");
    a1.setAttribute("target", "_blank");
    a1.textContent = dataobj.title;
    div.appendChild(a1);

    let br = document.createElement('br');
    div.appendChild(br);


    let a2 = document.createElement('a');
    a2.href = dataobj.link;
    a2.classList.add("result-url");
    a2.setAttribute("target", "_blank");
    a2.textContent = dataobj.link;
    div.appendChild(a2);

    let br1 = document.createElement('br');
    div.appendChild(br1);


    let descriptionEl = document.createElement("span");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = dataobj.description;
    div.appendChild(descriptionEl);

    let br2 = document.createElement('br');
    div.appendChild(br2);
    div.appendChild(br2);

    searchResults.appendChild(div);


}




function display(data) {
    spinner.classList.toggle("d-none");
    for (let item of data) {

        createAndAppend(item);
    }
}


function searchWiki(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchResults.textContent = "";
        let searchInputValue = searchInput.value;
        console.log(searchInput.value);
        let apiUrl = url + searchInputValue;

        let options = {
            method: "GET"

        };
        fetch(apiUrl, options)
            .then(function(response) {
                return response.json();
            })
            .then(
                function(output) {
                    let {
                        search_results
                    } = output;
                    console.log(search_results)
                    display(search_results);
                }
            )
    }

}





searchInput.addEventListener("keydown", searchWiki);
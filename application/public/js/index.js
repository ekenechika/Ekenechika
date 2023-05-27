var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
number=0;




function fadeOut(ev){
    var number = document.querySelectorAll('.product-card').length - 1;
    var ele = ev.currentTarget;
    var num = document.getElementById('display');
    let timer = setInterval(function () {
        if (!ele.style.opacity) {
            ele.style.opacity = 1;
        }
        if (ele.style.opacity > 0) {
            ele.style.opacity -= 0.1;

        }
        else
            clearInterval(timer);
            ele.remove();
            console.log(number);

    },    200);
    num.innerHTML = number;
}


function buildCard(data) {
    number++;
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute('class', 'product-card');

    var imgTag = document.createElement('img');
    imgTag.setAttribute('class', "product-img")
    imgTag.setAttribute("src", data.thumbnailUrl)

    var titleTag = document.createElement('p');
    titleTag.setAttribute('class', 'product-title')
    titleTag.appendChild(document.createTextNode(data.title));

    var costTag = document.createElement('p');
    costTag.setAttribute('class', 'product-title')
    costTag.appendChild(document.createTextNode(data.url));

    var productDiv = document.createElement("div");
    cardDiv.setAttribute('class', 'product-card');

    productDiv.appendChild(titleTag);
    productDiv.appendChild(costTag);
    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(productDiv);
    cardDiv.addEventListener("click", fadeOut);
    return cardDiv;


}
async function fetchWithDOMAPI() {
    try {
        var response = await fetch(url);
        var data = await response.json();
        var elements = data.map(buildCard);
        document.getElementById('product-list').append(...elements);
        var number = document.querySelectorAll('.product-card').length;
        var num = document.getElementById('display');
        num.innerHTML = number;
        number.innerHTML = num;

    } catch (error) {
    console.log(error)
    }
}
fetchWithDOMAPI();

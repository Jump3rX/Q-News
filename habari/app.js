"use strict";
const newsBtn = document.querySelector("#get-news");
const cardContainer = document.querySelector(".row");
const newsCategory = document.querySelector(".form-select");

let html;

// let yr = time.getFullYear();
// let currDate = time.getDate();
// let month = time.getMonth();
// dateEl.innerHTML = `${currDate}/${month + 1}/${yr}`;

const getNews = function (category = "top") {
  fetch(
    `https://newsdata.io/api/1/news?YOUR_API_KEY_HERE&country=ke&category=${category}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      showNews(data.results);
    })
    .catch((err) => {
      alert(`Oops! ${err.message} occured. Try again!`);
    });
};
window.addEventListener("load", function () {
  getNews();
});
newsCategory.addEventListener("change", function () {
  let newVal = newsCategory.options[newsCategory.selectedIndex].value;
  getNews(`${newVal}`);
});

const showNews = (data) => {
  cardContainer.innerHTML = "";
  if (data.length > 0) {
    data.forEach(function (news) {
      html = `
          <div class="col">
            <div class="card text-dark bg-light h-100 d-inline-block overflow-auto" style="width: 20rem;">
              <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
                  <p class="card-text">${news.description}</p
                  <p class="card-text"><small class="text-muted">Updated: ${news.pubDate}</small></p>
                  <p class="card-text"><small class="text-muted">Source: ${news.source_id}</small></p>
                  <a href="${news.link}" target="_blank">Read more...</a>
              </div>
            </div>
          </div>
        `;
      cardContainer.insertAdjacentHTML("afterbegin", html);
    });
  } else {
    html = `<h5> Sorry!No news in this category.Select another.<h5>`;
    cardContainer.insertAdjacentHTML("afterbegin", html);
  }
};

setInterval(showTime, 1000);
function showTime() {
  //let time = new Date();
  let clockEl = document.querySelector(".clock");
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = " am";

  if (hour > 12) {
    hour -= 12;
    am_pm = " pm";
  }
  if (hour == 0) {
    hr = 12;
    am_pm = " am";
  }

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = hour + ":" + min + ":" + sec + am_pm;

  clockEl.innerHTML = currentTime;
}
showTime();

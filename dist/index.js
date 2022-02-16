"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Global Variables
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=41.523135&lon=1.9439056&appid=79249a6da5a4a52e43bdc6a5bce6de66';
const iconWeather = 'https://openweathermap.org/img/wn/';
const today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = today.getMonth();
const day = today.getDate();
const jokesAPI = ["https://icanhazdadjoke.com/", "https://api.chucknorris.io/jokes/random"];
const votingemojis = ["💩", "😅", "🤣"];
let reportJokes = [];
let random;
const giphyAPI = 'https://api.giphy.com/v1/gifs/random?api_key=qYDVGBA5krjcnKV9mh4mX0kbnXU1LRH0&tag=laugh&rating=g';
// API Calls
function askWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(weatherAPI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });
        const result = yield response.json();
        printWeather(result.weather);
    });
}
function askGif() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(giphyAPI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });
        const result = yield response.json();
        printGif(result.data.images.fixed_width.url);
    });
}
function askJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        random = Math.floor(Math.random() * jokesAPI.length);
        console.log(`joke from:${jokesAPI[random]}`);
        const response = yield fetch(jokesAPI[random], {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });
        const result = yield response.json();
        let jest;
        if (random === 0) {
            jest = new Joke(result.joke, result.id);
        }
        else if (random === 1) {
            jest = new Joke(result.value, result.id);
        }
        jest.printJoke();
        askGif();
    });
}
function printWeather(weather) {
    console.log(weather);
    let whatweather = weather[0].main;
    let whaticon = `${weather[0].icon}@2x.png`;
    // create html tags
    let weathericon = document.getElementById('weathericon');
    let weathertitle = document.getElementById('weathertitle');
    let weatherdate = document.getElementById('weatherdate');
    let img = document.createElement('img');
    let datetext = monthNames[month].concat(" ", day.toString());
    img.src = iconWeather.concat(whaticon.toString());
    weathericon.append(img);
    weatherdate.append(datetext);
    weathertitle.append(whatweather);
}
function printGif(gif) {
    let htmlcontent = document.getElementById('gif');
    let imggif = document.createElement('img');
    htmlcontent.innerHTML = "";
    imggif.src = gif;
    htmlcontent.append(imggif);
}
class Joke {
    constructor(joke, id) {
        this.joke = joke;
        this.id = id;
    }
    printJoke() {
        let htmljoke = document.getElementById('joke');
        htmljoke.innerHTML = "";
        htmljoke.append(this.joke);
        this.allowvote();
    }
    allowvote() {
        let htmlvotes = document.getElementById('votes');
        htmlvotes.innerHTML = "";
        votingemojis.forEach((item, index) => {
            let btnscore = document.createElement('div');
            btnscore.className = "score";
            btnscore.setAttribute('id', index.toString());
            btnscore.innerHTML = item;
            htmlvotes.appendChild(btnscore);
            btnscore.addEventListener('click', event => {
                this.vote(index);
            });
        });
    }
    vote(score) {
        const d = new Date();
        let date = d.toISOString();
        if (!this.exists()) {
            // console.log('new vote');
            let voting = { idjoke: this.id, joke: this.joke, score: parseInt(score), date: date };
            reportJokes.push(voting);
        }
        else {
            // console.log('already voted. Rewrite');
            let objIndex = reportJokes.findIndex((obj => obj.idjoke === this.id));
            reportJokes[objIndex].score = parseInt(score);
        }
        console.log(reportJokes);
    }
    exists() {
        return reportJokes.some(e => e.idjoke === this.id);
    }
}
askWeather();
//# sourceMappingURL=index.js.map
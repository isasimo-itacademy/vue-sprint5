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
const apiURL = 'https://icanhazdadjoke.com/';
let reportJokes = [];
const votingemojis = ["💩", "😅", "🤣"];
function askJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(apiURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });
        const result = yield response.json();
        let jest = new Joke(result.joke, result.id);
        jest.printJoke();
    });
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
            let voting = { idjoke: this.id, score: parseInt(score), date: date };
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
//# sourceMappingURL=index.js.map
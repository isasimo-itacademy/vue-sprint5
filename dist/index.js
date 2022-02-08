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
function askJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(apiURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });
        const result = yield response.json();
        //printJoke(result.joke, result.id);
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
        let content = document.getElementById('joke');
        content.innerHTML = "";
        content.append(this.joke);
        console.log(this.id);
        this.vote();
    }
    vote() {
        const scores = document.querySelectorAll('.score');
        scores.forEach(el => el.addEventListener('click', event => {
            let score = event.target;
            const d = new Date();
            let date = d.toISOString();
            let voting = { idjoke: this.id, score: parseInt(score.getAttribute("id")), date: date };
            reportJokes.push(voting);
            console.log(reportJokes);
        }));
    }
}
//# sourceMappingURL=index.js.map
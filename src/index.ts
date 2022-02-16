// Interface
interface IVote {
  idjoke: number;
  joke: string;
  score: number;
  date: string;
}
// Global Variables
const weatherAPI:string = 'https://api.openweathermap.org/data/2.5/weather?lat=41.523135&lon=1.9439056&appid=79249a6da5a4a52e43bdc6a5bce6de66';
const iconWeather:string = 'https://openweathermap.org/img/wn/';
const today = new Date();
const monthNames:any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = today.getMonth();
const day = today.getDate();

const jokesAPI = ["https://icanhazdadjoke.com/", "https://api.chucknorris.io/jokes/random"];
const votingemojis = ["💩", "😅", "🤣"];
let reportJokes: IVote[] = [];
let random:number;

const giphyAPI:string = 'https://api.giphy.com/v1/gifs/random?api_key=qYDVGBA5krjcnKV9mh4mX0kbnXU1LRH0&tag=laugh&rating=g'; 

// API Calls
async function askWeather() {
  const response = await fetch(weatherAPI, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  })
  const result = await response.json();
  printWeather(result.weather);
}

async function askGif() {
  const response = await fetch(giphyAPI, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  })
  const result = await response.json();
  printGif(result.data.images.fixed_width.url);
}

async function askJoke() {
  random = Math.floor(Math.random()*jokesAPI.length);
  console.log(`joke from:${jokesAPI[random]}`);
  const response = await fetch(jokesAPI[random], {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    const result = await response.json();
    let jest:any;

    if(random === 0) {
      jest = new Joke(result.joke, result.id);
    } else if(random === 1){
      jest = new Joke(result.value, result.id);
    }
    
    jest.printJoke();
    askGif();
}

function printWeather(weather:any) {
  console.log(weather);
  let whatweather = weather[0].main;
  let whaticon = `${weather[0].icon}@2x.png`;
  // create html tags
  let weathericon:any = document.getElementById('weathericon');
  let weathertitle:any = document.getElementById('weathertitle');
  let weatherdate:any = document.getElementById('weatherdate');

  let img = document.createElement('img');
  let datetext = monthNames[month].concat(" ", day.toString());
  img.src = iconWeather.concat(whaticon.toString());
  weathericon.append(img);
  weatherdate.append(datetext);
  weathertitle.append(whatweather);
}

function printGif(gif:any) {
  let htmlcontent:any = document.getElementById('gif');
  let imggif = document.createElement('img');
  htmlcontent.innerHTML = "";
  imggif.src = gif;
  htmlcontent.append(imggif);
}

class Joke {
  joke: string;
  id: number;

  constructor(joke:string, id:number) {
    this.joke = joke;
    this.id = id;
  }

  printJoke() {
    let htmljoke:any = document.getElementById('joke');
    htmljoke.innerHTML = "";
    htmljoke.append(this.joke);
    this.allowvote();
  }

  allowvote() {
    let htmlvotes:any = document.getElementById('votes');
    htmlvotes.innerHTML = "";
    
    votingemojis.forEach((item, index) => {
      let btnscore = document.createElement('div');
      btnscore.className = "score";
      btnscore.setAttribute('id', index.toString());
      btnscore.innerHTML = item;
      htmlvotes.appendChild(btnscore);

      btnscore.addEventListener('click', event => {   
        this.vote(index);
       })
    });
  }

  vote(score:any){
    const d = new Date();
    let date = d.toISOString();

    if(!this.exists()){
      // console.log('new vote');
      let voting = { idjoke: this.id, joke: this.joke, score: parseInt(score), date: date }; 
      reportJokes.push(voting);
    } else {
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
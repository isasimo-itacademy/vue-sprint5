interface IVote {
  idjoke: number;
  score: number;
  date: string;
}
const apiURL:string = 'https://icanhazdadjoke.com/';
let reportJokes: IVote[] = [];
const votingemojis = ["💩", "😅", "🤣"];

async function askJoke() {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    const result = await response.json();
    let jest = new Joke(result.joke, result.id);
    jest.printJoke();
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
      let voting = { idjoke: this.id, score: parseInt(score), date: date }; 
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


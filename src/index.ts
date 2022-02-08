interface IVote {
  idjoke: number;
  score: number;
  date: string;
}
const apiURL:string = 'https://icanhazdadjoke.com/';
let reportJokes: IVote[] = [];

async function askJoke() {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    const result = await response.json();
    //printJoke(result.joke, result.id);
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
    let content:any = document.getElementById('joke');
    content.innerHTML = "";
    content.append(this.joke);
    console.log(this.id);
    this.vote();
  }

  vote(){
    const scores = document.querySelectorAll('.score');
    scores.forEach(el => el.addEventListener('click', event => {
      let score:any = event.target;
      const d = new Date();
      let date = d.toISOString();  
      
      let voting = { idjoke: this.id, score: parseInt(score.getAttribute("id")), date: date }; 
      reportJokes.push(voting);
      console.log(reportJokes);
    }));
  }
}


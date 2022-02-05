const apiURL:string = 'https://icanhazdadjoke.com/';

async function askJoke() {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    const result = await response.json();
    printJoke(result.joke);
}

function printJoke(thejoke:string) {
  console.log(thejoke);
  let content:any = document.getElementById('joke');
  content.innerHTML = "";
  content.append(thejoke);
}
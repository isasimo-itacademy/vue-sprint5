const apiURL:string = 'https://icanhazdadjoke.com/';

async function askJoke() {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    })
    const result = await response.json();
    console.log(result.joke);
}

askJoke();
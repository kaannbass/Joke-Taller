const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: '9bf5b6d4b0ac46078133a21808853b59',
        src: jokeString,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}
function Write(joke) {
    let text = document.getElementById('text');
    if (toggleButton) {
        text.innerText = joke;
    } else {
        text.append()
    }
}
// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Assign One or Two Part Joke
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Passing Joke to VoiceRSS API
        tellMe(joke);
        // Disable Button
        toggleButton();
        Write(joke)

    } catch (error) {
        // Catch Error Here
    }
}
// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

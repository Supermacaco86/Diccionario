const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById ("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onClick="playsound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</P>
                <p>/${data[0].phonetic}/</P>
            </div>
            <p class="word-weaning"> ${data[0].meanings[0].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>`;
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
            console.log(sound)
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        });
});
function playsound() {
    sound.play();
}

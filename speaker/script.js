const name = "speaker"
const short = "Convert text to voice and play it"
const script = (cmd, op) => {
  op.next()
  op.write("Hover over text in an input box and right-click to run the command.\n")
}
const js = `const item = document.createElement("div")
item.id = "menu-speek"
item.innerHTML = '<i class="material-icons">&#xe91f;</i> Speek'
item.classList.add("item")
item.classList.add("plugin_speeker")
document.getElementById("board-menu").appendChild(item)
$("input").on("contextmenu", function () {
  if (!window.getSelection().toString()) {
      $("#menu-speek").hide()
    } else {
      $("#menu-speek").click(function () {
        const voice = window.speechSynthesis;
        voice.cancel()
        const speech = new SpeechSynthesisUtterance();
        speech.text = window.getSelection().toString()
        speech.volume = 1; // From 0 to 1
        speech.rate = 1; // From 0.1 to 10
        speech.pitch = 2; // From 0 to 2
        voice.speak(speech);
      }).show()
    }
})`
const certificate = "fhvvhvvvh";
const type = "script";
const version = "1.0.0"
export { name, short, script, js, certificate, type, version };
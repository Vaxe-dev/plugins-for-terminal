const name = "listener";
const short = "Speech to text translation";
const script = (cmd, op) => {
  const voic = new SpeechRecognition();
  voic.interimResults = true;
  voic.lang = (cmd[0] || window.navigator.language)
  const id = op.randomString(10)
  op.write(`<div id="${id}"><i>Waiting...</i></div>`,true)
  voic.start()
  const el = $("#" + id)
  voic.onsoundstart = () => {
    el.html("<i>Listener...</i>")
  }
  voic.onresult = (e) => {
    const text = e.results[0][0].transcript
    el.html(text)
    el.addClass("listener")
    el.attr("lang", (cmd[0] || window.navigator.language))
    el.on("click", () => {
      navigator.clipboard.writeText(text)
    })
  }
  voic.onend = () => {
    op.next()
  }
  voic.onerror = (e) => {
    el.html(`<b error>Error: ${e.error}</b><br>`,true)
  }
}
const css = `.listener {
  border: 2px solid white;
  padding: 0.2%;
  border-radius: 5px;
  box-shadow: 0px 0px 5px;
  margin: 0.2%;
  position: relative;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.listener:hover {
  opacity: 0.8;
  cursor: pointer;
}
.listener:after{
  content: "";
  background: #737373;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px!important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.listener:active:after{
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}`
const certificate = "cucytaanp"
const type = "script"
const version = "9.3.0-beta"
export {name, short, script, css, certificate, type, version}
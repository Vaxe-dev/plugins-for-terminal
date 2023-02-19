const name = "listener";
const short = "Speech to text translation";
const script = (cmd, op) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    op.write(`<div>Your browser doesn't support SpeechRecognition.</div>`);
    return;
  }
  const voic = new SpeechRecognition();
  voic.interimResults = true;
  voic.lang = cmd[0] || window.navigator.language;
  const id = op.randomString(10);
  op.write(`<div id="${id}"><i>Waiting...</i></div>`, true);
  voic.start();
  const el = document.getElementById(id);
  voic.onsoundstart = () => {
    el.innerHTML = "<i>Listener...</i>";
  };
  voic.onresult = (e) => {
    const text = e.results[0][0].transcript;
    el.innerHTML = text;
    el.classList.add("listener");
    el.setAttribute("lang", cmd[0] || window.navigator.language);
    el.addEventListener("click", () => {
      navigator.clipboard.writeText(text);
    });
  };
  voic.onend = () => {
    op.next();
  };
  voic.onerror = (e) => {
    el.innerHTML = `<b error>Error: ${e.error}</b><br>`;
  };
};
const css = `.listener {
  border: 2px solid white;
  padding: 0.2%;
  border-radius: 5px;
  box-shadow: 0px 0px 5px;
  margin: 0.2%;
  position: relative;
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.listener:hover {
  opacity: 0.8;
  cursor: pointer;
}
.listener:after {
  content: "";
  background: #737373;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px!important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}
.listener:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}`;
const certificate = "cucytaanp";
const type = "script";
const version = "1.0.0"
export { name, short, script, css, certificate, type, version };
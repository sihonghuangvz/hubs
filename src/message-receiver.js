export function processRPC(command) {
    
    var rpcMsgTag = "[RPC COMMAND] ";

    console.log(rpcMsgTag + command);

    switch (command) {
        case "$toggleIntercomAudio":
            toggleIntercomAudio();
          break;
        case "$muteAll":
          handleMessageMuteAll();
          break;
    }
}

function toggleIntercomAudio(){

  const shouldEnablePositionalAudio = window.APP.store.state.preferences.audioOutputMode === "audio";
  window.APP.store.update({
      preferences: { audioOutputMode: shouldEnablePositionalAudio ? "panner" : "audio" }
  });

}

function handleMessageMuteAll() {
  const isOwner = window.APP.componentRegistry["player-info"][0].isOwner;
  const isMuteAll = window.APP.store.state.preferences.isMuteAll;
  

  // set value of customEvent: muteAll
  window.APP.store.update({
    preferences: { isMuteAll: !isMuteAll }
  });

  if (!isOwner) return;
  
  // set color of global mute button when clicked
  const muteBtnSvg = document.querySelector("#mute-all-btn svg circle");

  isMuteAll ? 
      muteBtnSvg.setAttribute("fill", "#33a532"):
      muteBtnSvg.setAttribute("fill", "#cd040b");

}
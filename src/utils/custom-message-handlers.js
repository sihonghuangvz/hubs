export const handleMessageMuteAll = (eventType, eventBool) => {
    const muteBtnSvg = document.querySelector("#mute-all-btn svg circle");

    // set value of customEvent: muteAll
    window.APP.customEvents[eventType] = !eventBool;  

    // set color of global mute button when clicked
    eventBool ? 
        muteBtnSvg.setAttribute("fill", "#33a532"):
        muteBtnSvg.setAttribute("fill", "#cd040b");

}
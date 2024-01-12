chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.action === 'logYouTubeContent') {
            console.log("Activate!")
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("avant")
            // Obtenez une référence vers l'élément que vous souhaitez "cliquer"
            var myElement = document.getElementsByClassName("ytp-ad-skip-button-modern")[0];

            // Créez un nouvel événement de clic
            var clickEvent = new Event('click', {
                bubbles: true
            });

            // Dispatchez l'événement sur l'élément
            myElement.dispatchEvent(clickEvent);
            console.log("apres")
            
        }
    }
);

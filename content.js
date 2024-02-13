chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.action === 'logYouTubeContent') {
            const selector_to_delete = ['tp-yt-iron-overlay-backdrop', 'body > ytd-app > ytd-popup-container > tp-yt-paper-dialog']
                    
            // Obtenez une référence vers l'élément que vous souhaitez "cliquer"
            var myElement = document.getElementsByClassName("ytp-ad-skip-button-modern")[0];
            if (myElement) {
                // Créez un nouvel événement de clic
                var clickEvent = new Event('click', {
                    bubbles: true
                });

                // Dispatchez l'événement sur l'élément
                myElement.dispatchEvent(clickEvent);
                console.log("skip atuo");
            }

            var blockagePopup = document.querySelector(selector_to_delete[1])
            if (blockagePopup) {
                blockagePopup.remove()
                var bgBlockagePopup = document.getElementsByTagName(selector_to_delete[0])[0]
                bgBlockagePopup.remove()
                console.log("remove popup");
            }
        }
    }
);

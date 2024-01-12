let selector_to_delete = ['body > tp-yt-iron-overlay-backdrop', 'body > ytd-app > ytd-popup-container > tp-yt-paper-dialog']
async function main() {
    while (true) {
        const activeTab = await getCurrentTab();
        console.log(activeTab)
        if (activeTab === undefined) {
            await new Promise(resolve => setTimeout(resolve, 100));
            continue
        }
        if (activeTab.url.includes("youtu")) {
            await new Promise(resolve => setTimeout(resolve, 200));
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: (/*arguments*/) => {
                    
                    // Obtenez une référence vers l'élément que vous souhaitez "cliquer"
                    var myElement = document.getElementsByClassName("ytp-ad-skip-button-modern")[0];
                    if (myElement !== undefined) {
                        // Créez un nouvel événement de clic
                        var clickEvent = new Event('click', {
                            bubbles: true
                        });

                        // Dispatchez l'événement sur l'élément
                        myElement.dispatchEvent(clickEvent);
                    }

                    var blockagePopup = document.querySelector(selector_to_delete[1])
                    if (blockagePopup !== undefined) {
                        blockagePopup.remove()
                        var bgBlockagePopup = document.querySelector(selector_to_delete[0])
                        bgBlockagePopup.remove()
                    }
                },
            });
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

async function getCurrentTab() {
    return new Promise(resolve => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]);
        });
    });
}

main()
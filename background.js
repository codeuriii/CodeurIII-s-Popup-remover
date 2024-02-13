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
                        console.log("skip auto");
                    }

                    var blockagePopup = document.querySelector(selector_to_delete[1])
                    if (blockagePopup) {
                        blockagePopup.remove()
                        var bgBlockagePopup = document.getElementsByTagName(selector_to_delete[0])[0]
                        bgBlockagePopup.remove()
                        console.log("remove popup");

                        // Relancer la video mise en pause par la popup
                        document.querySelector("video").click()
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
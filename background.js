
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
                    // Dans ce contexte, vous ne pouvez pas utiliser directement `document`
                    // Cependant, vous pouvez effectuer des opérations sur le DOM en utilisant les fonctions
                    // disponibles ici, comme `document.querySelector` et `document.querySelectorAll`.
                    // Par exemple:
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
                    
                },
            });
        } else {
            console.log("not on youtube")
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
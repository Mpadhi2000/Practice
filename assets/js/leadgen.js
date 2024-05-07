
function openDemoModal() {
    let demoButton = document.getElementById("demoButtonId")
    demoButton.click()
}

function checkUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams) {
        if (queryParams.get('bookDemo')) {
            openDemoModal()
        }
    }
}

checkUrl()
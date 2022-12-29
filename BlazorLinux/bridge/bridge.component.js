import { square, diagonal, Hello, invokeApi } from './spidereye2.js';
console.log(square(13)); // 169 
console.log(diagonal(12, 5)); // 13 
console.log(Hello);
//Hello.setName('Yu');
//Hello.sayHello();


import { SpiderEye } from './spidereye2.js';
console.log(SpiderEye);
console.log(window._spidereye);
//console.log(SpiderEye.checkBridgeReady()); 

const input = document.getElementById("startLongRunning");
input.addEventListener("click", startLongRunningTask);
const btnGetData = document.getElementById("getData");
btnGetData.addEventListener("click", getData);
const btnShowWindow = document.getElementById("showWindow");
btnShowWindow.addEventListener("click", showWindow);

function startLongRunningTask() {
    let longRunningTaskState = document.getElementById("longRunningTaskState");
    longRunningTaskState.innerHTML = square(9999);
    longRunningTaskState.innerHTML = 'Running...';
    window._spidereye.invokeApi('UiBridge.runLongProcedureOnTask', null,
        function (e) {
            console.log('Done!', e);
            if (e.success) {
                return longRunningTaskState.innerHTML = 'Done!';
            } else {
                return longRunningTaskState.innerHTML = 'Error: ' + e.error.message;
            }
        });
    return true;
};

function getData() {
    let getDataState = document.getElementById("getDataState");
    getDataState.innerHTML = square(9999);
    getDataState.innerHTML = 'Running...';
    window._spidereye.invokeApi('UiBridge.getSomeData', null,
        function (e) {
            console.log('Done!', e);
            if (e.success) {
                return getDataState.innerHTML = 'Result: ' + JSON.stringify(e.value);
            } else {
                return getDataState.innerHTML = 'Error: ' + e.error.message;
            }
        },
        function (error) {
            console.log(error);
            return getDataState.innerHTML = 'Error: ' + error.message;
        });
    return true;
};

function showWindow() {
    //const browserWindow = new BrowserWindow(windowConfig);
    //browserWindow.show();
    window._spidereye.invokeApi("f0631cfea99a_Window.show", windowConfig, apiResult => {
        if (apiResult.success) {
            if (result != null) {
                console.log("success");
            }
        } else if (error != null) {
            console.log(apiResult.error);
        }
    });

}

const windowConfig = {
    title: 'Hello World',
    width: 900,
    height: 600,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    backgroundColor: '#303030',
    canResize: true,
    useBrowserTitle: true,
    enableScriptInterface: true,
    enableDevTools: true,
    url: '/index.html'
};

export function ModulePrompt(message) {
    return ScriptPrompt(message);
}

export function ModulAlert(message) {
    return ScriptAlert(message);
} 
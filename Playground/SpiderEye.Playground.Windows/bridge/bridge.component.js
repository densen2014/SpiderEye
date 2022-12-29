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

function startLongRunningTask() {
    let longRunningTaskState = document.getElementById("longRunningTaskState");
    longRunningTaskState.innerHTML = square(9999);
    longRunningTaskState.innerHTML = 'Running...';
    window._spidereye.invokeApi('UiBridge.runLongProcedureOnTask',null,
        function (e) {
            console.log('Done!',e);
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

export function ModulePrompt(message) {
    return ScriptPrompt(message);
}

export function ModulAlert(message) {
    return ScriptAlert(message);
} 
import { square, diagonal, Hello, invokeApi } from './spidereye2.js';
console.log(square(13)); // 169 
console.log(diagonal(12, 5)); // 13 
console.log(Hello);
//Hello.setName('Yu');
//Hello.sayHello();


import { SpiderEye } from './spidereye2.js';
console.log(SpiderEye);
console.log(window._spidereye);


export function startLongRunningTask(wrapper) {
    wrapper.invokeMethodAsync('GetStatus', 'Running...');
    window._spidereye.invokeApi('UiBridge.runLongProcedureOnTask', null,
        e => {
            wrapper.invokeMethodAsync('GetResult', e );
            console.log('Done!', e);
        });
    return "waiting...";
};

export function getData(wrapper) {
    wrapper.invokeMethodAsync('GetStatus', 'Running...');
    window._spidereye.invokeApi('UiBridge.getSomeData', null,
        e => {
            wrapper.invokeMethodAsync('GetResult2', e);
            console.log('Done!', e);
        });
    return "waiting...";
};

export function showWindow(wrapper) {
    window._spidereye.invokeApi("f0631cfea99a_Window.show", windowConfig, e => {
        wrapper.invokeMethodAsync('GetResult', e);
        if (e.success) {
            if (result != null) {
                console.log("success");
            }
        } else if (error != null) {
            console.log(e.error);
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
    url: 'https://localhost:7047'
};

export function ModulePrompt(message) {
    return ScriptPrompt(message);
}

export function ModulAlert(message) {
    return ScriptAlert(message);
} 
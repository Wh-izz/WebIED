var editor, submit;
require.config({ paths:{vs:'monaco-editor/min/vs' } });
require(['vs/editor/editor.main'],()=>{
    editor = monaco.editor.create(document.getElementById('container'),{
        value:['#include<stdio.h>','int main(){','\tprintf("Hello World!");','\treturn 0;','}'].join('\n'),
        language:'C++'
    });
    
    submit = () => {
        var text = editor.getValue();
        var input = document.getElementById('input').value;
        const data = {
            code: text,
            input: input
        };
        const jsonData = JSON.stringify(data);
        fetch('/submit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(result => {
            console.log('result:', result.result);
            document.getElementById('output').value = result.result;
        })
        .then(error => console.log('error', error));
    }
})
        
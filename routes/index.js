const fs   = require('fs');
const child_process = require('child_process');

const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.sendFile('index.html');
});

router.post('/submit',(req,res)=>{
    const code = req.body.code;
    var input = req.body.input;
    
    fs.writeFile('public/Code/text.cpp',code,(err)=>{
        if(err){
            console.error('Error Writing File:',err);
            return ;
        }
        console.log('File Written successfully');

        var gcc=child_process.spawn('./MinGW64/bin/g++.exe',['-o','public/Code/text.exe','public/Code/text.cpp']);
        gcc.stderr.on('data',(data)=>{
            console.log('Compile error:'+data.toString());
        });
        gcc.stdout.on('data',(data)=>{
            console.log('Compile result:'+data.toString());
        });
        gcc.on('close',(code)=>{
            console.log('Compile Code:'+code);
            //input = input.split(' ').filter(item => item != '');
            input = input + '\n';
            console.log(input);
            var output=child_process.spawn('public/Code/text.exe');

            var outputdata = '';
            output.stderr.on('data',function(data){
                console.log('run error:'+data.toString());
            });
            output.stdout.on('data',function(data){
                console.log('run output:'+data.toString());
                outputdata = outputdata + data.toString();
                console.log('outputdata:'+outputdata);
            });
            output.on('close',(code)=>{
                console.log(code);
                const jsondata = {
                    result: outputdata
                };
                res.send(jsondata);
            })

            output.stdin.write(input);
        })
    });

});

module.exports = router;
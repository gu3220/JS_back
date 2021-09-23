const express = require('express');
const http = require('http');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
console.log('URL = ', req.url);
console.log('Original_URL = ', req.origialUrl);
console.log('METHOD = ', req.method);
console.log('HOST = ', req.headers.host);
console.log('InSecure = ', req.secure); 
console.log('BODY', req.body);
console.log('QUERY', req.query);

next();
});

app.all('/test', (req, res)=>{
res.status(200).json({message: 'OK'});
})


const sum = (num1, num2) => {
    return num1 + num2
}
console.log('1 + 2 = ', sum(1,2));

const reverseCase = (string) => {
    let newString = '';
    for (let symb in string)
    {
         if (string[symb].toLowerCase() == string[symb]) newString += string[symb].toUpperCase();
         else newString += string[symb].toLowerCase();
    }
    return newString
}
console.log('\'Hello !!!\' in reverse is: ', reverseCase('Hello !!!'));

const reverseArray = (arr) => {
    return arr.reverse()
}
console.log('["Blue", "Green", "Pink"] in reverse is: ', reverseArray(["Blue", "Green", "Pink"]));

http.createServer(app).listen(3000, () => {
console.log('Server is working on port 3000');
})




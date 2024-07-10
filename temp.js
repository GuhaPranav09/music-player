const jiosaavn = require('jiosaavnapi');

jiosaavn
    .searchForSongs('sunflower')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
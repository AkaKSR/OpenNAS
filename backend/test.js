const uuid = require('uuid');
const namespace = '856f6fba-840f-4d53-8317-4551e57435a2';

function startApp() {
    console.log(uuid.v5("test", namespace));
}

startApp();
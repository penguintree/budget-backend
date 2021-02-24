const fs = require('fs');

const files = fs.readdirSync(__dirname + '/');
for(let f of files) {
   if (f.match(/\.controller\.js$/)) {
      require(`./${f}`);
   }
}

module.exports = 'controllers';
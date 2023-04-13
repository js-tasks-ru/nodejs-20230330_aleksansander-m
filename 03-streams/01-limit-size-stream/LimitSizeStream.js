const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');



class LimitSizeStream extends stream.Transform {
  constructor(options) {
    //console.log(options);
    super(options);
    this.counter = 0;
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.counter = this.counter + chunk.length;
    //console.log(chunk.toString());
    //console.log(this.limit);
    //console.log(this.counter);
    let error = null;
    if (this.counter > this.limit) {
      error = new LimitExceededError();
    }
    callback(error, chunk);
  };
}

module.exports = LimitSizeStream;

construe
========

Object.defineProperty wrapper with nice description methods

## Installation

```bash
npm install construe
```

## Documentation

`contrue` method basically does what Object.defineProperty / Object .defineProperties does.

If we specify 2 arguments then Object.defineProperties method is called.

If we specify 3 arguments then Object.defineProperty method is called.

### Additional descriptor features

#### method

If you specify `method` descriptor and assign function to it, `contrue` will bind the target object to this method.

```js
var obj = construe({}, {
    test: {
        method: function () {
            //in this function `this` is always set to obj
        }
    }
});
```

### Share nodejs module with the browser

If you use express you can use confinience method to share this node module with the browser:

```js
app.get('/construe.js', construe.expressRoute);
```

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

#### bindable

`bindable` descriptor should be set if you want to user `construe.bind(...)` method to bind variables.

```js
var obj1 = construe({
  variable: {
    bindable: true
  }
});

var obj2 = construe({
  variable: {
    bindable: true
  }
});

construe.bind(obj1, 'variable', obj2, 'variable');

obj2.variable = 'TEST';
console.log(obj1.variable); //obj1.variable has value of 'TEST' now
```

#### bind

`bind` descriptor invokes `construe.bind(...)` method. `bind` descriptor parameter should be an array with 2 elements: an object and a variable.

```js
var obj1 = construe({
  variable: {
    bindable: true
  }
});

var obj2 = construe({
  variable: {
    bind: [obj1, 'variable']
  }
});

obj1.variable = 'TEST';
console.log(obj2.variable); //obj2.variable has value of 'TEST' now
```

#### bind2Way

`bind2Way` descriptor works same as `bind` descriptor does but it uses `construe.bind2Way`.

 ```js
```js
var obj1 = construe({
  variable: {
    bindable: true
  }
});

var obj2 = construe({
  variable: {
    bind2Way: [obj1, 'variable']
  }
});

obj1.variable = '2 way';
console.log(obj2.variable); //obj2.variable has a value of '2 way`

obj2.variable = 'data binding';
console.log(obj1.variable); //obj1.variable has a value of 'data binding' now
 ```

### Share nodejs module with the browser

If you use express you can use confinience method to share this node module with the browser:

```js
app.get('/construe.js', construe.expressRoute);
```

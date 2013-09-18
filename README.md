construe
========

Object.defineProperty wrapper with nice description methods

## Documentation

`contrue` method basically does what Object.defineProperty / Object .defineProperties does.

If we specify 2 arguments then Object.defineProperties method is called.

If we specify 3 arguments then Object.defineproperty method is called.

### Additional descriptor features

#### method

If you specify `method` descriptor and assign function to it, `contrue` will bind the target object to this method.
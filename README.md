# ws-babel-debug

The idea behind this repository is sharing my findings around the whole process of debugging a transpiled code using 
Babel and WebStorm.

Contributions to this repository are welcome!

## Tools

* WebStorm 11.0.3
* Node 4.2.4 and 5.3.0
* [https://github.com/tj/n](https://github.com/tj/n)
* [https://github.com/jkbrzt/httpie](https://github.com/jkbrzt/httpie)

## Config

Setting up WebStorm...

### No Lazy

In order to avoid this error

![error](screenshots/error.png?raw=true)

While debugging using ```babel-node``` instead of ```node```, all you have to do is remove the ```--no-lazy``` option:

![help](screenshots/config/help.png?raw=true)
![find](screenshots/config/find.png?raw=true)
![registry](screenshots/config/registry.png?raw=true)

### lib debugging (transpiled code, [check the build script in package.json](package.json#L8))

![lib debugging](screenshots/config/lib.png?raw=true)

### src debugging (raw code, using ```babel-node``` from the ```babel-cli``` module)

![src debugging](screenshots/config/src.png?raw=true)

### Breakpoints

#### src

![src index](screenshots/src/index.png?raw=true)
![src other](screenshots/src/other.png?raw=true)

#### lib

![lib index](screenshots/lib/index.png?raw=true)
![lib other](screenshots/lib/other.png?raw=true)

## Debugging lib in node 4.2.4

* it stops on the [lib/other.js:12](lib/other.js#L12) breakpoint
* local variables are collected
* time variable is collected
* Global.process.env.PORT is undefined (among others)
* after resuming, it stops on the [lib/index.js:31](lib/index.js#L31) breakpoint
* local variables are collected
* Global.process.env.PORT is undefined (among others)

## Debugging src in node 4.2.4

* it stops on the [src/other.js:5](src/other.js#L5) breakpoint
* local variables are collected
* time variable is collected
* Global.process.env.PORT is undefined (among others)
* after resuming, it stops on the [src/other.js:5](src/other.js#L5) breakpoint
* after resuming, it stops on an imaginary line [src/other.js:13](src/other.js#L13)
* after resuming, it stops on the [src/index.js:8](src/index.js#L8) breakpoint
* local variables are collected
* Global.process.env.PORT is undefined (among others)

## Debugging lib in node 5.3.0

* it stops on the [lib/other.js:12](lib/other.js#L12) breakpoint
* local variables are collected
* time variable is collected
* Global.process.env.PORT is undefined (among others)
* after resuming, it stops on the [lib/index.js:31](lib/index.js#L31) breakpoint
* local variables are collected
* Global.process.env.PORT is undefined (among others)

## Debugging src in node 5.3.0

* the debugger goes crazy...
* it stops on [src/index.js:9](src/index.js#L9) and [src/other.js:6](src/other.js#L6) without calling the server, just after starting it
* sometimes it stops on the [src/index.js:8](src/index.js#L8) breakpoint, but most of the time it skips both breakpoints
* local variables are a mess and the ctx one shows a reference error

## Final thoughts

* the debugger works pretty well on both scenarios under node 4.2.4
* it breaks really bad when it comes to raw code and sourcemaps under node 5.3.0
* it works on transpiled code under node 5.3.0
* some collected data (like environment variables) are always undefined
* I'm not sure if [this is the right way](src/polyfill.js) of adding the ```babel-polyfill``` since ```babel-node``` adds its own causing an error

## Some links

* [ES6 with Babel, break point not working in original files](https://youtrack.jetbrains.com/issue/WEB-16397)
* [Debugging babel code with node in WebStorm is not working](https://youtrack.jetbrains.com/issue/WEB-19159)
* [v8 remote debug: export BreakEvent, BreakPoint and CompileEvent](https://github.com/nodejs/node/pull/4231)


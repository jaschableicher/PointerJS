# PointerJS

A simple to use Remote Control and Pointer for RevealJS

## General Usage

### Client Side

You can include PointerJS like this:
```html
<script type="text/javascript" src="/public/js/reveal.js"></script>
<script type="text/javascript" src="/public/js/presentation.js"></script>
```
If you do it that way, you need to initialize it after the reveal.js file

Or you can include it in the Reveal.initialize part:
```javascript
Reveal.initialize({
      dependencies:[
        { src:"/public/js/presentation.js" },
        //Your other plugins
        ]
  })
```

Include PointerJS in your Remote Control side: 
```
<script type="text/javascript" src="/public/js/Pointer.js></script>
```

Now you can go in the terminal and type:
```shell
npm install
npm start
```
No go to localhost:3000 and watch the presentation.
To use the Remote Control by going to localhost:3000/pointer

# PointerJS

A simple to use Remote Control and Pointer for RevealJS

## General Usage

### Client Side

You can include PointerJS like this:
```html
<script type="text/javascript" src="/public/js/reveal.js"></script>
<script type="text/javascript" src="/public/js/presentation.js></script>
```
If you do it that way, you need to initialize it after the reveal.js file

Oryou can include it in the Reveal.initialize part:
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

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
```html
<script type="text/javascript" src="/public/js/Pointer.js"></script>
```

### Server Side

Now you can go in the terminal and type:
```shell
npm install
npm start
```
Now go to localhost:3000 and watch the presentation.
To use the Remote Control by going to localhost:3000/pointer

## Configuration
### Main Presentation
```javascript 
Pointer.initialize({
	color: "orange",
	width: "20", // recommendedwidth and height for the pointer
	height: "20", 
	PointerSite : "/pointer", // If not defined its automaticly "/pointer"
	Server: "localhost:3000" // Only needed if file is not on the same Server
})/
      })
```

### Pointer site
```javascript
Pointer.initialize({
       server: "localhost:3000", // socketio Server
       notes: true, // You can  see your RevealJS notes
       dependencies:[
             { src: "/public/bootstrap/js/bootstrap.min.js", type:"js"}, 
             { src: '/public/bootstrap/css/bootstrap.min.css', type:"css"}
	     // You can initialize dependencies like with Reveal.initialize
        ]
})
```

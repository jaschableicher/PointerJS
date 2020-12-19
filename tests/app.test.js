const { http } = require('../Server');
const request = require('supertest');
var address, os = require('os'), ifaces = os.networkInterfaces();
var fs = require("fs")
  beforeAll(() => {
    
    process.env.NODE_TEST = true;
    
    for (var dev in ifaces) {
        var iface = ifaces[dev].filter(function (details) {
            return details.family === 'IPv4' && details.internal === false;
        });
        if (iface.length > 0) address = iface[0].address;
    }
  })

test('CDNs installed', ()=>{
 const requiredPublicFiles = ['css/reveal.css', 'js/jquery.min.js','js/Pointer.js','js/Presentation.js','js/QR.js','js/reveal.js'];
 requiredPublicFiles.map(val =>{
  let x = fs.existsSync(__dirname +'/../public/'+val);
  expect(x).toBe(true)
 })
 
})
test('get ip', async () => {
    const res = await request(http).get('/getip');
    expect(res.status).toBe(200);
    expect(res.text).toBe(address)
    //expect(res.body).toEqual(address);
});
test('presentation is being hosted without errors', async ()=>{
    const res = await request(http).get('/');
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=UTF-8');
})
test('CDNs are being hosted', async ()=>{
  const requiredPublicFiles = ['css/reveal.css', 'js/jquery.min.js','js/Pointer.js','js/Presentation.js','js/QR.js','js/reveal.js'];
  requiredPublicFiles.map(async val =>{
    let res = await request(http).get(`/public/${val}`);
    expect(res.status).toBe(200);
  })
})
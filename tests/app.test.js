const { http } = require('../Server');
const request = require('supertest');
var address, os = require('os'), ifaces = os.networkInterfaces();
  beforeAll(() => {
    process.env.NODE_TEST = true;
    
    for (var dev in ifaces) {
        var iface = ifaces[dev].filter(function (details) {
            return details.family === 'IPv4' && details.internal === false;
        });
        if (iface.length > 0) address = iface[0].address;
    }
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

const { http } = require('../Server');
const request = require('supertest');
  beforeAll(() => {
    process.env.NODE_TEST = true;
  })
test('get ip', async () => {
    var address, os = require('os'), ifaces = os.networkInterfaces();

    for (var dev in ifaces) {
        var iface = ifaces[dev].filter(function (details) {
            return details.family === 'IPv4' && details.internal === false;
        });
        if (iface.length > 0) address = iface[0].address;
    }
    const res = await request(http).post('/getip');
    expect(res.status).toBe(200);
    expect(res.text).toBe(address)
    //expect(res.body).toEqual(address);
});
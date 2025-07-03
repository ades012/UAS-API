const soap = require('soap');
const http = require('http');
const fs = require('fs');
const service = require('./serviceLogic');

const wsdl = fs.readFileSync(__dirname + '/wsdl/service.wsdl', 'utf8');
const server = http.createServer((req, res) => res.end('404 Not Found'));

soap.listen(server, '/wsdl', service, wsdl);

server.listen(8001, () => {
  console.log('SOAP server running at http://localhost:8001/wsdl');
});

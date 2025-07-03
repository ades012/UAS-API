const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const db = require('../db/database');

const PROTO_PATH = __dirname + '/protos/inventory.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const inventory = grpcObj.inventory;

function GetItemById(call, callback) {
  const id = call.request.id;
  const row = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  if (row) {
    callback(null, { id: row.id, name: row.name });
  } else {
    callback(null, { id: 0, name: 'Not Found' });
  }
}

const server = new grpc.Server();
server.addService(inventory.InventoryService.service, { GetItemById });
server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server running at http://localhost:5000');
});

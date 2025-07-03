const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/protos/inventory.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const client = new grpcObj.inventory.InventoryService('localhost:5000', grpc.credentials.createInsecure());

client.GetItemById({ id: 2 }, (err, response) => {
  if (err) console.error(err);
  else console.log('Response from gRPC:', response);
});

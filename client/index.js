const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const name1 = 'Sidney Kertzmann';
  const idx = niceList.findIndex(n => n === name1);
  const proof1 = merkleTree.getProof(idx);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name:name1,
    index:idx,
    proof:proof1
  });

  console.log({ gift });  
}

main();
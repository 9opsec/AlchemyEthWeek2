const express = require('express');
const verifyProof = require('../utils/verifyProof');
// const niceList = require('../utils/niceList.json');
// const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // const merkleTree = new MerkleTree(niceList);
  
  console.log("body :" , body);
  console.log(body.name);

// bm
// const root = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';
const root = MERKLE_ROOT;
//  const root = merkleTree.getRoot();
// // console.log(root);
const name = body.name;
// const index = niceList.findIndex(n => n === name);
const index = body.index;
// console.log(index);


// const proof = merkleTree.getProof(index);
const proof = body.proof;

// console.log( verifyProof(proof, name, root) );  


  // TODO: prove that a name is in the list 
  // const isInTheList = false;  
  const isInTheList = verifyProof(proof, name, root);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

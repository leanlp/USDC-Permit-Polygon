require("dotenv").config();
const { ethers } = require("ethers");
const tokenAbi = require("./abiUsdc.json");
const dexAbi = require("./abiDex.json");

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);
const owner = wallet.address; 
const tokenAddress = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
const spender = "0x22DAcCD029c443D1af422f10dabcFB77EB69319f"; 
const value = 1e6; // or could use ...ethers.parseUnits("1", 6);
const deadline = 1715917364;//Math.floor(Date.now() / 1000) + 3600; // 1 hours
const dexAddress = "0x22DAcCD029c443D1af422f10dabcFB77EB69319f";
console.log(deadline)

async function main() {
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, wallet);
  const dexContract = new ethers.Contract(dexAddress, dexAbi, wallet);
  block = await provider.getBlockNumber();

  const nonce = await tokenContract.nonces(owner);
  const sepolia = await provider.getNetwork();

  // Construct the permit message
  const permitMessage = {
    owner: owner,
    spender: spender,
    value: value,
    nonce: nonce,
    deadline: deadline,
  };

  // Define the domain separator
  const domain = {
    name: "USD Coin",
    version: "2",
    chainId: sepolia.chainId, // Replace with the correct chain ID
    verifyingContract: tokenAddress,
  };

  // Define the types
  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  // Sign the permit message
  const permitSignature = await wallet.signTypedData(
    domain,
    types,
    permitMessage
  );
  console.log("Permit Signature:", permitSignature);

  const splitSig = (sig) => {
    // Splits the signature into r, s, and v components.
    const pureSig = sig.replace("0x", "");

    const r = "0x" + pureSig.substring(0, 64);
    const s = "0x" + pureSig.substring(64, 128);
    const v = parseInt(pureSig.substring(128, 130), 16);
    console.log("hey");
    return {
      r: r,
      s: s,
      v: v,
    };
  };

  const { r, s, v } = splitSig(permitSignature);
  console.log({ r, s, v });

  // Execute the permit transaction with split signature
    const dexTx = await dexContract.depositUSDTandReciveToken(
      value,
      deadline,
      v,
      r,
      s,
    );
  console.log("Permit Transaction:", dexTx); 

  /* const permit2 = await tokenContract.permit(
    owner,
    spender,
    value,
    deadline,
    permitSignature
  );

  console.log(permit2); */
}

main().catch((err) => console.error(err));

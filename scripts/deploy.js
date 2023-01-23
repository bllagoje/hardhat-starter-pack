const { ethers, run, network } = require("hardhat");


const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract....");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  
  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  // console.log(network.config);

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue}`);
  // Update current value:
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`);
  
};

// Verify:
const verify = async (contractAddress, args) => {
  console.log("Verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (err) {
    if(err.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(err);
    }
  }

};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1)
  });


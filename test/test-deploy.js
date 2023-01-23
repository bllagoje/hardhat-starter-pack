const { ethers } = require("hardhat");
const { expect, assert } = require("chai");


describe("Simple Storage", () => {
  let simpleStorageFactory;
  let simpleStorage;
  // Before Each:
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  // It:
  it("Should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert.equal(currentValue.toString(), expectedValue);
    expect(currentValue.toString()).to.equal(expectedValue);
  });
  // It:
  it("Should update when we call store", async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store("7");
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
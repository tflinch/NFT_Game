
const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Bobby", "Sally", "Phazer"],       // Names
        ["https://i.imgur.com/pKd5Sdk.png", // Images
            "https://i.imgur.com/xVu4vFL.png",
            "https://i.imgur.com/WMB6g9u.png"],
        [125, 200, 300],                    // HP values
        [75, 50, 25],                       // Attack damage values
        "Lord Phazer", // Boss name
        "https://i.imgur.com/AksR0tt.png", // Boss image
        10000, // Boss hp
        50 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);



    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
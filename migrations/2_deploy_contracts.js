const SushiToken = artifacts.require("SushiToken.sol");
const MasterChef = artifacts.require("MasterChef.sol");

module.exports = async function (deployer) {
  const isLiveDeployment = false;

  // Deploy Sushi Token
  await deployer.deploy(SushiToken);
  const sushiToken = await SushiToken.deployed();

  // Deploy Masterchef Contract
  await deployer.deploy(
    MasterChef,
    sushiToken.address,
    process.env.DEV_ADDRESS, // Your address where you get sushi tokens - should be a multisig
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    process.env.START_BLOCK, // Block number when token mining starts
    process.env.BONUS_END_BLOCK // Block when bonus ends
  );

  // Make Masterchef contract token owner
  const masterChef = await MasterChef.deployed();
  await sushiToken.transferOwnership(masterChef.address);

  // Add Liquidity pool for rewards, e.g., "ETH/DAI Pool"

  // Add more liquidity pools here upon deployment, or add them later manually
  if (isLiveDeployment) {
    await masterChef.add(10, process.env.DAI_ETH_LP_ADDRESS, false);
    await masterChef.add(10, process.env.USDC_ETH_LP_ADDRESS, false);
    await masterChef.add(10, process.env.LINK_ETH_LP_ADDRESS, false);
    await masterChef.add(10, process.env.UNI_ETH_LP_ADDRESS, false);
    await masterChef.add(10, process.env.SUSD_ETH_LP_ADDRESS, false);
    await masterChef.add(10, process.env.ETH_USDT_LP_ADDRESS, false);
    await masterChef.add(10, process.env.WBTC_ETH_LP_ADDRESS, false);
    await masterChef.add(10, process.env.AAVE_ETH_LP_ADDRESS, false);
  } else {
    await masterChef.add(
      10,
      "0x03e6c12ef405ac3f642b9184eded8e1322de1a9e",
      false
    );
  }
};

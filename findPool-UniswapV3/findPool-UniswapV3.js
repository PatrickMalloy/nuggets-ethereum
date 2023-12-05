import { Contract, getDefaultProvider } from "ethers";
import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json' assert {type: 'json'}

// Use Ethers DefaultProvider for the Ethereum Mainnet
const provider = getDefaultProvider("mainnet");

const tokens = {
  WETH: {address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', symbol: 'WETH'},
  DAI:  {address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI'},
  USDC: {address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', symbol: 'USDC'},
  USDT: {address: '0xdac17f958d2ee523a2206206994597c13d831ec7', symbol: 'USDT'},
  UNI:  {address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', symbol: 'UNI'}
}

// https://docs.uniswap.org/contracts/v3/reference/deployments
const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984' // UniswapV3Factory

// Pool Fees: 0.01%, 0.05%, 0.3%, 1.0%
const fees = {
  100:   "0.01%",
  500:   "0.05%",
  3000:  "0.03%",
  10000: "1.00%"
}

async function findPool(token1, token2) {
  const factoryContract = new Contract(
    factoryAddress,
    UniswapV3Factory.abi,
    provider
  )
  
  console.log(`\nPool Pair: (${token1.symbol}:${token2.symbol})`)
  let poolAddress
  
  for (const fee in fees) {
    poolAddress = await factoryContract.getPool(token1.address, token2.address, fee)
    console.log(`  Fee level: ${fees[fee]}, Pool Address: ${poolAddress}`)
  }
}

async function main() {
  await findPool(tokens.WETH, tokens.DAI)
  await findPool(tokens.WETH, tokens.USDC)
  await findPool(tokens.WETH, tokens.USDT)
  await findPool(tokens.WETH, tokens.UNI)
}

main()
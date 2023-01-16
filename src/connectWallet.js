function getChainID(currentChain) {
  let currentChainID;
  switch (currentChain) {
    case "EthereumMainNetworkMainnet":
      currentChainID = "0x1";
      break;
    case "RopstenTestNetwork":
      currentChainID = "0x3";
      break;
    case "GoerliTestNetwork":
      currentChainID = "0x5";
      break;
    case "KovanTestNetwork":
      currentChainID = "0x2a";
      break;
    case "MumbaiTestNetwork":
      currentChainID = "0x13881";
      break;
    case "PolygonMainNetwork":
      currentChainID = "0x89";
      break;
    case "AvalancheCChainMainNetwork":
      currentChainID = "0xA86A";
      break;
    case "FujiTestNetwork":
      currentChainID = "0xA869";
      break;
    case "MetisAndromedaMainNetwork":
      currentChainID = "0x440";
      break;
    case "MetisStardustTestNetwork":
      currentChainID = "0x24C";
      break;
    case "AuroraMainNetwork":
      currentChainID = "0x4E454152";
      break;
    case "AuroraTestNetwork":
      currentChainID = "0x4E454153";
      break;
    case "BinanceSmartChainMainNetwork":
      currentChainID = "0x38";
      break;
    case "BinanceSmartChainTestNetwork":
      currentChainID = "0x61";
      break;
    case "FantomOperaMainNetwork":
      currentChainID = "0xFA";
      break;
    case "FantomTestNetwork":
      currentChainID = "0xFA2";
      break;
    case "ShardeumLiberty1":
      currentChainID = "0x1F90";
      break;
    case "ShardeumLiberty2":
      currentChainID = "0x1F91";
      break;
  }
  return currentChainID;
}
const connectWallet = async (chainToConnect) => {
  // const { address, setAddress } = useContext(AuthContext);

  const { ethereum } = window;

  try {
    if (!ethereum) {
      console.log("Metamask not detected");
      return;
    }

    let chainId = await ethereum.request({ method: "eth_chainId" });

    const chainIdHex = getChainID(chainToConnect);

    if (chainId !== chainIdHex) {
      console.log(`You are not connected to ${chainToConnect} \n`);
      return;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const currentAccount = accounts[0];
    console.log(currentAccount);
    // setAddress(currentAccount);
    localStorage.setItem("wallertAddress", currentAccount);
    console.log("Wallet connected successfully \n");
    return currentAccount;
    // window.location.reload();
  } catch (error) {
    let errordata = error.data
      ? error.data.message.split(":")[1]
      : error.message.split(":")[1];
    console.log("Please connect your wallet \n");
    // console.log('Error:', errordata);
  }
};
export default connectWallet;

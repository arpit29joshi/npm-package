const connectWallet = async () => {
  // const { address, setAddress } = useContext(AuthContext);

  const { ethereum } = window;

  try {
    if (!ethereum) {
      console.log("Metamask not detected");
      return;
    }

    let chainId = await ethereum.request({ method: "eth_chainId" });
    // console.log('Connected to chain:' + chainId);

    const polygonChainId = "0x13881";

    if (chainId !== polygonChainId) {
      console.log("You are not connected to Polygon Testnet \n");
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
    return currentAccount
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

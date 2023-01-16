import React, { useContext, useEffect, createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      // toast.error('Metamask not detected');

      // console.log('METAMASK NOT DETECTED');
      // USE TOASTER
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    // TODO (eth_requestAccounts) -> to open popup
    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
    });
    const localAddress = localStorage.getItem("wallertAddress");
    if (accounts.length > 0 && localAddress !== accounts[0]) {
      window.location.reload();
    }
    if (accounts && accounts.length > 0) {
      console.log("Accounts", accounts[0]);
      localStorage.setItem("wallertAddress", accounts[0]);
      setAddress(accounts[0]);
    } else {
      localStorage.clear();
      setAddress(null);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        address,
        setAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

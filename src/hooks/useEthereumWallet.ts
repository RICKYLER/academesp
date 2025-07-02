
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

interface WalletState {
  account: string | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
}

export const useEthereumWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    account: null,
    balance: null,
    isConnecting: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    if (!(window as any).ethereum) {
      setWalletState(prev => ({ ...prev, error: 'Please install MetaMask!' }));
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const account = accounts[0];
      
      const balance = await provider.getBalance(account);
      const formattedBalance = parseFloat(ethers.formatEther(balance)).toFixed(4);

      setWalletState({
        account,
        balance: formattedBalance,
        isConnecting: false,
        error: null,
      });
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      account: null,
      balance: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  };
};

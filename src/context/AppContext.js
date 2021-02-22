import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [gameStatus, setGameStatus] = useState({
    balance: 99.99,
    isLogin: null,
    userName: "",
  });

  useEffect(() => {
    const geData = () => {
      let config = localStorage.getItem("config");
      console.log(config);
      if (config) {
        let { userName, balance } = JSON.parse(config);
        if (userName && balance) {
          setGameStatus({
            balance,
            userName,
            isLogin: true,
          });
        }
      }
    };
    geData();
  }, []);

  const login = (_userName) => {
    let balance = gameStatus.balance;
    setGameStatus({
      ...gameStatus,
      userName: _userName,
      isLogin: true,
    });
    localStorage.setItem(
      "config",
      JSON.stringify({ balance: balance, userName: _userName })
    );
  };

  const logout = () => {
    setGameStatus({
      ...gameStatus,
      userName: "",
      isLogin: false,
      balance: 99.99
    });
    localStorage.setItem("config", "");
  };

  const refreshStorage = () => {
    localStorage.setItem(
      "config",
      JSON.stringify({
        balance: gameStatus.balance,
        userName: gameStatus.userName,
      })
    );
  };

  const addPoint = () => {
    setGameStatus({
      ...gameStatus,
      balance: gameStatus.balance + 0.5,
    });
    // refreshStorage();
  };
  const addSuperPoint = () => {
    setGameStatus({
      ...gameStatus,
      balance: gameStatus.balance + 10,
    });
    // refreshStorage();
  };

  const removePoint = () => {
    setGameStatus({
      ...gameStatus,
      balance: gameStatus.balance - 1,
    });
  };

  useEffect(() => {
    refreshStorage();
  }, [gameStatus.balance,refreshStorage]);
  
  return (
    <AppContext.Provider
      value={{
        userName: gameStatus.userName,
        balance: new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(gameStatus.balance),

        isLogin: gameStatus.isLogin,
        login,
        logout,
        addPoint,
        addSuperPoint,
        removePoint,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

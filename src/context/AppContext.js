import { createContext, useState, useEffect, useCallback } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [gameStatus, setGameStatus] = useState({
    balance: 99.99,
    isLogin: null,
    userName: "",
  });

  const [playerList, setplayerList] = useState([]);

  useEffect(() => {
    const geData = () => {
      let config = localStorage.getItem("config");
      let list = localStorage.getItem("playerList");
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
      if (list) {
        setplayerList(JSON.parse(list));
      } else {
        localStorage.setItem("playerList", JSON.stringify([]));
      }
    };
    geData();
  }, []);

  const login = (_userName) => {
    // let balance = gameStatus.balance;
    setGameStatus({
      ...gameStatus,
      userName: _userName,
      isLogin: true,
      balance: 99.99,
    });
    localStorage.setItem(
      "config",
      JSON.stringify({ balance: 99.99, userName: _userName })
    );
  };

  const logout = () => {
    setGameStatus({
      ...gameStatus,
      userName: "",
      isLogin: false,
      balance: 99.99,
    });
    localStorage.setItem("config", "");
  };

  const addPoint = (point) => {
    setGameStatus({
      ...gameStatus,
      balance: gameStatus.balance + point,
    });
  };

  const removePoint = () => {
    setGameStatus({
      ...gameStatus,
      balance: gameStatus.balance - 1,
    });
  };

  const endGame = () => {
    setplayerList([
      ...playerList,
      {
        id: playerList.length + 1,
        name: gameStatus.userName || "invitado",
        result: gameStatus.balance,
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      },
    ]);
  };

  const refreshStorageConfig = useCallback(() => {
    console.log();
    let { balance, userName } = gameStatus;
    localStorage.setItem("config", JSON.stringify({ balance, userName }));
  }, [gameStatus]);

  const refreshStoragePlayerList = useCallback(() => {
    localStorage.setItem("playerList", JSON.stringify(playerList));
  }, [playerList]);

  useEffect(() => {
    refreshStoragePlayerList();
  }, [playerList, refreshStoragePlayerList]);

  useEffect(() => {
    refreshStorageConfig();
  }, [gameStatus.balance, refreshStorageConfig]);

  return (
    <AppContext.Provider
      value={{
        userName: gameStatus.userName,
        balance: new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(gameStatus.balance),
        isLogin: gameStatus.isLogin,
        playerList,
        login,
        logout,
        addPoint,
        removePoint,
        endGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

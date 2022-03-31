import { createContext, useContext, useState } from 'react';
import { AppContextModel } from 'src/models/index';

interface AppWrapperProps {
  children: object;
}

const AppContext = createContext<AppContextModel>({});

export function AppWrapper({ children }: AppWrapperProps) {
  const [basketItems, setBasketItems] = useState([]);

  const sharedState = {
    basketItems,
    setBasketItems
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextModel {
  return useContext(AppContext);
}
import { Routes } from "./Routes";
import { AppContext, AppContextComponent } from "./store/appContext";

export const App = () => {
  const contextComponent = AppContextComponent();

  return (
    <AppContext.Provider value={contextComponent}>
      <Routes />
    </AppContext.Provider>
  );
};

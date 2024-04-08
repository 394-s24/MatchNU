import "./App.css";
import { UserContextProvider } from "./contexts/UserContext";
import Navigation from "./Navigation";

const App = () => {
  return (
    <UserContextProvider>
      <div className="App">
        <Navigation />
      </div>
    </UserContextProvider>
  );
};

export default App;

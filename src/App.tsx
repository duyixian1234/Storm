import Window from "./components/Window";
import { StormProvider } from "./vm";

function App() {
  return (
    <StormProvider>
      <div class="h-screen w-screen overflow-hidden bg-gray-50">
        <Window />
      </div>
    </StormProvider>
  );
}

export default App;

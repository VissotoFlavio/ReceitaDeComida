import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import AppNavigation from "./src/navigation";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigation />
    </>
  );
};

export default App;

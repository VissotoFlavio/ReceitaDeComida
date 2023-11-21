import { NativeWindStyleSheet } from "nativewind";
import AppNavigation from "./src/navigation";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const App = () => {
  return <AppNavigation />;
};

export default App;

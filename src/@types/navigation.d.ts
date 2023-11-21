import { RootStackParamList } from "../navigation";

declare global {
  namespace ReactNavigation {
    interface RootParaList extends RootStackParamList {}
  }
}

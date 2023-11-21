import { Text, View } from "react-native";
import { ScreenProps } from "../../navigation";

type Props = ScreenProps<"Home">;

export const HomeScreen: React.FC<Props> = (props): React.JSX.Element => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-5xl">Home Screen {props.route.params.name}</Text>
    </View>
  );
};

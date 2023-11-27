import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ScreenProps } from "../../navigation";

type Props = ScreenProps<"Welcome">;

export const WelcomeScreen: React.FC<Props> = (props): React.JSX.Element => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      ring1padding.value = withSpring(hp(5));
    }, 100);
    setTimeout(() => {
      ring2padding.value = withSpring(hp(5.5));
    }, 300);

    setTimeout(() => {
      props.navigation.navigate("Home", { name: "Flavio", idade: 50 });
    }, 1500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{
          padding: ring2padding,
        }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{
            padding: ring1padding,
          }}
        >
          <Image source={require("../../../assets/images/welcome.png")} style={{ height: hp(20), width: hp(20) }} />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest"
          style={{
            fontSize: hp(8),
          }}
        >
          Foody
        </Text>
        <Text
          className="font-bold text-white tracking-widest"
          style={{
            fontSize: hp(2.5),
          }}
        >
          Receitas que despertam memórias
        </Text>
      </View>
    </View>
  );
};

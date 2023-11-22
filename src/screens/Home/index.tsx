import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../../components/categories";
import { ScreenProps } from "../../navigation";

type Props = ScreenProps<"Home">;

export const HomeScreen: React.FC<Props> = (props): React.JSX.Element => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="space-y-6 pt-14" contentContainerStyle={{ paddingBottom: 50 }}>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require("../../../assets/images/avatar.png")} style={{ height: hp(5), width: hp(5.5) }} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greeting and punchline */}
        <View className="mx-4 space-y-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Bem vindo, {props.route.params.name}!
          </Text>
          <View>
            <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>
              Faça sua própria comida,
            </Text>
          </View>
          <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>
            fique em <Text className="text-amber-400">casa</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-2">
          <TextInput
            placeholder="Procure uma receita"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Categories*/}
        <View>
          <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </View>
      </ScrollView>
    </View>
  );
};

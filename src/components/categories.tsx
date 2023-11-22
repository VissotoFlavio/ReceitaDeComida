import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Category } from "../interfaces/response";

export type CategoryProps = {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Categories = (props: CategoryProps): React.JSX.Element => {
  const handlePressCategory = (index: string): void => {
    props.setActiveCategory(index);
  };

  return (
    <Animated.View entering={FadeInDown.duration(2000).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {props.categories.map((x: Category, index: number) => {
          const isActive = x.idCategory === props.activeCategory;
          const activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";

          return (
            <TouchableOpacity
              key={x.idCategory}
              className="flex items-center space-y-1"
              onPress={() => handlePressCategory(x.idCategory)}
            >
              <View
                className={"rounded-full p-1 " + activeButtonClass}
                //   style={{ height: hp(6), width: hp(6) }}
              >
                <Image
                  source={{
                    uri: x.strCategoryThumb,
                  }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {x.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

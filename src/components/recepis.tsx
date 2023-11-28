import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ImageCached from "../helpers/image-cached";
import { Meal } from "../interfaces/response";

export type RecipesProps = {
  recipes: Meal[];
};

const Recepis = (props: RecipesProps): React.JSX.Element => {
  return (
    <View className="mx-4 space-y-2">
      <Text
        className="font-semibold text-neutral-600"
        style={{
          fontSize: hp(4),
        }}
      >
        Recipes
      </Text>

      <View className="flex flex-row justify-between">
        <FlatList
          data={props.recipes}
          renderItem={({ item, index }) => {
            return <Recepi index={index} meal={item} />;
          }}
          keyExtractor={(item) => item.idMeal}
          scrollEnabled={false}
          numColumns={2}
        />
      </View>
    </View>
  );
};

type ItemMeal = {
  meal: Meal;
  index: number;
};

const Recepi = (item: ItemMeal): React.JSX.Element => {
  const isEven = item.index % 2 == 0;
  const alternativeHeight = item.index % 3 == 0;
  return (
    <Animated.View
      className="w-1/2"
      entering={FadeInDown.delay(item.index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        key={item.meal.idMeal}
        className="flex mb-4 space-y-1"
        style={{ flex: 0.5, paddingRight: isEven ? 8 : 0, paddingLeft: isEven ? 0 : 8 }}
      >
        <ImageCached
          uri={item.meal.strMealThumb}
          cacheTimeInSeconds={5}
          style={{
            width: "100%",
            height: hp(35),
          }}
          className="bg-black/5 rounded-3xl"
        />
        <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(2) }}>
          {item.meal.strMeal.length > 20 ? item.meal.strMeal.slice(0, 28) + "0..." : item.meal.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Recepis;

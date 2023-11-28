import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageProps } from "react-native";
import Animated from "react-native-reanimated";
import Loading from "../components/loading";
import "./../extensions";

export interface ImageCachedProps extends Omit<ImageProps, "source"> {
  uri: string;
  cacheTimeInSeconds?: number;
}

interface ImageCachedDetails {
  value: string;
  expireIn: Date;
}

const ImageCached = (props: ImageCachedProps) => {
  const [cachedSource, setCachedSorce] = useState<ImageCachedDetails | null>(null);

  useEffect(() => {
    getCacheImage();
  }, []);

  const getCacheImage = async () => {
    try {
      console.log("props", props);
      const cachedImageData = await getStorageImageDatails(props.uri);
      console.log("cachedImageData", cachedImageData);
      if (cachedSource) {
        setCachedSorce(cachedImageData);
      } else {
        const response = await fetch(props.uri);
        const imageBlob = await response.blob();
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onloadend = (e: ProgressEvent<FileReader>) => {
            resolve(e.target?.result as string);
          };
        });

        const newData = await addStorageImageDatails(props.uri, base64Data, props.cacheTimeInSeconds || 86400);
        setCachedSorce(newData);
      }
    } catch (error) {
      console.error("Error caching image: ", error);
    }
  };

  const getStorageImageDatails = async (uri: string): Promise<ImageCachedDetails | null> => {
    const cachedImageData = await AsyncStorage.getItem(props.uri);

    if (!cachedImageData) {
      return null;
    }

    const value = JSON.parse(cachedImageData) as ImageCachedDetails;

    if (new Date().getTime() <= new Date(value.expireIn).getTime()) {
      return value;
    } else {
      return null;
    }
  };

  const addStorageImageDatails = async (
    uri: string,
    base64Data: string,
    cacheTimeInSeconds: number
  ): Promise<ImageCachedDetails> => {
    const detailsData: ImageCachedDetails = {
      expireIn: new Date().addSeconds(cacheTimeInSeconds),
      value: base64Data,
    };

    const strDetails = JSON.stringify(detailsData);

    await AsyncStorage.setItem(uri, strDetails);

    return detailsData;
  };

  return (
    <>
      {!cachedSource ? (
        <Loading size="large" style={props.style} />
      ) : (
        <Animated.Image
          {...props}
          source={{
            uri: cachedSource ? cachedSource.value : "",
          }}
        />
      )}
    </>
  );
};

export default ImageCached;

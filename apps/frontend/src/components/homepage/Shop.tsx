import React, {useEffect, useState} from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Reservation from "@/src/models/entity/Reservation";
import {useRouter} from "expo-router";
import MessageResponse from "@/src/models/dto/MessageResponse";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";
import ShopItem from "@/src/models/entity/ShopItem";

import textStyles from "@/assets/styles/text";
import shadowStyles from "@/assets/styles/shadow";
import Loader from "@/src/components/loader/Loader";
import Input from "@/src/components/input/Input";

const Shop: React.FC = () => {
    const [shopItems, setShopItems] = useState<ShopItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const router = useRouter();

    const getAllShopItems = async () => {
        setLoading(true);

        let response: ShopItem[] | MessageResponse | ErrorResponse;
        try {
            response = await dataFetch<ShopItem[]>(`${process.env.EXPO_PUBLIC_API_URL}/api/shop-items`, "GET");
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred while fetching reservations.");
            return;
        }

        if (isResponseError(response)) {
            Alert.alert("Error", "An error occurred while fetching reservations.");
            setLoading(false);
            return;
        }

        setShopItems(response as ShopItem[]);
        setLoading(false);
    };

    useEffect(() => {
        getAllShopItems();
    }, []);


    return (
        <View style={styles.container}>
            <Input value={""} placeholder={"Pretraga..."} icon={"search"}></Input>
            {
                loading ? (
                    <Loader/>
                ) : shopItems && shopItems.length > 0 ?
                    shopItems.map((item) => {
                        const isHovered = hoveredId && hoveredId.toString() === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.item, isHovered ? {backgroundColor: '#d1c4e9'} : {}, shadowStyles.smallShadow]}
                            >
                                <Image source={item.image ? {uri: item.image} : require("@/assets/images/no-image.jpg")}
                                       style={styles.imageStyle}/>
                                <View style={styles.itemInfo}>
                                    <Text style={textStyles.headingSmall}>{item.name}</Text>
                                    <Text style={textStyles.headingSmallNoBold}>{item.price.toFixed(2)}€</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }) :
                    <Text style={textStyles.headingMedium}>No items available in the shop.</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        gap: 10
    },
    item: {
        borderRadius: 10,
        backgroundColor: "white",
    },
    itemInfo: {
        padding: 10,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "#F57E20",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "white",
        ...shadowStyles.smallShadow,
    },
    imageStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 170
    }
});

export default Shop;
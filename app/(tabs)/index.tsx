import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useRouter } from "expo-router";

export default function HomeScreen() {

    const router = useRouter();
    const { width } = Dimensions.get("window");
    const moveString = "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3";

    const styles = StyleSheet.create({
        body: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
        },
        titleContainer: {
            paddingVertical: 16,
            paddingHorizontal: 8,
            alignItems: "center",
            backgroundColor: "#F2F2F2",
            borderRadius: 8,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        stepContainer: {
            padding: 16,
            backgroundColor: "#FFF",
            borderRadius: 8,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        stepContainer2: {
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 16,
            backgroundColor: "#669999",
            borderRadius: 8,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,            
        },
        reactLogo: {
            height: 360,
            width: 360,
            top: 5,
            bottom: 0,
            left: 0,
        },
        logobackground: {
            alignItems: "center",
            height: 360,
            backgroundColor: "#EDEDBB",
            width: "100%"
        },
        detectedGameText: {
            fontSize: 16,
            fontWeight: "bold",  // Yazıyı kalınlaştırdık
            color: "#333",        // Metin rengi
        },
    });

    return (
        <View style={styles.body}>
            <View style={styles.logobackground}>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.reactLogo}
                />
            </View>
            <View style={styles.titleContainer}>
                <ThemedText type="title">Chess Simulation!</ThemedText>
            </View>
            <View style={styles.stepContainer2}>
                <Button
                    title="Take Photo"
                    onPress={() => {

                    }
                    }
                />
                <Button
                    title="Go Simulate"
                    onPress={() =>
                        router.push({
                            pathname: "/simulate",
                            params: { moves: moveString },
                        })
                    }
                />
            </View>
            <View style={styles.stepContainer}>
                <Text style={styles.detectedGameText}>Detected Game:  {moveString}</Text>
            </View>
        </View>
    );
}



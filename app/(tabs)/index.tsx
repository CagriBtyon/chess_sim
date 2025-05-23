import { ThemedText } from '@/components/ThemedText';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

    const router = useRouter();

    const [moveString, setMoveString] = useState("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Nb8 d4 Nbd7 c4 c6 Nc3 Qc7 Bg5 h6 Bh4 Re8 Rc1 Bf8 cxb5 axb5 Nxb5 Qb6 Nc3 exd4 Nxd4 Bb7 Nf5 Qb4 a3 Qa5 Ba2 d5 exd5 Rxe1+ Qxe1 cxd5 b4 Qxa3 Ra1 Qxb4 Rb1 Qa5 Rxb7 Bb4 Bxf6 Nxf6 Qe5 Re8 Qc7 Qxc7 Rxc7 Re1+ Kh2 Bxc3 Rxc3 Re2 Bb1 g6 Rc8+ Kg7 f3 Rb2 Bd3 Nh5 Rc2 Rb3 Bf1 Rb1 Bd3 Nf4 Ba6 d4 Kg3 d3 Rd2 g5 Bxd3 h5 Bc4 h4+ Kg4 Kg6 Bd5 f5#");

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

    const takePhoto = async () => {
        console.log("take photo");

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Kamera izni verilmedi');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled && result.assets.length > 0) {
            const photo = result.assets[0];
            console.log("Seçilen foto:", photo.uri);

            const formData = new FormData();
            formData.append('file', {
                uri: photo.uri,
                name: 'chess_photo.jpg',
                type: "image/jpeg",
            } as any);

            try {
                const response = await fetch("http://192.168.1.161:9999/analyze-chess", {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                console.log("API cevabı:", data);
                setMoveString(data.message);
            }
            catch (err) {
                console.error("Apı call", err);
            }
        }

    }

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
                        takePhoto();
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



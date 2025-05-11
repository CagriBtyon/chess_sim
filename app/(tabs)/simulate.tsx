import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Chess } from "chess.js";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import Chessboard from '../components/chessboard';


export default function TabTwoScreen() {

    const { moves } = useLocalSearchParams<{ moves: string }>();


    const [position, setPosition] = useState("start");
    const [currentMove, setCurrentMove] = useState(0);
    const [game, setGame] = useState(new Chess());

    const movesArray = moves?.split(/\s+/) ?? [];

    // useEffect(() => {
    //     console.log("Hamle dizisi:", movesArray);

    //     if (movesArray.length === 0) {
    //         console.warn("Hamle dizisi boş.");
    //         return;
    //     }

    //     const game = new Chess();
    //     let idx = 0;

    //     const interval = setInterval(() => {

    //         console.log(`Şu anki hamle: ${movesArray[idx]}`);
    //         const move = game.move(movesArray[idx]);

    //         if (move) {
    //             console.log("FEN Durumu:", game.fen());
    //             setPosition(game.fen());
    //             idx++;
    //         } else {
    //             console.warn(`Geçersiz hamle: ${movesArray[idx]}`);
    //             clearInterval(interval);
    //         }

    //         if (idx >= movesArray.length) {
    //             console.log("Tüm hamleler tamamlandı.");
    //             clearInterval(interval);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [moves]);

    useEffect(() => {
        setPosition(game.fen());
    }, [game]);

    const playNextMove = () => {
        if (currentMove < movesArray.length) {
            game.move(movesArray[currentMove]);
            setPosition(game.fen());
            setCurrentMove(currentMove + 1);
        }
    };

    useEffect(() => {
        console.log("FEN güncellendi:", position);
    }, [position]);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" , gap: 10}}>
            <Chessboard fen={position} />
        <TouchableOpacity style={styles.nextmovebutton} onPress={playNextMove}>
            <Text>{"Next Move"}</Text>
        </TouchableOpacity>
            {/* <Button title="Next Move" onPress={playNextMove} color={"#77bd89"} /> */}
            {/* <TextInput>
                {moves}
            </TextInput> */}
        </View>
    );
}

//  renderPiece={(piece: string) => {
//                 console.log("Render edilen parça:", piece, pieceImages[piece]);
//                 return (                
//                     <Image 
//                         source={pieceImages[piece]}
//                         resizeMode='contain'
//                         style={{width: 350/8, height: 350/8}}
//                     /> 
//                 )}               
//             }

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    nextmovebutton: {
        backgroundColor: "#77bd89",
        borderRadius: 5,
        padding: 5,
    }
});

import { Dimensions, StyleSheet, Text, View } from "react-native";

interface BaseProps {
    white: boolean;
}

interface RowProps extends BaseProps {
    row: number;
}

interface SquareProps extends RowProps {
    col: number;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
});

const WHITE = "rgb(100, 133, 68)";
const BLACK = "rgb(230, 233, 198)";

export const Square = ({ row, col, white }: SquareProps) => {
    const { width } = Dimensions.get("window");
    const squareSize = (width - 15) / 8;

    const backgroundColor = white ? WHITE : BLACK;
    return (
        <View
            style={{
                flex: 1,
                backgroundColor,
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            <Text style={{ opacity: col === 0 ? 1 : 0, position: "relative", left: -8, top: (squareSize / 2 - 9), fontSize: 15 }}>
                {8 - row}
            </Text>
            {(row === 7) &&
                <Text style={{ position: "relative", left: (squareSize / 2 - 4.5), top: 15 }}>
                    {String.fromCharCode(col + 97)}
                </Text>
            }
        </View>
    )
}

export const Row = ({ white, row }: RowProps) => {
    const offset = white ? 0 : 1;
    return (
        <View style={styles.container}>
            {new Array(8).fill(0).map((_, i) => (
                <Square key={`${row}-${i}`} row={row} col={i} white={(i + offset) % 2 === 1} />
            ))}
        </View>
    )
}
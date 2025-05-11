import { View } from "react-native";
import { Row } from "./row_column";


const BackGround = () => {
    return (
        <View style={{flex:1}}>
            {
                new Array(8).fill(0).map((_,i) => (
                    <Row key={i} white={i % 2 === 0} row={i} />
                ))
            }
        </View>
    )
}

export default BackGround;
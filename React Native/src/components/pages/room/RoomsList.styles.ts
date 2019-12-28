import {StyleSheet} from "react-native";
import {Colors} from "../../../styles/_colors";

export const styles = StyleSheet.create({
    roomContainer: {
        flex: 1,
        margin: 8
    },
    separator: {
        marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listItemSeparator
    },
    navigationItemsContainer: {
        flex: 1,
    },
    navigationItem: {
        flex: 1,
        fontSize: 20,
        margin: 14
    }
});

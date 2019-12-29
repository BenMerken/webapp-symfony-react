import {StyleSheet} from "react-native";
import {Colors} from "../../../styles/_colors";

export const styles = StyleSheet.create({
    separator: {
        marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listItemSeparator
    },
    ticketContainer: {
        margin: 8
    },
    headerRightContainer: {
        flex: 1,
        flexDirection: 'row'

    },
    navigationItem: {
        flex: 1,
        fontSize: 20,
        margin: 14
    }
});

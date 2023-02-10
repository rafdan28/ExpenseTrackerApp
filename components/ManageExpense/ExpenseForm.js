import Input from "./Input";
import {View, StyleSheet, Text} from "react-native";

function ExpenseForm(){
    function amountChangeHandler(){

    }

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInput} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: amountChangeHandler,
                }}/>

                <Input label="Date" textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: () => {}
                }}/>
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                // autoCorrect: false, //true di default
                // autoCapitalize: 'words', //sentences di default
            }}/>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop: 80
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    }
})
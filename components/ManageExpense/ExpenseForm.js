import Input from "./Input";
import {View, StyleSheet, Text} from "react-native";
import {useState} from "react";
import Button from "../UI/Button";

function ExpenseForm({submitButtonLabel, onCancel, onSubmit}){
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    });

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputValues((currInputValues) => {
            return{
                ...currInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }

    function submitHandler() {

    }

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInput} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'), //il valore verrà passato in automatico sull'attributo enteredValue
                    value: inputValues.amount
                }}/>

                <Input style={styles.rowInput} label="Date" textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'), //il valore verrà passato in automatico sull'attributo enteredValue
                    value: inputValues.date
                }}/>
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'), //il valore verrà passato in automatico sull'attributo enteredValue
                value: inputValues.description
                // autoCorrect: false, //true di default
                // autoCapitalize: 'words', //sentences di default
            }}/>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPressButton={onCancel}>Cancel</Button>
                <Button style={styles.button} onPressButton={submitHandler}>{submitButtonLabel}</Button>
            </View>
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
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})
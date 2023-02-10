import Input from "./Input";
import {View, StyleSheet, Text, Alert} from "react-native";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}){
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : ''
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
        const expenseData = {
            amount: +inputValues.amount, //il + permette di convertire la stringa in un numero
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.toString().trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert("Invalid input", "Please check your input values");
            return;
        }

        onSubmit(expenseData);
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
                // autoCapitalize: 'words', //sentences è di default
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
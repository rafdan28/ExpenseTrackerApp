import Input from "./Input";
import {View, StyleSheet, Text, Alert} from "react-native";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}){
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true  // defaultValues ? true : false
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputs((currInputs) => {
            return{
                ...currInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value, //il + permette di convertire la stringa in un numero
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            // Alert.alert("Invalid input", "Please check your input values");
            setInputs((currInputs) => {
                return{
                    amount: {value: currInputs.amount.value, isValid: amountIsValid},
                    date: {value: currInputs.date.value, isValid: dateIsValid},
                    description: {value: currInputs.description.value, isValid: descriptionIsValid}
                }
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInput} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'), //il valore verrà passato in automatico sull'attributo enteredValue
                    value: inputs.amount.value
                }}/>

                <Input style={styles.rowInput} label="Date" textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'), //il valore verrà passato in automatico sull'attributo enteredValue
                    value: inputs.date.value
                }}/>
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'), //il valore verrà passato in automatico sull'attributo enteredValue
                value: inputs.description.value
                // autoCorrect: false, //true di default
                // autoCapitalize: 'words', //sentences è di default
            }}/>
            {formIsInvalid && <Text> Invalid input values </Text>}
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
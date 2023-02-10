import Input from "./Input";
import {View} from "react-native";

function ExpenseForm(){
    function amountChangeHandler(){

    }

    return(
        <View>
            <Input label="Amount" textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountChangeHandler,
            }}/>

            <Input label="Date" textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: () => {}
            }}/>

            <Input label="Description" textInputConfig={{
                multiline: true,
                // autoCorrect: false, //true di default
                // autoCapitalize: 'words', //sentences di default
            }}/>
        </View>
    )
}

export default ExpenseForm;
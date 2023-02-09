import Input from "./Input";
import {View} from "react-native";

function ExpenseForm(){
    return(
        <View>
            <Input label="Amount"/>
            <Input label="Date"/>
            <Input label="Description"/>
        </View>
    )
}

export default ExpenseForm;
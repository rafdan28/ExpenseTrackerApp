import {Pressable, Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";

function Button({children, onPressButton, mode, style}){
    return(
        <View style={style}>
            <Pressable onPress={onPressButton} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Button;

const styles = StyleSheet.create({
   button: {
       borderRadius: 4,
       padding: 8,
       backgroundColor: GlobalStyles.colors.primary400
   },

   flat: {
       backgroundColor: 'trasparent'
   },

   buttonText: {
       color: 'white',
       textAlign: 'center'
   },

   flatText: {
       color: GlobalStyles.colors.primary200
   },

    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});
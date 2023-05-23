import { useState } from "react";
import { supabase } from "../lib/supabase";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        setErrorMessage('');
        if (email == '') {
            setErrorMessage("Email cannot be empty")
        } else if (!email.includes('@')) {
            setErrorMessage("Invalid email");
        } else if (password == '') {
            setErrorMessage("Password cannot be empty")
        } else {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setErrorMessage(error.message);
            }
        }
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.header }>Email</Text>
            <TextInput
                mode="outlined"
                autoCapitalize="none"
                textContentType="emailAddress"
                value={ email }
                onChangeText={ setEmail }
            />
            <Text style={ styles.header }>Password</Text>
            <TextInput
                mode="outlined"
                secureTextEntry
                autoCapitalize="none"
                textContentType="password"
                value={ password }
                onChangeText={ setPassword }
            />
            <Button style={ styles.button } textColor= 'blue' onPress={ handleRegister }>Sign up</Button>
            <Text style={ styles.error }>{ errorMessage }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    error: {
        color: 'red',
        marginBottom: 10 
    }, 
    header: {
        color: 'blue',
        fontSize: 20,
        fontWeight: 'semibold',
        marginTop: 10
    },
    button: {
        marginVertical: 10
    }
});

export default Register;
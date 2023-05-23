import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { supabase } from "../lib/supabase";
import { Link } from "expo-router";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        setErrorMessage('');

        if (email == '') {
            setErrorMessage("Email cannot be empty");
        } else if (!email.includes('@')) {
            setErrorMessage("Invalid email");
        } else if (password == '') {
            setErrorMessage("Password cannot be empty")
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
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
            <Button style={ styles.button } textColor="blue" onPress={ handleLogin }>Login</Button>
            <Text style={ styles.error }>{ errorMessage }</Text>

            <Link href="/register">
                <Text style={ styles.underline }>No account? Register here!</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    underline: {
        textDecorationLine: 'underline'
    },
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

export default Login;
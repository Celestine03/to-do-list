import { Pressable, Text, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

function Logout() {
    return (
        <Pressable style={ styles.container } onPress={ () => supabase.auth.signOut() }>
            <Text style={ styles.text }>Logout</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        color: 'blue',
    }
})

export default Logout;
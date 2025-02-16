import { Text, View, SafeAreaView, StyleSheet, TextInput, Pressable } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ScannedResult(){
    const params = useLocalSearchParams();
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

    const styles = createStyles(theme, colorScheme);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Search for items'
                    maxLength={30}
                    placeholderTextColor='#8793A6'
                />
                <Pressable onPress={() => router.push(`/`)}>
                    <MaterialCommunityIcons 
                        name="barcode-scan" 
                        size={24} 
                        color="white"
                        style={styles.button}
                    />
                </Pressable>
            </View>
            
            <View style={styles.resultContainer}>
                <Text style={styles.text}>
                    Scanned Barcode: {params.barcode ? params.barcode : "No barcode received"}
                </Text>
            </View>
        </SafeAreaView>
    );

}

function createStyles(theme, colorScheme){
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            padding: 10,
            width: '100%',
            marginHorizontal: 'auto',
            pointerEvents: 'auto',
        },
        input: {
            flex: 1,
            borderColor: '#696969',
            borderWidth: 2,
            borderRadius: 15,
            padding: 10,
            marginRight: 10,
            fontSize: 16,
            minWidth: 0,
            color: theme.text
        },
        resultContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            width: '100%',
            marginHorizontal: 'auto',
            pointerEvents: 'auto',
        },
        text: {
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 20,
            color: 'white',
        },
        button: {
            backgroundColor: '#FF784B',
            borderRadius: 15,
            padding: 10,
        }
    });
}
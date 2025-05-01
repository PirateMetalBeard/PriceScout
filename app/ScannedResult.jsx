import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import products from '@/products.json';
import pandaIcon from '@/pandaIcon.png';
import ninjaIcon from '@/ninjaIcon.png'; // Import the ninja icon

export default function ScannedResult() {
    const params = useLocalSearchParams();
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (params.barcode) {
            const foundProduct = products.find(p => p.barcode === params.barcode);
            setProduct(foundProduct);
        }
    }, [params.barcode]);

    const styles = createStyles(theme, colorScheme);

    return (
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
                {product ? (
                    <>
                        <Text style={styles.productName}>{product.name}</Text>
                        <View style={styles.priceContainer}>
                            <Image
                                source={pandaIcon}
                                style={styles.icon}
                            />
                            <Text style={styles.priceText}>{product.pandaPrice} ريال</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Image
                                source={ninjaIcon} // Use the ninja icon here
                                style={styles.icon}
                            />
                            <Text style={styles.priceText}>{product.ninjaPrice} ريال</Text>
                        </View>
                    </>
                ) : (
                    <Text style={styles.text}>
                        Scanned Barcode: {params.barcode ? params.barcode : "No barcode received"}
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background || '#1E1E1E', // Dark theme background
            padding: 16,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 15,
            padding: 8,
        },
        input: {
            flex: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            borderRadius: 12,
            padding: 12,
            marginRight: 12,
            fontSize: 16,
            color: theme.text || '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
        resultContainer: {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 20,
            padding: 20,
            width: '100%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        text: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.text || '#FFFFFF',
            textAlign: 'center',
        },
        productName: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#FFFFFF',
            textAlign: 'center',
            backgroundColor: '#4CAF50',
            padding: 12,
            borderRadius: 12,
            width: '80%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 2,
        },
        priceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            backgroundColor: '#4CAF50',
            padding: 12,
            borderRadius: 12,
            width: '80%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 2,
        },
        priceText: {
            fontSize: 20,
            fontWeight: '600',
            color: theme.text || '#FFFFFF',
            flex: 1,
            textAlign: 'right',
        },
        icon: {
            width: 28,
            height: 28,
            marginRight: 12,
        },
        button: {
            backgroundColor: '#4CAF50',
            borderRadius: 12,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 3,
        }
    });
}
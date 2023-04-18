import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const PointsList = () => {
    const points = useSelector((state) => state.points);
    const sortedPoints = points.sort((a, b) => b - a);
    return (
        <View style={styles.container}>
            {sortedPoints.map((point, index) => (
                <View
                    key={index}
                    style={[
                        styles.pointContainer,
                        index < 3 && { backgroundColor: '#ffd700' },
                    ]}
                >
                    <Text style={styles.scoreText}>For this user {index + 1}. score = {point}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pointContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PointsList;

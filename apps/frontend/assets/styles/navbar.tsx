import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#51A3A3',
        width: '100%',
        height: 75,
    },
    navbarIcon: {
        width: 60,
    },
    navbarIcons: {
        width: 120,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }
});

export default styles;
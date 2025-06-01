import React, {FC} from 'react';
import { View } from 'react-native';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    [key: string]: any;

}

const Icon: FC<IconProps> = ({ name, size = 24, color="white", ...props })=> {
    let IconComponent;

    switch (name) {
        case 'hidePassword':
            IconComponent = require('@/assets/images/icons/ts/HidePassword').default;
            break;
        case 'showPassword':
            IconComponent = require('@/assets/images/icons/ts/ShowPassword').default;
            break;
        case 'google':
            IconComponent = require('@/assets/images/icons/ts/Google').default;
            break;
        case 'notifications':
            IconComponent = require('@/assets/images/icons/ts/Notifications').default;
            break;
        case 'home':
            IconComponent = require('@/assets/images/icons/ts/Home').default;
            break;
        case 'robot':
            IconComponent = require('@/assets/images/icons/ts/Robot').default;
            break;
        case 'shoppingCart':
            IconComponent = require('@/assets/images/icons/ts/ShoppingCart').default;
            break;
        case 'trophy':
            IconComponent = require('@/assets/images/icons/ts/Trophy').default;
            break;
        case 'add':
            IconComponent = require('@/assets/images/icons/ts/Add').default;
            break;
        case 'juiceNavbarLogo':
            IconComponent = require('@/assets/images/icons/ts/JuiceNavbarLogo').default;
            break;
        case 'filter':
            IconComponent = require('@/assets/images/icons/ts/Filter').default;
            break;
        case 'search':
            IconComponent = require('@/assets/images/icons/ts/Search').default;
            break;
        default:
            return null;
    }

    return (
        <View>
            <IconComponent width={size} height={size} fill={color} {...props} />
        </View>
    );
};

export default Icon;
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
        case 'robotOrange':
            IconComponent = require('@/assets/images/icons/ts/RobotOrange').default;
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
        case 'arrowLeft':
            IconComponent = require('@/assets/images/icons/ts/ArrowLeft').default;
            break;
        case 'arrowRight':
            IconComponent = require('@/assets/images/icons/ts/ArrowRight').default;
            break;
        case 'arrowDown':
            IconComponent = require('@/assets/images/icons/ts/ArrowDown').default;
            break;
        case 'close':
            IconComponent = require('@/assets/images/icons/ts/Close').default;
            break;
        case 'logo':
            IconComponent = require('@/assets/images/icons/ts/Logo').default;
            break;
        case 'plus':
            IconComponent = require('@/assets/images/icons/ts/AddPlus').default;
            break;
        case 'creditCard':
            IconComponent = require('@/assets/images/icons/ts/CreditCard').default;
            break;
        case 'cash':
            IconComponent = require('@/assets/images/icons/ts/Cash').default;
            break;
        case 'creditCardSelected':
            IconComponent = require('@/assets/images/icons/ts/CreditCardSelected').default;
            break;
        case 'cashSelected':
            IconComponent = require('@/assets/images/icons/ts/CashSelected').default;
            break;
        case 'chat':
            IconComponent = require('@/assets/images/icons/ts/Chat').default;
            break;
        case 'personSearch':
            IconComponent = require('@/assets/images/icons/ts/PersonSearch').default;
            break;
        case 'juiceLogoOnAuthPages':
            IconComponent = require('@/assets/images/icons/ts/JuiceLogoOnAuthPages').default;
            break;
        case 'profileImagePicker':
            IconComponent = require('@/assets/images/icons/ts/ProfileImagePicker').default;
            break;
        case "crown":
            IconComponent = require('@/assets/images/icons/ts/Crown').default;
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
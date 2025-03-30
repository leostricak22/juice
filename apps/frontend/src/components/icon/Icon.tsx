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
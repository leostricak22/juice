import React, {FC} from 'react';
import { View } from 'react-native';
import HidePasswordIcon from '@/assets/images/icons/ts/HidePassword';
import ShowPasswordIcon from '@/assets/images/icons/ts/ShowPassword';

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
            IconComponent = HidePasswordIcon;
            break;
        case 'showPassword':
            IconComponent = ShowPasswordIcon;
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
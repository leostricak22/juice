import {View, Text, StyleSheet} from "react-native";
import {PropsWithChildren} from "react";

export default function Root({children}: PropsWithChildren) {
    return (
        <html>
            <head>
                <title>Juice</title>
            </head>
            <body>
                <div style={{backgroundColor: 'yellow'}}>
                    {children}
                </div>
            </body>
        </html>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
})
import {Button, Text, View} from "react-native";
import {useState} from "react";

type testResponse = {
    message: string;
}

type testDatabaseResponse = {
    id: string;
    title: string;
    body: string;
    date: string;
}

export default function Index() {
    const [data, setData] = useState<testResponse | testDatabaseResponse[] | null>(null);

    const handleBackendCheck = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/test`);

            if (!response.ok) {
                alert("Error while connecting to the backend!");
            }

            const data:testResponse = await response.json();
            setData(data);
        } catch (error) {
            alert("Error: " + error);
        }
    }

    const handleDatabaseCheck = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/test/db`);

            if (!response.ok) {
                alert("Error while connecting to the database!");
            }

            const data:testDatabaseResponse[] = await response.json();
            setData(data);
        } catch (error) {
            alert("Error: " + error);
        }
    }

    return (
        <View
          style={{
              height: "100%"
          }}
        >
            <View
                style={{
                    height: "50%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10
                }}>
                <Text>if you can see this, the frontend works</Text>
                <Text>backend url: {process.env.EXPO_PUBLIC_API_URL}</Text>
                <Button title={"Check backend"} onPress={handleBackendCheck} />
                <Button title={"Check database"} onPress={handleDatabaseCheck} />
            </View>
            <View
                style={{
                    height: "50%",
                    backgroundColor: "black",
                    }}
            >
                <Text style={{color:"white"}}>Data from the server:</Text>
                {
                    data && (
                        <>
                            <Text style={{color:"white"}}>{JSON.stringify(data)}</Text>
                        </>

                    )
                }
            </View>
        </View>
    );
}

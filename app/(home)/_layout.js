import { Tabs } from "expo-router";

function Home() {

    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "To do list"}} />
            <Tabs.Screen name="logout" />
        </Tabs>
    );
}

export default Home;
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "../../constants";

const TabIcon = ({icon, color, name, focused}) => {
    return(
        <View className="items-center justify-center gap-2">
            <Image
            source={icon}
            resizeMode="contain"           
            tintColor={color}
            className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold':
                'font-pregular'} text-xs`} style={{color:color}}
            >
            
                 {name}
            </Text>
        </View>
    );
};


const TabLayout = () => {
  return (
   <>
    <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor:'#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle:{
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
       }}
       >    
        <Tabs.Screen
            name="home"
            options={{
                title:"Home",
                headerShown: false,
            tabBarIcon:({color, focused}) => (
                <TabIcon
                    icon={icons.home}
                    color={color}
                    name="Anasayfa"
                    focused={focused}
                />
            
            ),
            }}
        />
        <Tabs.Screen
            name="order"
            options={{
                title:"Order",
                headerShown: false,
            tabBarIcon:({color, focused}) => (
                <TabIcon
                    icon={icons.shopping}
                    color={color}
                    name="Siparişlerim"
                    focused={focused}
                />
            
            ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title:"Profile",
                headerShown: false,
            tabBarIcon:({color, focused}) => (
                <TabIcon
                    icon={icons.user}
                    color={color}
                    name="Hesabım"
                    focused={focused}
                />
            
            ),
            }}
        />
        <Tabs.Screen
            name="communication"
            options={{
                title:"Communicaiton",
                headerShown: false,
            tabBarIcon:({color, focused}) => (
                <TabIcon
                    icon={icons.message}
                    color={color}
                    name="İletişim"
                    focused={focused}
                />
            
            ),
            }}
        />
        

    </Tabs>
   </>
  )
}

export default TabLayout
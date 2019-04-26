import Ionicons from '@expo/vector-icons'
import  { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import SignIn from './SignIn'
import SignUp from './SignUp'

const config = createBottomTabNavigator({
    Login: {screen: SignIn},
    Join: {screen: SignUp},
}, {
tabBarOptions: {
    activeTintColor:'#EF6C00',
    inactiveTintColor: 'gray'

},
navigationOptions: ({navigation}) => ({
    tabBarIcon: ({ focused, tintColor, horizontal }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Login') {
            iconName = `ios-contact${focused}`;
        } else if (routeName === 'Join') {
            iconName = `ios-add-circle${focused}`;
        }
        return <IconComponent name={iconName} size={20} color={tintColor} />;
     }
    }),
});

export default createAppContainer(config)

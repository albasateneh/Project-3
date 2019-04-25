import  { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import SignIn from './SignIn'
import SignUp from './SignUp'
// import Container from '../navigation/Navigation'

const config = createBottomTabNavigator({
    Login: {screen: SignIn},
    Join: {screen: SignUp},
    // Map: {screen: Container}
},
tabBarOptions= {
    activeTintColor:'tomato',
    inactiveTintColor: 'gray'
})

export default createAppContainer(config)

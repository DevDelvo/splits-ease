import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native'
import { SocialIcon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Video } from 'expo'
import { login } from '../store/user'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        const { manifest } = Expo.Constants
        const ip = manifest.packagerOpts.dev
            ? manifest.debuggerHost
                .split(`:`)
                .shift()
                .concat(`:1337`)
            : `localhost:1337`
        console.log('ip: ', ip)
    }

    handleLogin() {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(user)
    }

    async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: process.env.ANDROID_GOOGLE_CLIENT_ID,
                iosClientId: process.env.IOS_GOOGLE_CLIENT_ID,
                scopes: ['profile', 'email'],
            })
            if (result.type === 'success') {
                return result.accessToken
            } else {
                return { cancelled: true }
            }
        } catch (error) {
            return { error: true }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container} >
                <Video
                    source={require('../../assets/login.mp4')}
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.video}
                />
                <View style={styles.logoPaddingContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/splits-ease-logo.png')}
                        />
                    </View>
                </View>
                <View style={styles.paddingContainer}>
                    <View style={styles.formContainer}>
                        <FormLabel labelStyle={{ color: 'darkslategrey' }}>email</FormLabel>
                        <FormInput inputStyle={{ color: 'grey' }} autoCapitalize='none' onChangeText={email => this.setState({ email })} />
                        <FormLabel labelStyle={{ color: 'darkslategrey' }}>password</FormLabel>
                        <FormInput inputStyle={{ color: 'grey' }} autoCapitalize='none' secureTextEntry={true} onChangeText={password => this.setState({ password })} />
                        <View style={styles.buttonsContainer}>
                            <Button
                                buttonStyle={styles.logInBtn}
                                raised
                                icon={{ name: 'cached' }}
                                title='Login'
                                onPress={this.handleLogin}
                            />
                            <Button
                                raised
                                icon={{ name: 'account-circle' }}
                                title="Create Account"
                                buttonStyle={styles.createAccount}
                                onPress={() => this.props.navigation.navigate('CreateUserForm')} />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    logInBtn: {
        backgroundColor: '#3FA9F5'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    paddingContainer: {
        padding: 30
    },
    logoPaddingContainer: {
        paddingTop: 100,
        paddingRight: 130,
        paddingLeft: 130
    },
    formContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)'
    },
    buttonsContainer: {
        padding: 40
    },
    createAccount: {
        backgroundColor: 'darkgrey'
    },
    logo: {
        height: 100,
        width: 250
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: 30,
        justifyContent: 'center',
    },
    video: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user) => dispatch(login(user))
            .then((res) => {
                if (res) { ownProps.navigation.navigate('Home') }
            })
    }
}

export default connect(null, mapDispatchToProps)(Login)

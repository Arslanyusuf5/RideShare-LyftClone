import React, { useState,useRef } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text,TextInput,Button,Dimensions,TouchableHighlight,Pressable,Modal,TouchableOpacity } from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import bg from "../assets/images/bg.png";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Logo from "../assets/loginbg.png";
import PhoneInput from "react-native-phone-number-input";
import * as SecureStore from "expo-secure-store";
import OTPBG from "../assets/otpbg.png";




try {
	firebase.initializeApp({
		apiKey: "AIzaSyC-tsScYuvKuNwGFpFEBQhBft-FZBhzRww",
		authDomain: "carsharing2-d254d.firebaseapp.com",
		projectId: "carsharing2-d254d",
		storageBucket: "carsharing2-d254d.appspot.com",
		messagingSenderId: "450530782923",
		appId: "1:450530782923:web:43786c1b9a42666e40b54e",
		measurementId: "G-VVEWZZGFBT",
	});
} catch (err) {
	// ignore app already initialized error in snack
}
//  navigationOptions = ({ navigation }) => SetNavOptions('Topics', navigation)

const LoginScreen = (props) => {
	
  const { navigation, route } = props;
  const recaptchaVerifier = React.useRef(null);
	const [phoneNumber, setPhoneNumber] = React.useState();
	const [verificationId, setVerificationId] = React.useState();
	const [verificationCode, setVerificationCode] = React.useState();
	const [modalVisiable, setmodalVisiable] = useState(false)
const phoneInput = useRef(null);
	const firebaseConfig = firebase.apps.length
		? firebase.app().options
		: undefined;
	const [message, showMessage] = React.useState(
		!firebaseConfig || Platform.OS === "web"
			? {
					text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
			  }
			: undefined
	);
	



	return (
		<>
			<View style={styles.container}>
				<Image
					source={Logo}
					style={{ width: 300, height: 300, marginTop: 20 }}
				></Image>

				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={firebaseConfig}
				/>
				<View
					style={{
						flex: 1,
						backgroundColor: "#2153CC",
						width: android.width,
						borderTopLeftRadius: 30,
						borderTopRightRadius: 30,
						marginTop: 50,
					}}
				>
					<Text
						style={{
							marginTop: 40,
							marginLeft: 10,
							marginBottom: 10,
							color: "#ffff",
							fontSize: 18,
							fontWeight: "bold",
						}}
					>
						Enter phone number
					</Text>
					<PhoneInput
						containerStyle={{
							width: android.width,
							borderRadius: 90,
						}}
						textContainerStyle={{ borderRadius: 90 }}
						ref={phoneInput}
						defaultValue={phoneNumber}
						defaultCode="PK"
						layout="first"
						withShadow
						autoFocus
						onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
						onChangeFormattedText={(text) => {
							setPhoneNumber(text);
						}}
					/>

					<Pressable
						onPress={async () => {
							
							try {
								const phoneProvider = new firebase.auth.PhoneAuthProvider();
								await phoneProvider
									.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
									.then(setVerificationId);
							
								setmodalVisiable(true);
							} catch (err) {
								showMessage({
									text: `Error: ${err.message}`,
									color: "red",
								});
							}
						}}
					>
						<View style={styles.button}>
							<Text style={{ color: "#2153CC", fontWeight: "bold" }}>
								Get OTP
							</Text>
						</View>
					</Pressable>
				</View>
				<Modal animationType="slide" visible={modalVisiable}>
					<View style={styles.container}>
						<View style={styles.container}>
							<View
								style={{
									flexDirection: "column",
									alignItems: "center",
									marginTop: 50,
								}}
							>
								<Pressable onPress={()=>{
									setmodalVisiable(false)
								}}>
									<Text>close</Text>
								</Pressable>

								<Text
									style={{
										marginStart: 10,
										color: "#fff",
										fontSize: 36,
										fontWeight: "bold",
										backgroundColor: "#2153CC",
										padding: 15,
										borderRadius: 15,
									}}
								>
									Enter OTP code
								</Text>
								<Image
									source={OTPBG}
									style={{ width: 250, height: 250, marginTop: 10 }}
								></Image>
								<Text
									style={{ color: "#2153CC", fontWeight: "bold", fontSize: 12 }}
								>
									We have sent a verification code to your mobile
								</Text>

								<TextInput
									label=" Enter OTP"
									style={styles.input}
									// editable={!!verificationId}
									placeholder="123456"
									onChangeText={setVerificationCode}
									keyboardType="phone-pad"
									textColor="#ffff"
									selectionColor="#ffff"
								/>
								<TouchableHighlight
									onPress={async () => {
										try {
											// setVerificationId=props.id
											const credential =
												firebase.auth.PhoneAuthProvider.credential(
													verificationId,
													verificationCode
												);
											await firebase.auth().signInWithCredential(credential);
											console.log(verificationId);
											await SecureStore.setItemAsync("PhoneNum", phoneNumber);

											navigation.navigate("UserRegistration", {
												Phone: phoneNumber,
											});
											setmodalVisiable(false)
										} catch (err) {
											console.log(err);
										}
									}}
								>
									<View style={styles.button2}>
										<Text style={{ color: "#fff", fontWeight: "bold" }}>
											Submit
										</Text>
									</View>
								</TouchableHighlight>
							</View>
							{message ? (
								<TouchableOpacity
									style={[
										StyleSheet.absoluteFill,
										{ backgroundColor: 0xffffffee, justifyContent: "center" },
									]}
									onPress={() => showMessage(undefined)}
								>
									<Text
										style={{
											color: message.color || "blue",
											fontSize: 17,
											textAlign: "center",
											margin: 20,
										}}
									>
										{message.text}
									</Text>
								</TouchableOpacity>
							) : undefined}
						</View>
					</View>
				</Modal>
			</View>
		</>
	);
};
const android = Dimensions.get("window");
const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: android.width,
		height: android.height * 1.5,

		alignItems: "center",
	},
	image: {
		flex: 1,
	},
	image_imageStyle: {},
	welcomeTo: {
		color: "rgba(6,66,136,1)",
		fontSize: 32,

		height: 38,
		marginTop: 89,
		alignSelf: "center",
	},
	image2: {
		width: 195,
		height: 172,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#fff",

		padding: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,

		width: android.width * 0.94,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderTopRightRadius: 20,

		marginTop: 60,
	},
	button2: {
		alignItems: "center",
		backgroundColor: "rgba(6,66,136,1)",

		padding: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,

		width: android.width * 0.94,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderTopRightRadius: 20,

		marginTop: 60,
	},
	borderStyleBase: {
		width: 30,
		height: 45,
	},

	borderStyleHighLighted: {
		borderColor: "#03DAC6",
	},

	underlineStyleBase: {
		width: 30,
		height: 45,
		borderWidth: 0,
		borderBottomWidth: 1,
	},

	underlineStyleHighLighted: {
		borderColor: "#03DAC6",
	},
	input: {
		marginTop: 50,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		width: android.width * 0.94,
		height: 60,
		borderTopRightRadius: 20,
		borderColor:"#000fff",
		textAlign:'center',
		backgroundColor:"#000fff32"
	},
});

export default LoginScreen;
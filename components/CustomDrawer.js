import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet, Pressable,TouchableHighlight } from "react-native";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import Colors from "../assets/constants/Colors";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, get, onValue, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import DriversCards from "./DriversCards";
import * as SecureStore from "expo-secure-store";
import Reviews from "./Reviews";
import { Image } from "react-native";

const firebaseConfig = {
	apiKey: "AIzaSyC-tsScYuvKuNwGFpFEBQhBft-FZBhzRww",
	authDomain: "carsharing2-d254d.firebaseapp.com",
	projectId: "carsharing2-d254d",
	storageBucket: "carsharing2-d254d.appspot.com",
	messagingSenderId: "450530782923",
	appId: "1:450530782923:web:43786c1b9a42666e40b54e",
	measurementId: "G-VVEWZZGFBT",
};
const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);
const CustomDrawer = (props) => {
	const [UserName, setUserName] = useState("")
	const [UserPic, setUserPic] = useState("");
	useEffect(() => {
		const fetch= async()=>{
			let result = await SecureStore.getItemAsync("PhoneNum");
			const db = getDatabase();
			onValue(ref(db, `users/${result}`), (querySnapShot) => {
				let data = querySnapShot.val() || {};
				console.log(data.Profilepic);
				setUserName(data.Fullname);
				setUserPic(data.Profilepic);
			});

		}
		fetch()
		
	 
	}, [])
	
	const { navigation, route } = props;
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.blackContainer}>
				<View
					style={{
						marginBottom: 30,
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<View style={styles.userIconContainer}>
						<Image source={{uri:UserPic}}  />
					</View>
					<View>
						<Text style={styles.nameText}>{UserName}</Text>
						<View style={styles.flexRow}>
							
						</View>
					</View>
				</View>

				
			</View>
			<DrawerItemList {...props} />
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-end",
					marginTop: "110%",
					marginLeft: 10,
				}}
			>
				<TouchableHighlight
					onPress={() => {
						navigation.navigate("DriverReg");
					}}
				>
					<Text style={styles.button}>Driver Mode</Text>
				</TouchableHighlight>
			</View>
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	blackContainer: {
		backgroundColor: "#1F4690",
		padding: 15,
		marginBottom: 20,
	},
	userIconContainer: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: Colors.mediumGrey,
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	nameText: {
		fontSize: 22,
		color: Colors.white,
		marginBottom: 4,
	},
	ratingText: {
		color: Colors.mediumGrey,
		marginRight: 4,
	},
	borderContainer: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.darkGrey,
	},
	flexRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	circle: {
		width: 8,
		height: 8,
		borderRadius: 50,
		backgroundColor: Colors.lightBlue,
		marginLeft: 15,
	},
	textBold: {
		color: Colors.white,
		fontWeight: "600",
		paddingVertical: 15,
	},
	text: {
		color: Colors.white,
		paddingVertical: 5,
	},
	textGrey: {
		color: Colors.darkGrey,
		paddingVertical: 5,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#fcc200",
		color: "white",
		padding: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,


		
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderTopRightRadius: 20,

		
	},
});

export default CustomDrawer;

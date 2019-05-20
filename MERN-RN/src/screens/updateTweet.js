import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import { Button, DefaultTheme } from 'react-native-paper';

import { whiteColor, blueColor } from '../config/colors';
import { tweetChange, createTweetAction } from '../actions/auth.actions';

class UpdateTweet extends Component {
	static navigationOptions = {
		title: 'Update',
		headerVisible: true
	};


    state = { 
        tweet: '',
        id: '',
        alltweets: {}
    }
	addTweet = () => {
		if (this.props.tweet !== '') {
			this.props.createTweetAction({ user: 'user', tweet: this.props.tweet });
			this.props.navigation.navigate('newsFeed');
		}
    };
   
    
    componentWillMount() {
        const data = this.props.navigation.getParam('tweetId');
        const tweets = this.props.navigation.getParam('allTweets');
  
        const savedTweet = tweets.filter(item => item._id === data.id)
        const obj = savedTweet[0];



        this.setState({
            id: data.id,
            allTweets: obj
  
        })
    }
	
	
	handleUpdate = () => {

	}

	

	render() {
        const { navigation } = this.props;
        const { container, inputContainer, buttonContainer, button } = styles;
        console.log('this is the alltweets ========> ',this.state.allTweets)

		return (
			<ScrollView
				style={{ backgroundColor: whiteColor }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="always"
			>
				<View style={container}>
					<TouchableWithoutFeedback onPress={() => this.input.focus()}>
						<View style={inputContainer}>
							<TextInput
								value={this.state.allTweets.tweet}
								autoFocus
								placeholderTextColor="#888"
								placeholder="update your tweet.."
								underlineColorAndroid="transparent"
								multiline
							/>
						</View>
					</TouchableWithoutFeedback>
					<View style={buttonContainer}>
						<Button
							color={blueColor}
							theme={{ ...DefaultTheme, roundness: 100 }}
							style={button}
							onPress={this.handleUpdate}
							raised
						>
							update
						</Button>
					</View>
				</View>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	button: {
		width: 100
	},
	buttonContainer: {
		alignItems: 'center',
		paddingTop: 15
	},
	// textInput: {},
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: whiteColor
	},
	inputContainer: {
		minHeight: 150,
		backgroundColor: '#eee',
		borderRadius: 10,
		padding: 10
	},
	text: {
		fontSize: 22,
		fontWeight: 'bold'
	}
});

const mapStateToProp = state => {
	const { tweet } = state.auth;
	return { tweet };
};

export default connect(
	mapStateToProp,
	{ tweetChange, createTweetAction }
)(UpdateTweet);

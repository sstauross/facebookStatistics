# Facebook Statistics
This software is a tool used to connect with facebook in order to get the people names along with their facebook profile url who have liked or commented to a specific post in a page.
### Usage 
In order to use the tool the following steps should be followed:
1. Create a new application using your facebook account (https://developers.facebook.com/apps)
2. Rename the **config.sample.js** file to **config.js** and configure the following variables:
2.1 Specify the `clientID` and `clientSecret` in the **config.js** file created specifing the values of your facebook app
2.2 Specify the `pageId` of the targeted facebook page (use http://findmyfbid.com/) Note: you should be admin of the page
2.3 Specify the `postId` of the targeted post of the page (use http://findpostid.com/)
3. Start the application running: `$ npm start` to your console
4. Go to the specified url to your browser (http://localhost:8080)
5. Connect to facebook using the button in the page
6. Switch to the console and...
7. Whola! The names and profile urls are shown.
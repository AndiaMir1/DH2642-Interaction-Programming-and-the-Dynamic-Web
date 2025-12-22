Our Project: 
Here Comes The Song is a web application that provides real-time song suggestions by analyzing the user's current local weather conditions. It aims to create the perfect contextual listening experience, pairing a Rainy Day Chill playlist on a rainy day, or an Upbeat Energy selection on a sunny day. The app also supports adding friends and seeing their accounts along with their updates including created playlists, current city, a bio and more! 

The 3rd party component that the group used is a pop-up used both when clicking on export liked songs to playlist and when clicking sign out. This code, alongside improvements, can be found in the popUp.css file. 

How to use the app:
Create an account using a unique username, an email and a password. 

The web app will direct you to the home page where you will see two different views, the weather view as well as the users liked songs. Since the user has just been created it must add a city in their profile to fetch weather data from the weather API and log in to Spotify. The log in to Spotify is a button available if the user scrolls down a bit on home page. Once the user has done all of this it is possible to get songs based on the current weather of the location the user set in profile. The suggested songs will appear below where the user signed in to Spotify. The songs can be previewed and liked, which will save them to the users liked songs. The liked songs list can then be exported to Spotify directly. Once a playlist has been created the user can continue to add new liked songs to that playlist, it will appear as a suggestion when clicking on export liked songs to playlist again. 

The user can also update the profile by adding a bio, a favorite genre and other information to share on the social media web app. This will be visible for other users when they start following, befriend the user or when looking at the users bio. There is also a feed present where users can see their followings updates, when they can liked a song, updated their profile and more!

There is also a way to compare playlists with friends, seeing how similar their playlists are based on the weather etc. Simply go to the compare view, choose a friend, choose which profile of your own and your friends to compare and click on the Compare playlists button. This will generate a Similarity score in %. 

The user can then log out, the information will be persisted in firebase per user. All the information and updates that was there when logging out will also be available when the user decides to log in again. 

TRICKS: 
Add "Melissa" or "Sanna" as a friend to see the friends profile, their updates will be visible immediately in feed. Compare playlists with them and also check out their produced playlists!

Project file structure:
src, main source code for the application.
.firebase, configuration files for the Firebase hosting.
Presenters, presenter files, the middle layer between the data and the UI.
Views, renders the UI.
apiConfig, configuration and set up files for accessing the api services.
Images, static image asset.

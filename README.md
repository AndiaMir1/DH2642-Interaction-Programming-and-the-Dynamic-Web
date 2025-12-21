# Here Comes The Song

A weather-based music discovery app tailored to your environment. This application generates song recommendations based on your local weather conditions, allowing you to explore tracks, save your favorites, and seamlessly export your liked songs directly to a Spotify playlist.




## 📝 Short Description

* **Presenters:** This folder contains all the presenters currently in the project. They handle the logic and mediate between the Model and the Views.
* **Views:** This folder contains all the views as well as the pages for routing.
* **Configuration:** The config files (in `apiConfig`) handle API KEYS and configuration.
* **Models & Source:** Model files represent the state/data, while source files handle API calls and methods.
* **Core Files:**
    * `globals.css`: The main CSS file.
    * `layout.js`: Contains the initial structure of all the files.
    * `loading.jsx`: Rendered while data is fetched and the page is processing.
    * `page.jsx`: The homepage entry point.

## 📂 Project Structure

```text
└── src/
    ├── apiConfig/                 
    │   └── (apiConfig files)
    ├── models/                    
    │   ├── appModel.js
    │   ├── fireStoreModel.js
    │   └── mobxReactiveModel.jsx
    ├── presenters/                
    │   ├── CallbackPresenter.jsx
    │   ├── aboutUsPresenter.jsx
    │   ├── authPresenter.jsx
    │   ├── comparePlaylistsPresenter.jsx
    │   ├── feedPresenter.jsx
    │   ├── friendsPresenter.jsx
    │   ├── friendsProfilePresenter.jsx
    │   ├── homePresenter.jsx
    │   ├── profilePresenter.jsx
    │   └── signOutPresenter.jsx
    ├── style/                     
    │   ├── authView.css
    │   ├── comparePlaylistsView.css
    │   ├── dashboard.css
    │   ├── feed.css
    │   ├── friendsListView.css
    │   ├── friendsProfile.css
    │   ├── homePage.css
    │   ├── homePageLayoutView.css
    │   ├── mainPageView.css
    │   ├── navigationBarView.css
    │   ├── popUp.css
    │   ├── profileView.css
    │   ├── recommendedSongsView.css
    │   ├── signOutView.css
    │   ├── suspenseView.css
    │   ├── variables.css
    │   ├── weatherView.css
    │   └── weatherWidget.css
    ├── utils/                     
    │   ├── authUtils.js
    │   ├── firebaseUtil.js
    │   ├── viewHandlers.js
    │   └── weatherUtils.js
    ├── views/                     
    │   ├── CallbackView.jsx
    │   ├── ReactRoot.jsx
    │   ├── RecommendedSongsView.jsx
    │   ├── aboutUsView.jsx
    │   ├── authView.jsx
    │   ├── comparePlaylistsView.jsx
    │   ├── feedView.jsx
    │   ├── friendsListView.jsx
    │   ├── friendsProfileView.jsx
    │   ├── getSongsView.jsx
    │   ├── homeLayoutView.jsx
    │   ├── mainPageView.jsx
    │   ├── navigationBarView.jsx
    │   ├── playlistView.jsx
    │   ├── profileView.jsx
    │   ├── suspenseView.jsx
    │   └── weatherView.jsx
    ├── images.jsx                 
    ├── index.jsx                  
    ├── layout.js                  
    ├── loading.jsx                
    ├── page.jsx                   
    └── resolvePromise.js

🛠 Setup
To run this project, **Node.js** is required.

1. Install dependencies
```bash
npm install

2. Run project
npm run dev

3. Deploy project
firebase deploy

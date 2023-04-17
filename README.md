## Frontend Repo : https://github.com/prakhart111/puzzle-app-frontend 
## Backend Repo: https://github.com/prakhart111/puzzle-app-backend
# Game Specifications
- 6 Levels
- Correct answer = +10
- Wrong Answer = -5 * levelNumber
- You lose if your score gets negative
- You win if all answers are correct.
- ADMIN EMAIL : 200104078@hbtu.ac.in
- ADMIN EMAIL is also set as correct answer for all LEVELS, which will help viewers to quickly go through entire game.
- Figma Design File : https://www.figma.com/file/5t0Jcb8D04CrQaw1KjDaKl/Puzzle?node-id=0%3A1&t=Xa2584HClxUFuv3w-1

# Technical Specifications 
- Frontend made with ReactJS.
- TailwindCSS is used.
- Mobile Responsive
- Backend Made with NodeJs and Express
- MongoDB is used

# Soft Skills accessed
- Memory ( at LEVEL-1 , LEVEL-3 , LEVEL-4 )
- Attention to detail & Problem Solving ( at LEVEL-2 , LEVEL-5 )
- Curiosity ( at LEVEL-6 )
- Perseverance ( the less time user takes to complete game )

# Feature
- Login & SignUP
- JWT Token based authentication
- Cookie is sent to client, that helps in autologin and next request authentication
- Auto Login
- User Data is stored in MongoDB Atlas
- If refreshed, game will start where you left it.
- Admin Dashboard
- Protected routes for user and admin

# Additional
- User Leaderboard
- User Analytics ( time and score being saved )

# User Data
- name
- email
- password ( hashed using bcryptJS for more security )
- avatar selected by user
- high score of user
- previous game data of user that helps us resume game.

## Deployment
- The deployed version faced some issues related to set-cookie not being saved, although it all works perfectly on localHost.
- Several Screenshots have been attached below.


## Auto Login using saved Cookie
![Screenshot (15)](https://user-images.githubusercontent.com/86708181/232351243-9ecd153f-cf96-466d-8958-c47a6b9a3b26.png)

## Game Play- LEVEL-1
![Screenshot (16)](https://user-images.githubusercontent.com/86708181/232351272-2feb28a6-241a-4d99-b890-0bf423b05619.png)

## User Leaderboard
![Screenshot (17)](https://user-images.githubusercontent.com/86708181/232351468-65f746ce-b4d3-4a37-a016-19b865baae34.png)

## User Home - Mobile View
![image](https://user-images.githubusercontent.com/86708181/232351605-f74ab20d-e3e7-43b3-87bb-0c5594e039ec.png)

## Admin Login
![image](https://user-images.githubusercontent.com/86708181/232351875-73af1b06-498c-4b5d-a651-0eb89010901e.png)

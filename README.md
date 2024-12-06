# Startup
Welcome to my startup. I will soon be a billionaire i swear  
## Notes
[Here](https://github.com/bradencwatkins/startup/blob/main/notes.md) is a link to all of the notes I have/will take regarding this project.  

# MARRYABOOK  
## Intro to the Site  
Are you a returned missionary who is sick of not being able to find the one?  
Were you used to using Area Book on your mission and wish there was a dating equivelant?  
  
**MarryaBook** is for you!! (name subject to change)  
  
The website works in a way similar to other dating sites/apps, but with a key improevment...   
MarryaBook uses your friends and friends of friends to find your future wife. After linking your social media, Marryabook will give you suggestions on who to go on dates with.  
  
Other features:  
  -Calendar to help you plan times for dates  
  -Gives you date ideas  
  -Referral feature (connect with friends using social media to increase your dating pool “area expansion”)  
  -Page with advice from prophets and apostles on dating and marriage  
  
[Here](https://drive.google.com/file/d/1Eb0WA7tvIowid-mEEZiHedwYJ79e5i2W/view?usp=sharing) is an example of what the website home page might look like  

## Technologies  
Here is an example of how each technology might be represented in this website:  
  
**HTML:** HTML that gives an effective structure for the web pages.  
**CSS:** Makes the website look presentable and appealing. Good pictures, style, and design.  
**JavaScript:** Provide Login, account, page naigation, matching, buttons.  
**React:** Used to make effective UI and components.  
**Web Service:** Used for functionality of components, including:  
 -Being able to match with others  
 -Displaying pictures of potential matches  
 -Retrieving matches  
**Authentication:** Used to make the account users will make.  
**Database Data:** Stores account data, including matches and chats.  
**WebSocket Data:** Used to allow matching and chatting with dates  

## WEBSITE LAUNCH  
The website has been launched with 6 pages including:  
Home, find matches, account, advice, messaging, and about. It is only barebone HTML but its nice to start seeing at least some  
resemblance of a website. Very cool.  

## HTML deliverable  
**HTML pages** - six pages that represent all of the functionality of the website  
**Links** - Each page has links to each other page, and there is a link to this repository page  
**Text** - There is text showing all information you need, like account, different mathches, prophetic advise, etc...  
**Images** - There are a few placeholder/index page pictures to make stuff look nice  
**Login** - There are input text and boxes for login, as well as a dedicated page with name display
**Websocket** - The message page represents real time messaging  
**Database** - Messages and matches show a database storage  


## CSS deliverable  
**Design** - There is a consistent header, footer, and main body for each page  
**Navigation** - I moved the menu to the right side, and added a static log on top left  
**Resizing** - Added functionality to each resize scale, hope I found them all  
**Color scheme** - Attempted to add a color theme to the whole website in order for it to look better  
**Images** - Added a few new images to make the home screen and about screens look better  
**Buttons** - Styled the buttons with outline and certain text to make them pop  
**Consistency** - Made each page look similar to help ease of access  
**Text** - Applied consistent font and font sizing  

## REACT
Project Rubric for MarryaBook Voting App
Components:

Login Component: Handles user authentication and navigation. Upon successful login, users are redirected to the voting page.
Voting List Component: Displays a list of movie options that users can vote on.
Vote Component: Lets the user cast their vote and shows real-time updates of the voting count.
Mocked Data: Currently, login, vote submission, and voting count retrieval are mocked. This is set to be replaced with real database interactions and WebSocket integration later.
Login:

The login system authenticates the user. Once logged in, users are automatically redirected to the voting page, either by pressing Enter or clicking the login button.
The user credentials are stored temporarily in localStorage for simplicity, but this will be moved to a more secure database in the future.
Database (Temporary Solution):

The voting counts are currently stored and retrieved from localStorage. The system will be updated to use a real database to persist vote data and allow for secure, scalable storage.
WebSocket:

Currently, a mock setInterval function simulates periodic updates to the voting counts, mimicking WebSocket behavior. This mock function randomly increases the vote count for a selected option.
In the future, this will be replaced by a WebSocket connection, allowing the system to receive real-time updates from the server whenever votes are cast or modified.
Application Logic:

The ranking of movie options is dynamically updated based on user votes. After each vote, the system reorders the list to reflect the updated vote counts.
The highlight (e.g., the most voted option) and ranking numbers change based on the user's selections and the vote count updates.
Router:

The app uses React Router to enable smooth navigation between the login page and the voting page.
The routing system ensures that only authenticated users can access the voting page, while unauthenticated users are redirected to the login page.
Hooks:

React's useState hook is used to manage state throughout the app, such as tracking the user's authentication state, voting options, and the results of votes.
Unlike Vue, which uses class properties, React uses functional components with hooks to manage the component's state, providing a more declarative approach to state changes.
Future Enhancements:

Database Integration: Transition from localStorage to a proper database system (such as Firebase, MongoDB, or SQL) to store user data and vote counts securely.
WebSocket Integration: Replace the mock setInterval function with actual WebSocket messages to ensure real-time updates of votes and rankings.
Authentication System: Improve the login system by integrating with a backend service for secure authentication (using JWT tokens, OAuth, etc.).

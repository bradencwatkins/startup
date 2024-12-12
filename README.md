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

## REACT deliverable  
**Vite** - Bundled and Compiled with Vite  
**Components** - all components mock functionality, including:  
**Login** - Login stores authenticates the user, and brings user to the vote page  
**Database** - Local storage stores votes and percentages, will be replaced later  
**WebSocket** - Currently local storage updates votes when user presses on them, will be replaced by websocket later  
**Application Logic** - Updates votes dynamically based on when the user votes on the results page  
**Router** - Routes between different pages  
**Hooks** - Hooks are used to manage authentication state, voter options, and results.  

## SERVICE deliverable  
**HTTP Node.js & Express** - includes express server and node.js  
**Frontend Express static Middleware** - included  
**Frontend calls third party service** - Dad joke APIs, dont judge the jokes  
**Backend service endpoints** - many examples of POST ans GET service endpoints  
**Frontend service endpoints** - functions call GET and POST from backend using fetch  

## LOGIN deliverable  
**New User Registration** - It creates users and stores them to mongo, but login is broken
**User Authentication** - It wouldn't seem to work  
**Stores data in MongoDB** - It did this well  
**Retrieves credentials from Mongo** - It stored and retrieved, I just couldn't apply
**Restricts functionality on authentication** - This worked, Vote and Results wouldnt display unless logged in  

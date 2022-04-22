# AI Human Webapp

## Running the app
In the aihuman_webapp:
1. sudo systemctl start mongod
2. npm start
3. npm run dev

Runs on localhost:3000

In the artemis-widget:
npm start

Runs on localhost:1234

Generate and view chatbot:

* Login/Sign up to the aihuman app using Google.
* Go to localhost:3000/chatbots.
* Click on create new chatbot.
* Click on the new chatbot generated to go to its edit page.
* Add questions to it using the button "Add Question".
* Click on Generate Chatbot and wait till success notfication. This will generate the videos for the bot which will also be visible in the question editing modal now.
* Go to localhost:1234 and click on the chat icon in bottom right.
* Start answering the questions (video and the textual question would be present).
* Submit the form and view your answers in the chatbotanswers collection in the database.

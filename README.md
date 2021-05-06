# Twitch Chess Chatbot

This runs with my personal Twitch channel and my personal Twitch bot. Change it in the .env setting to work with yours. 
You might be able to try it yourself by visiting this [webpage](https://interactive-twtch-chess-bot.glitch.me) and my [Twitch channel](https://twitch.tv/snowing_in_july).

## Chatbot Overview

Twitch offers an Internet Relay Chat (IRC) interface for chat functionality. Chatbots allow you to programmatically interact with a Twitch chat feed using IRC standards; the bot connects to the Twitch IRC network as a client to perform these actions.This guide presents an easy bot example to get you started.

## Website Overview

The webpage is built with node.js and uses chessboard.js for display and chess.js for move validation. It also uses socket.io to send some of the messages. 

### Get Environment Variables

To start, you’ll need three environment variables:

| _Variable_     | _Description_                                                                                                                                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BOT_USERNAME` | The account (username) that the chatbot uses to send chat messages. This can be your Twitch account. Alternately, many developers choose to create a second Twitch account for their bot, so it's clear from whom the messages originate.                                                 |
| `CHANNEL_NAME` | The Twitch channel name where you want to run the bot. Usually this is your main Twitch account.                                                                                                                                                                                          |
| `OAUTH_TOKEN`  | The token to authenticate your chatbot with Twitch's servers. Generate this with [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/) (a Twitch community-driven wrapper around the Twitch API), while logged in to your chatbot account. The token will be an alphanumeric string. |

### Running the bot

1. Start a game with "!chess"

2. The streamer (or you, on Glitch) plays the white pieces by clicking and dragging on the webpage

3. Chat plays the black pieces by suggesting moves in algebraic notation (i.e. !move e2e4) and then voting on each move

**Note**: This bot connects to the IRC network as a client and isn't designed to respond over HTTP. If you click "Show Live" you will see a simple "Hello World"

## Next Steps

- This program is limited. A thorough implementation would include user login to set environment variables so it could be used on multiple Twitch channels instead of hardcoding a single webpage implementation with the server, and storing socket.io connections to broadcast specifically. 
- For a thorough understanding of Twitch chatbots and IRC, read the [Chatbots & IRC Guide](https://dev.twitch.tv/docs/irc/guide/) and the rest of the Twitch IRC documentation.
- To authenticate your chatbot in a production setting, [register your app](https://dev.twitch.tv/docs/authentication/#registration) (chatbot) and use the OAuth Authorization code flow. This enables you to authenticate programmatically. To learn more, read the [Apps & Authentication Guide](https://dev.twitch.tv/docs/authentication/).
  Read [Chatbots & IRC documentation](https://dev.twitch.tv/docs/irc/guide/).
- Reach out to [@twitchdev](https://twitter.com/twitchdev) or the [Twitch chatbot forum](https://discuss.dev.twitch.tv/c/chat) for help!

Chess piece source:
User:Cburnett, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons
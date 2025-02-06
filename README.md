# Wedding website

See the [live version](https://winnyepedro.site/)

This is the React website I created for my own wedding. I decided to build it because I didn't want to pay fees on the gifts we received.

We needed a solution with the following features:

* List of gifts with multiple solutions for receiving payment with no fees
* Ability for guests to send messages to the bride and groom
* Ability for guests to RSVP
* Store RSVPs and messages
* A fairly seamless way of adding and controlling gift states so that my fiancée could use it
* Notifications when someone buys a gift, sends a message, or RSVPs so my fiancée and I could see it

For the payment solutions, we came up with three possibilities:

1. PIX payments
2. Buying from the Amazon wishlist
3. Bitcoin payments

We created an Amazon wishlist, and I developed a Telegram bot that accesses the list, searches for a given keyword, and adds all items it finds that weren't previously added to a MongoDB database.

I also created a function that monitors the wishlist and sets any gifts that disappear from it as inactive, with the Telegram bot notifying us of these changes.

The Telegram bot also sends RSVP confirmations and messages to a specified chat ID.

# Getting started

## Running independently
First, make sure all environment variables are set correctly.

For the front end, just update the values of the existing .env files.

For the back end, create a .env with the following values:

```
MONGO_DB_CONNECTION_STRING=
TELEGRAM_BOT_KEY=
TELEGRAM_BOT_NAME=
TELEGRAM_NOTIFICATION_CHANNEL_ID=
AMAZON_WISHLIST_URL=
NODE_ENV=local
```

And you're good to go. Just follow the individual README.md files from each folder to run the individual projects.

## Using docker-compose

@TODO


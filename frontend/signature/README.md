# Zoom Meeting SDK Sample Signature Node.js

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

---

**NOTE:** This Sample App has been updated to use [SDK App](https://marketplace.zoom.us/docs/guides/build/sdk-app) type credentials instead of [JWT App](https://marketplace.zoom.us/docs/guides/build/jwt-app) type credentials.

---

This is a Node.js / Express server that generates a [Web or Native Meeting SDK signature](https://marketplace.zoom.us/docs/sdk/native-sdks/web/signature) via an http request from your frontend for use in the Web or Native Meeting SDKs.

## Installation

In terminal, run the following command to clone the repo:

`$ git clone https://github.com/zoom/meetingsdk-sample-signature-node.js.git`

## Setup

1. In terminal, cd into the cloned repo:

   `$ cd meetingsdk-sample-signature-node.js`

1. Then install the dependencies:

   `$ npm install`

1. Create an environment file to store your SDK Key and Secret:

   `$ touch .env`

1. Add the following code to the `.env` file, and insert your Zoom SDK App's Key and Secret found on the App Credentials page in the Zoom App Marketplace:

   ```
   ZOOM_SDK_KEY=SDK_KEY_HERE
   ZOOM_SDK_SECRET=SDK_SECRET_HERE
   ```

1. Save and close `.env`.

1. Start the server:

   `$ npm run start`

## Usage

Make a POST request to `http://localhost:3001` (or your deployed url) with the following request body:

| Key           | Value Description                                          |
| ------------- | ---------------------------------------------------------- |
| meetingNumber | Required, the Zoom Meeting or Webinar Number.              |
| role          | Required, `0` to specify participant, `1` to specify host. |

### Example Request

POST `http://localhost:3001`

Request Body:

```json
{
  "meetingNumber": "123456789",
  "role": 0
}
```

If successful, the response body will be a JSON representation of your signature:

```json
{
  "signature": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJhYmMxMjMiLCJtbiI6IjEyMzQ1Njc4OSIsInJvbGUiOjAsImlhdCI6MTY0NjkzNzU1MywiZXhwIjoxNjQ2OTQ0NzUzLCJhcHBLZXkiOiJhYmMxMjMiLCJ0b2tlbkV4cCI6MTY0Njk0NDc1M30.UcWxbWY-y22wFarBBc9i3lGQuZAsuUpl8GRR8wUah2M"
}
```

In the [Web or Native Meeting SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web), pass in the `signature` to the `join()` function:

```js
// 1. Make http request to your server to get the signature

// 2. Pass in the signature to the join function

// Web Meeting SDK Client View example
ZoomMtg.join({
  signature: signature,
  sdkKey: sdkKey,
  userName: userName,
  meetingNumber: meetingNumber,
  passWord: password,
});

// Web Meeting SDK Component View example
client.join({
  signature: signature,
  sdkKey: sdkKey,
  userName: userName,
  meetingNumber: meetingNumber,
  password: password,
});
```

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

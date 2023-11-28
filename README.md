# ⚠️ Important

```diff
- plugin is still in developement and thus not ready for production.
```

# Medusa Plugin Messaging

![Thumbnail](./assets/plugin-thumbnail.png)

Enhance your Medusa ecommerce shop with \***\*meudsa-plugin-messaging\*\***, a seamless messaging extension that empowers customers to communicate effortlessly while integrating social media messages into the admin dashboard for efficient store management. Elevate your user experience with a clean and intuitive UI.

## Documentation

See [Documentation](https://medusa-plugin-messaging.raideno.xyz).

## Contact

**Discord:** @raideno `ID:423897604330618883`

## Usage

### Installation

```bash
npm i medusa-plugin-messaging
```

### Run Migrations

First build your backend.

```bash
npm run build
```

Run the migrations

```bash
npx medusa migrations run
```

### Configuration

This env variables are required on the admin: `BACKEND_URL`

```ts
// medusa-config.js

const plugins = [
  /** @type {import('medusa-plugin-messaging').PluginOptions} */
  {
    resolve: "medusa-plugin-messaging",
    options: {
      enableUI: true,
      backendUrl: process.env.BACKEND_URL || "http://localhost:9000",
      handlers: [],
    },
  },
];

// ...
```

### Messaging Page

After configuring the plugin, a new route will show up in your Store Admin Dashboard.

[Image]().

[Video]().

### StoreFront Integration

## Documentation

See [Documentation](https://medusa-plugin-messaging.raideno.xyz).

## Handlers and External Messaging Sources

- [Integrate Instagram Handler](https://medusa-plugin-messaging.raideno.xyz)
- [Integrate Facebook Handler](https://medusa-plugin-messaging.raideno.xyz)
- [Integrate Whatsapp Handler](https://medusa-plugin-messaging.raideno.xyz)
- [Integrate Telegram Handler](https://medusa-plugin-messaging.raideno.xyz)

## Contribution

Anyone is welcome to contribute or suggest new features, please contact me on **Discord:** @raideno `ID:423897604330618883`.

## Features

- **Effortless Messaging Management:** The 'meudsa-plugin-messaging' introduces a user-friendly UI for seamless integration of messaging functionalities into your Medusa-powered ecommerce admin dashboard. Enhance communication between customers and admins effortlessly.

- **Unified Social Media Inbox:** Consolidate messages from social media platforms like Instagram, Facebook, Twitter, and more directly into your admin dashboard. Respond to customer inquiries and social media interactions efficiently, all in one place.

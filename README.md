# Notification.js

![](https://badgen.net/badge/version/1.1.0/blue)
[![License](https://img.shields.io/github/license/ArthurBeaulieu/Notification.js.svg)](https://github.com/ArthurBeaulieu/Notification.js/blob/master/LICENSE.md)
![](https://badgen.net/badge/documentation/written/green)
![](https://badgen.net/badge/test/passed/green)
![](https://badgen.net/badge/dependencies/none/green)

`Notification.js` is a standalone ES6 module that allows you to easily handle several notifications from different types at the same time. It features a lot of options so you can customize it.

## Get started

`Notification.js` handles four different types of notifications : **Success**, **Info**, **Warning** and **Error**.

The first step for you to get started with `Notification.js` is to copy both the `dist/Notification.min.js` and `dist/notification.min.css` files in your code base. Once pasted, don't forget to include the style and the script in your HTML page. `Notification.js` is ready to be used.

With ~18Ko minified, `Notification.js` is designed to be stable and remain as light as possible. It is meant to be used application wide.

#### Basic usage

To make `Notification.js` work, you must call for a new notification handler. It will handle all new notifications coming to the stack, with their specificities. Attach preferably this handler to the window object, so you can access it from anywhere in your app:

```javascript
import Notification from 'path/to/Notification.js';
window.notification = new Notification();
```

Now that the handler is set, you can call for new notifications anywhere, at anytime using the following calls:

```javascript
window.notification.success({ message: 'Great success!' });
window.notification.info({ message: 'Much info, very text' });
window.notification.warning({ message: 'Snake?' });
window.notification.error({ message: 'Snaaaaaaaake!' });
```

The message string passed is **mandatory**. Forget to pass it and you will raise an error in the console.

#### Advanced usage

The Notification constructor can take an options object with the following attributes :

```javascript
import Notification from 'path/to/Notification.js';
window.notification = new Notification({
    position: 'top-left',
    thickBorder: 'bottom',
    duration: 2000,
    transition: 100,
    maxActive: 5
});
```

The handler is now ready with your custom settings. To call for a new notification, you can still use the typed methods `.success()`, `.info()`, `.warning()` and `.error()` from **Basic Usage**, but you can also use the `.new()` method :

```JavaScript
let id = window.notification.new({
   type: 'info', // Mandatory
   title: 'My test notification',
   message: 'My test message.', // Mandatory
   thickBorder: 'top',
   iconless: false,
   closable: true,
   sticky: true,
   renderTo: document.body,
   CBtitle: 'My callback',
   callback: () => {
     alert('Called from my test notification');
   }
});
```

The only difference with the typed methods is that with the `.new()` method, you must give it a type beside giving it a message: those are the two required options to create a standard notification. You can also pass this options object to the typed methods.

As for the typed methods, the `new()` method return the notification ID, in case you want some manual control over your notifications, this is why we store it in the `id` variable. Using this ID, you can dismiss a specific notification :

```JavaScript
window.notification.dismiss(id);
```

Or dismiss them all :

```JavaScript
window.notification.dismissAll();
```

Finally, if you want to clear the Notification singleton, use the `destroy()` method on the handler :

```javascript
window.notification.destroy();
```

## Notification options

#### Handler settings

| *Options*       | *Default*   | *Values*                                               |
| ---------------:|:----------- |:------------------------------------------------------ |
| **position**    | `top-right` | `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| **thickBorder** | `top`       | `left`, `right`, `top`, `bottom`, `none`               |
| **duration**    | `5000 ms`   | Positive integer                                       |
| **transition**  | `200 ms`    | Positive integer, not greater than half duration       |
| **maxActive**   | `5`         | Positive integer                                       |
| **imgPath**     | `./img/`    | The path where img assets resides                      |

#### Notification settings

| *Option*        | *Default*         | *Values*                                 |
| ---------------:|:----------------- |:-----------------------------------------|
| **type**        | `info`            | `success`, `info`, `warning`, `error`    |
| **title**       | `''`              | String                                   |
| **message**     | `''`              | String with a length greater than 0      |
| **thickBorder** | Handler value     | `left`, `right`, `top`, `bottom`, `none` |
| **iconless**    | `false`           | `true`, `false`                          |
| **closable**    | `true`            | `true`, `false`                          |
| **sticky**      | `false`           | `true`, `false`                          |
| **renderTo**    | Handler container | DOM Object                               |
| **CBtitle**     | `''`              | String                                   |
| **callback**    | `null`            | JavaScript function                      |

You're now good to go! If however you need more information, you can read the online [documentation](https://arthurbeaulieu.github.io/CustomEvents.js/doc/).

# Development

If you clone this repository, you can `npm install` to install development dependencies. This will allow you to build dist file, run the component tests or generate the documentation ;

- `npm run build` to generate the minified file ;
- `npm run dev` to watch for any change in source code ;
- `npm run web-server` to launch a local development server ;
- `npm run doc` to generate documentation ;
- `npm run test` to perform all tests at once ;
- `npm run testdev` to keep browsers open to debug tests ;
- `npm run beforecommit` to perform tests, generate doc and bundle the JavaScript.

To avoid CORS when locally loading the example HTML file, run the web server. Please do not use it on a production environment. Unit tests are performed on both Firefox and Chrome ; ensure you have both installed before running tests, otherwise they might fail.

If you have any question or idea, feel free to DM or open an issue (or even a PR, who knows) ! I'll be glad to answer your request.

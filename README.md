# Notification.js

*Notification.js* is a standalone ES6 module that allows you to easily handle several notifications from different types at the same time. It features a lot of options so you can customize it.

![Version](https://badgen.net/badge/version/1.1.0/green) ![Open Source Love](https://badgen.net/badge/license/GPL-3.0/blue)

## Get started

*Notification.js* handles four different types of notifications : **Success**, **Info**, **Warning** and **Error**.

The first step for you to get started with *Notification.js* is to copy both the `dist/Notification.min.js` and `dist/notification.min.css` files in your code base, and the `img` folder anywhere you need. don't forget to give that path to the Notification constructor, so it can find the needed pictures. Once pasted, don't forget to include the style and the script in your HTML page. You're good to go!

#### Basic usage

To make *Notification.js* work, you must call for a new notification handler. It will handle all new notifications coming to the stack, with their specificities. Attach preferabkly this handler to the window object, so you can access it from anywhere in your app:

```javascript
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
window.notification = new notification({
    position: 'top-left',
    thickBorder: 'bottom',
    duration: 2000,
    transition: 100,
    maxActive: 5,
    imgPath: '/path/to/img/'
});
```

The handler is now ready with your custom settings. To call for a new notification, you can still use the typed methods `.success()`, `.info()`, `.warning()` and `.error()` from **Basic Usage**, but you can also use the `.new()` method :

```JavaScript
let id = window.notification.new({
   type: 'info', // Mandatory
   title: 'My test notification',
   message: 'My test message.', // Mandatory
   thickBorder: 'top'
   iconless: false,
   closable: true,
   sticky: true,
   renderTo: document.body,
   CBtitle: 'My callback',
   callback: function() {
     alert('Called from My test notification');
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

Finaly, if you want to clear the Notification singleton, use the `destroy()` method on the handler :

```javascript
window.notification.destroy();
```

#### Further reading

In the `doc` folder, there is a [JSDoc](https://github.com/jsdoc3/jsdoc) that has been generated. It is highly detailled, so we recommend you to read this documentation if you want to enhance or modify the class itself. There are some example in the `src/Notification.html` and a sand box so you can try the system and watch all possibilities given by the passed options.

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

## Unit test

The [Jasmine](https://github.com/jasmine/jasmine) framework is used to perform tests (v3.2.1) on *Notification.js*.

You can test the source code locally by opening the `test/SpecRunner.html` file ; because *Notification.js* is a module, you will encounter a CORS error that prevents you to perform the test ; you can either run a local server, or [disable a security flag](https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/) in your browser (mind to re-enable it after test) to bypass this restriction.

## Contribute

If you want to contribute in any way, please open an issue with your suggestions or even better, make a pull request! I am aware that this module is far from perfect so feel free to help out to make this great again!

June 2018 - March 2019

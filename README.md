# Notification.js

Notification.js is a standalone JavaScript class that allows you to easily handle several notifications from different types at the same time. It is meant to be used with the KISS spirit in mind. Notification.js features a lot of options so you can customize it, to fit your needs.

[![GitHub version](https://badge.fury.io/gh/boennemann%2Fbadges.svg)](https://github.com/ArthurBeaulieu/Notification.js) [![Open Source Love](https://badges.frapsoft.com/os/gpl/gpl.svg?v=102)](https://github.com/ArthurBeaulieu/Notification.js)

---

## Get started

Notification.js handles four different types of notifications: Success, Info, Warning and Error.

The first step for you to get started with Notification.js is to copy both the `dist/Notification.min.js` and `dist/notification.min.css` files in your code base. You are free to organize those file the way you want. Note that if you want to tweak the code, preferably use the files located in the `src` directory. Once pasted, don't forget to include the style and the script in your HTML page. You are now good to go!

#### Basic usage

To make Notification.js work, you must call for a new notification handler. It will handle all new notifications coming to the stack, with their specificities. Attach this handler to the window object, so you can access it from anywhere in your webapp:

```javascript
window.notification = new Notification();
```

Now that the handler is set, you can call for new notifications anywhere, at anytime using the following lines:

```javascript
window.notification.success({ message: 'Great success!' });
window.notification.info({ message: 'Much info, very text' });
window.notification.warning({ message: 'Snake?' });
window.notification.error({ message: 'Snaaaaaaaake!' });
```

The message string passed is **mandatory**. Forget to pass it and you will raise an error in the console.

---

#### Advanced usage

You can pass an options object when creating a new notificafion handler:

```javascript
window.notification = new notification({
    position: 'top-left',
    thickBorder: 'bottom',
    duration: 2000,
    transition: 100,
    maxActive: 5
});
```

The handler is now ready with your custom settings. To call for a new notification, you can still use the typed methods `.success()`, `.info()`, `.warning()` and `.error()` from **Basic Usage**, but you can also call for the `.new()` notification method:

```JavaScript
let id = window.notification.new({
   type: 'info',
   title: 'My test notification',
   message: 'My test message.',
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
The only difference with the typed methods is that using `.new()` method, you must give it a type beside giving it a message: those are the two required options to create a standard notification. You can also pass this options object to the typed methods.

As for the typed methods, the `new()` method return the notification ID, in case you want some manual control over your notifications, this is why we store it in the `id` variable. Using this ID, you can dismiss a specific notification like this:

```JavaScript
window.notification.dismiss(id);
```

Also you can dismiss all notification:

```JavaScript
window.notification.dismissAll();
```

Finaly, the handler keeps all notifications in an history object, so you can get a timeline of feedbacks received by the user during its session:

```javascript
let historyLength = window.notification.getHistoryLength();
let history = window.notification.getHistory();
```

#### Further reading

In the `doc` folder, there is a JSDoc that has been generated from the JavaScript class. It is highly detailled, so we recommend you to read this documentation if you want to enhance or modify the class itself. There are some example in the `src/Notification.html` and a sand box so you can try the system and watch all possibilities given by the passed options.

## Notification options

#### Handler settings

| Option        | Default     | Values                                                 |
| -------------:|:----------- | ------------------------------------------------------ |
| `position`    | `top-right` | `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `thickBorder` | `top`       | `left`, `right`, `top`, `bottom`, `none`               |
| `duration`    | `5000 ms`   | Positive integer                                       |
| `transition`  | `200 ms`    | Positive integer, not greater than half duration       |
| `maxActive`   | `5`         | Positive integer                                       |

#### Notification settings

| Option        | Default           | Values                                   |
| -------------:|:----------------- | -----------------------------------------|
| `type`        | `info`            | `success`, `info`, `warning`, `error`    |
| `title`       | `''`              | String                                   |
| `message`     | `''`              | String with a length greater than 0      |
| `thickBorder` | Handler value     | `left`, `right`, `top`, `bottom`, `none` |
| `iconless`    | `false`           | `true`, `false`                          |
| `closable`    | `true`            | `true`, `false`                          |
| `sticky`      | `false`           | `true`, `false`                          |
| `renderTo`    | Handler container | DOM Object                               |
| `CBtitle`     | `''`              | String                                   |
| `callback`    | `null`            | JavaScript function                      |

---

## Contribute

If you want to contribute in any way, please open an issue with your suggestions or even better, make a pull request! I am aware that this class is far from perfect so feel free to help out to make this great again!

#### Contributors

Arthur Beaulieu - June 2018

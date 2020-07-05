import Notification from '../src/js/Notification.js';
'use strict';


let NotificationMgt = {};
const testDefaultArguments = notificationMgt => {
  // Component existence
  expect(notificationMgt).not.toEqual(undefined);
  expect(notificationMgt).not.toEqual(null);
  // Default arguments
  expect(notificationMgt._dismissAllLock).toEqual(false);
  expect(notificationMgt._dom.outerHTML).toEqual('<div class="notification-container top-right"></div>');
  expect(notificationMgt._active).toEqual({});
  expect(notificationMgt._queue).toEqual({});
  expect(notificationMgt._queue).toEqual({});
  expect(JSON.stringify(notificationMgt._default)).toEqual(`{"handler":{"position":"top-right","thickBorder":"top","duration":5000,"transition":200,"maxActive":10,"imgPath":"./img/"},"notification":{"type":"info","message":"","title":"","iconless":false,"closable":true,"sticky":false,"renderTo":{},"CBtitle":"","callback":null,"isDimmed":false},"color":{"success":"rgb(76, 175, 80)","info":"rgb(3, 169, 244)","warning":"rgb(255, 152, 0)","error":"rgb(244, 67, 54)"}}`);
  expect(notificationMgt._position).toEqual('top-right');
  expect(notificationMgt._thickBorder).toEqual('top');
  expect(notificationMgt._duration).toEqual(5000);
  expect(notificationMgt._transition).toEqual(200);
  expect(notificationMgt._maxActive).toEqual(10);
  expect(notificationMgt._imgPath).toEqual('./img/');
  expect(notificationMgt.version).toEqual('1.1.0');
};


describe('Notification unit test', () => {


  it('Component construction with no arguments', done => {
    NotificationMgt = new Notification();
    // Notification must be built with default arguments
    testDefaultArguments(NotificationMgt);
    // Component proper destruction
    NotificationMgt.destroy();
    NotificationMgt = null;
    done();
  });


  it('Component construction with wrong arguments', done => {
    // Wrong type
    NotificationMgt = new Notification({
      position: () => {},
      thickBorder: 42,
      duration: 'Not a string',
      transition: 'Not a string',
      maxActive: 'Not a string',
      imgPath: 42
    });
    // With wrong parameters, Notification must still be built with default arguments
    testDefaultArguments(NotificationMgt);
    // Component proper destruction
    NotificationMgt.destroy();
    // Invalid values for arguments
    NotificationMgt = new Notification({
      position: 'top-bottom',
      thickBorder: 'bopht',
      duration: -500,
      transition: -1000,
      maxActive: -1500,
      imgPath: null
    });
    // With wrong parameters, Notification must still be built with default arguments
    testDefaultArguments(NotificationMgt);
    // Component proper destruction
    NotificationMgt.destroy();
    NotificationMgt = null;
    done();
  });


  it('Component construction', done => {
    NotificationMgt = new Notification({
      position: 'bottom-left',
      thickBorder: 'left',
      duration: 3000,
      transition: 500,
      maxActive: 5,
      imgPath: '../img/'
    });
    // Notification must be built with default arguments
    // Component existence
    expect(NotificationMgt).not.toEqual(undefined);
    expect(NotificationMgt).not.toEqual(null);
    // Custom arguments
    expect(NotificationMgt._dismissAllLock).toEqual(false);
    expect(NotificationMgt._dom.outerHTML).toEqual('<div class="notification-container bottom-left"></div>');
    expect(NotificationMgt._active).toEqual({});
    expect(NotificationMgt._queue).toEqual({});
    expect(NotificationMgt._queue).toEqual({});
    expect(JSON.stringify(NotificationMgt._default)).toEqual(`{"handler":{"position":"top-right","thickBorder":"top","duration":5000,"transition":200,"maxActive":10,"imgPath":"./img/"},"notification":{"type":"info","message":"","title":"","iconless":false,"closable":true,"sticky":false,"renderTo":{},"CBtitle":"","callback":null,"isDimmed":false},"color":{"success":"rgb(76, 175, 80)","info":"rgb(3, 169, 244)","warning":"rgb(255, 152, 0)","error":"rgb(244, 67, 54)"}}`);
    expect(NotificationMgt._position).toEqual('bottom-left');
    expect(NotificationMgt._thickBorder).toEqual('left');
    expect(NotificationMgt._duration).toEqual(3000);
    expect(NotificationMgt._transition).toEqual(500);
    expect(NotificationMgt._maxActive).toEqual(5);
    expect(NotificationMgt._imgPath).toEqual('../img/');
    expect(NotificationMgt.version).toEqual('1.1.0');
    done();
  });


  /* No need to test destroy as if it didn't worked, previous test would have failed. */
  /* There is also no need to test _init(), _setOptionsDefault(), _setAttributesDefault() and _attach(), as they are all called in constructor. */


  it('Public method new with wrong arguments', done => {
    spyOn(console, 'error').and.callThrough();
    expect(NotificationMgt.new()).toEqual(-1);
    expect(NotificationMgt.new('')).toEqual(-1);
    expect(NotificationMgt.new({
      type: 'orrer'
    })).toEqual(-1);
    expect(NotificationMgt.new({
      type: 'error',
      message: () => {}
    })).toEqual(-1);
    expect(console.error).toHaveBeenCalledTimes(4);
    expect(console.error).toHaveBeenCalledWith('Notification.js : new() options argument object is invalid.');
    done();
  });


  it('Public method new', done => {
    spyOn(console, 'error').and.callThrough();
    expect(NotificationMgt.new({
      type: 'error',
      message: 'Error message'
    })).not.toEqual(-1);
    let notification = NotificationMgt.new({
      type: 'error',
      message: 'Error message'
    });
    expect(typeof notification).toEqual('string');
    expect(console.error).not.toHaveBeenCalled();
    NotificationMgt.dismissAll();
    done();
  });


});

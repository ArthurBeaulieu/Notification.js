import Notification from '../../src/js/Notification.js';

const TIMEOUT = 500;
let notification = {};

// To avoid CORS errors when running this UT, use a local web server to perform the test scenario
describe('Testing Notification.js module', function() {
  describe('Handler instanciation', function() {
    it('Create with no parameters', function(done) {
      notification = new Notification();
      // Default handler values
      expect(notification._position).toBe('top-right');
      expect(notification._thickBorder).toBe('top');
      expect(notification._duration).toBe(5000);
      expect(notification._transition).toBe(200);
      expect(notification._maxActive).toBe(10);
      // Check handler DOM element
      expect(notification._dom.classList[1]).toBe('top-right');
      expect(document.body.lastChild).toBe(notification._dom);
      // Clear singleton
      notification.destroy();
      // Check that the container was removed from body on destroy handler
      expect(document.body.lastChild).not.toBe(notification._dom);      
      done();      
    });


    it('Create with all parameters', function(done) {
      const parameters = {
        position: 'bottom-left',
        thickBorder: 'right',
        duration: 1234,
        transition: 100,
        maxActive: 42,
        imgPath: '../../src/img/'
      };
      notification = new Notification(parameters);
      // Default handler values
      expect(notification._position).toBe('bottom-left');
      expect(notification._thickBorder).toBe('right');
      expect(notification._duration).toBe(1234);
      expect(notification._transition).toBe(100);
      expect(notification._maxActive).toBe(42);
      // Check handler DOM element
      expect(notification._dom.classList[1]).toBe('bottom-left');
      expect(document.body.lastChild).toBe(notification._dom);

      notification.destroy();
      done();   
    });  


    it('Create unique instance of Notification', function(done) {
      // Instanciate two class (same singleton returned)
      const handler1 = new Notification();
      const handler2 = new Notification();
      // Check handlers equality
      expect(handler1).toBe(handler2);
      // Clear mess (need to destroy one only since they are the same instance)
      handler1.destroy();
      done();  
    });   


    it('Restore a default notification handler', function(done) {
      notification = new Notification({
        position: 'top-right',
        thickBorder: 'right',
        duration: 2000,
        transition: 100,
        maxActive: 5,
        imgPath: '../../src/img/'
      });
      expect(notification).not.toBe(null);
      expect(notification).not.toBe(undefined);
      done();  
    });            
  });


  describe('Notification basic creation', function() {
    it('Create with no parameters at all', function(done) {
      const type = ['success', 'info', 'warning', 'error'];
      let counter = 0;
      spyOn(console, 'error').and.callFake(function(error) {
        expect(error).toBe(`Notification.js : No arguments provided for ${type[counter]}() method.`);
        ++counter;
        if (counter === 4) {
          done();
        }
      });

      notification.success();
      notification.info();
      notification.warning();
      notification.error();
    }); 


    it('Create with empty parameters', function(done) {
      let counter = 0;
      spyOn(console, 'error').and.callFake(function(error) {
        expect(error).toBe('Notification.js : new() options argument object is invalid.');
        ++counter;
        if (counter === 4) {
          done();
        }
      });

      notification.success({});
      notification.info({});
      notification.warning({});
      notification.error({});
    });     


    it('Create success and check default values', function(done) {
      const success = notification.success({ message: 'Success' });
      // Check notification internals
      expect(notification._active[success].id).toBe(notification._idGenerator(`successSuccess`, 5));
      expect(notification._active[success].type).toBe('success');
      expect(notification._active[success].message).toBe('Success');
      expect(notification._active[success].title).toBe('');
      // Check default values
      expect(notification._active[success].duration).toBe(notification._duration);
      expect(notification._active[success].iconless).toBe(notification._default.notification.iconless);
      expect(notification._active[success].thickBorder).toBe(notification._thickBorder);
      expect(notification._active[success].closable).toBe(notification._default.notification.closable);
      expect(notification._active[success].sticky).toBe(notification._default.notification.sticky);
      expect(notification._active[success].renderTo).toBe(notification._dom);
      expect(notification._active[success].CBtitle).toBe(notification._default.notification.CBtitle);
      expect(notification._active[success].callback).toBe(notification._default.notification.callback);
      expect(notification._active[success].isDimmed).toBe(notification._default.notification.isDimmed);
      done();
    });  


    it('Dismiss single notification', function(done) {
      expect(Object.keys(notification._active).length).toBe(1); // Previous success notification  is currently active
      notification.dismiss(Object.keys(notification._active)[0]);
      setTimeout(() => {
        expect(Object.keys(notification._active).length).toBe(0);
        done();        
      }, 1000); // Must wait the transition time before checking if the notification has been removed
    });  


    it('Create notification of all three remaining types', function(done) {
      // Creating notifications
      const info = notification.info({ message: 'Info' });
      const warning = notification.warning({ message: 'Warning' });
      const error = notification.error({ message: 'Error' });
      // Testing notifications
      expect(notification._active[info].type).toBe('info');
      expect(notification._active[info].message).toBe('Info');
      expect(notification._active[info].title).toBe('');      
      expect(notification._active[warning].type).toBe('warning');
      expect(notification._active[warning].message).toBe('Warning');
      expect(notification._active[warning].title).toBe('');
      expect(notification._active[error].type).toBe('error');
      expect(notification._active[error].message).toBe('Error');
      expect(notification._active[error].title).toBe('');
      done();
    });


    it('Dismiss all notifications', function(done) {
      expect(Object.keys(notification._active).length).toBe(3); // Previous success notification  is currently active
      notification.dismissAll();
      setTimeout(() => {
        expect(Object.keys(notification._active).length).toBe(0);
        done();        
      }, 1000); // Must wait the transition time before checking if the notification has been removed
    });       


    it('Dismiss type warning', function(done) {
      notification.warning({ message: 'Warning' });
      notification.warning({ message: 'Another warning' });
      notification.warning({ message: 'Yet another warning' });
      notification.error({ message: 'Error' });      
      expect(Object.keys(notification._active).length).toBe(4); // Previous success notification  is currently active
      notification.dismissType('warning');
      setTimeout(() => {
        expect(Object.keys(notification._active).length).toBe(1);
        notification.dismissAll();    
        setTimeout(() => {
          done();        
        }, 1000);    
      }, 1000); // Must wait the transition time before checking if the notification has been removed
    });      
  });


  describe('Notification advanced creation', function() {
    it('Create new with no parameters at all', function(done) {
      spyOn(console, 'error').and.callFake(function(error) {
        expect(error).toBe('Notification.js : new() options argument object is invalid.');
        done();
      });

      notification.new();
    });


    it('Create new with empty parameters', function(done) {
      let counter = 0;
      spyOn(console, 'error').and.callFake(function(error) {
        expect(error).toBe('Notification.js : new() options argument object is invalid.');
        done();
      });

      notification.new({});
    });


    it('Create new with all parameters', function(done) {
      var parameters = {
         type: 'info',
         title: 'Custom title is custom',
         message: 'So is for a custom message!',
         duration: 13579,
         iconless: true,
         thickBorder: 'bottom',
         closable: false,
         sticky: false,
         renderTo: document.body,
         CBtitle: 'My callback',
         callback: function() {
             console.log('Called from my notification');
         }
      };
      var id = notification.new(parameters);
      // Custom notification values
      expect(notification._active[id].type).toBe('info');
      expect(notification._active[id].title).toBe('Custom title is custom');
      expect(notification._active[id].message).toBe('So is for a custom message!');
      expect(notification._active[id].duration).toBe(13579);
      expect(notification._active[id].iconless).toBe(true);
      expect(notification._active[id].thickBorder).toBe('bottom');
      expect(notification._active[id].closable).toBe(false);
      expect(notification._active[id].sticky).toBe(false);
      expect(notification._active[id].renderTo).toBe(document.body);
      expect(notification._active[id].CBtitle).toBe('My callback');
      expect(typeof notification._active[id].callback).toBe('function');

      setTimeout(function() {
        spyOn(console, 'log').and.callFake(function(log) {
          // Check notification callback behavior
          expect(log).toBe('Called from my notification');
          done();           
        });
        // Check notification UI build
        expect(notification._active[id].dom.className).toBe('notification bottom-border info');
        expect(notification._active[id].dom.parentNode).toBe(document.body);
        expect(notification._active[id].dom.children[0].className).toBe('text-container');        
        expect(notification._active[id].dom.children[0].children[0].tagName).toBe('H6');        
        expect(notification._active[id].dom.children[0].children[0].innerHTML).toBe('Custom title is custom');        
        expect(notification._active[id].dom.children[0].children[1].tagName).toBe('P');        
        expect(notification._active[id].dom.children[0].children[1].className).toBe('iconless-width');        
        expect(notification._active[id].dom.children[0].children[1].innerHTML).toBe('So is for a custom message!');        
        expect(notification._active[id].dom.children[0].children[2].tagName).toBe('BUTTON');
        expect(notification._active[id].dom.children[0].children[2].innerHTML).toBe('My callback');
        notification._active[id].dom.children[0].children[2].click();
      }, 1000);
    });             
  });
});

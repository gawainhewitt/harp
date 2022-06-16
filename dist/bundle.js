(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // eventBinders.js
  var require_eventBinders = __commonJS({
    "eventBinders.js"(exports, module) {
      var EventBinders2 = class {
        constructor() {
          this.stringsArray = [];
          for (let i = 0; i < 3; i++) {
            this.stringsArray[i] = [];
            for (let j = 0; j < 10; j++) {
              this.stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
            }
          }
          this.wrapper = document.querySelector("#wrapper");
          this.startscreen = document.querySelector("#startscreen");
        }
        bindStartScreen(handler) {
          this.startscreen.addEventListener("click", () => {
            handler();
          });
        }
        bindMouseEnter(handler) {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 10; j++) {
              this.stringsArray[i][j].addEventListener("mouseenter", () => {
                handler("mouse", `c${i}s${j}`);
              });
            }
          }
        }
        bindSelectStart(handler) {
          document.addEventListener("selectstart", (e) => {
            handler(e);
          });
        }
        bindMouseDown(handler) {
          document.addEventListener("mousedown", (e) => {
            handler(e);
          });
        }
        bindMouseUp(handler) {
          document.addEventListener("mouseup", (e) => {
            handler(e);
          });
        }
        bindTouchStart(handler) {
          this.wrapper.addEventListener("touchstart", handler);
        }
        bindTouchEnd(handler) {
          this.wrapper.addEventListener("touchend", handler);
        }
        bindTouchMove(handler) {
          this.wrapper.addEventListener("touchmove", handler);
        }
        bindTouchCancel(handler) {
          this.wrapper.addEventListener("touchcancel", handler);
        }
      };
      module.exports = EventBinders2;
    }
  });

  // eventHandlers.js
  var require_eventHandlers = __commonJS({
    "eventHandlers.js"(exports, module) {
      var EventHandlers2 = class {
        constructor(eventBinder, coolStuffHappens2) {
          this.eventBinder = eventBinder;
          this.coolStuffHappens = coolStuffHappens2;
          this.ongoingTouches = [];
          this.touchesOnElements = [];
          this.mouseEnterCount = 0;
          this.buttonCount = 0;
          this.mouseDown = false;
          this.eventBinder.bindMouseEnter(this.handleMouseEnter);
          this.eventBinder.bindSelectStart(this.disableSelect);
          this.eventBinder.bindMouseDown(this.registerMouseDown);
          this.eventBinder.bindMouseUp(this.registerMouseUp);
          this.eventBinder.bindTouchStart(this.#handleTouchStart);
          this.eventBinder.bindTouchEnd(this.#handleTouchEnd);
          this.eventBinder.bindTouchMove(this.#handleTouchMove);
          this.eventBinder.bindTouchCancel(this.#handleCancel);
          this.eventBinder.bindStartScreen(this.hideStartScreen);
        }
        hideStartScreen = () => {
          this.eventBinder.startscreen.style.display = "none";
        };
        handleMouseEnter = (type, string) => {
          if (type === "mouse") {
            if (this.mouseDown) {
              console.log(`type = ${type}, string = ${string}`);
            }
          } else {
            console.log(`type = ${type}, string = ${string}`);
          }
        };
        buttonFunction = () => {
          const text = document.querySelector("#button");
          this.buttonCount += 1;
          text.innerHTML = `button ${this.buttonCount}`;
        };
        disableSelect = (e) => {
          e.preventDefault();
        };
        registerMouseDown = (e) => {
          this.disableSelect(e);
          this.mouseDown = true;
        };
        registerMouseUp = () => {
          this.mouseDown = false;
        };
        #handleTouchStart = (e) => {
          e.preventDefault();
          console.log("touch start");
          let touches = e.changedTouches;
          this.ongoingTouches.push(this.#copyTouch(touches[0]));
          this.#showElement(this.ongoingTouches);
        };
        #handleTouchEnd = (e) => {
          e.preventDefault();
          let touches = e.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            let idx = this.#ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
              console.log("touchend " + idx);
              this.ongoingTouches.splice(idx, 1);
            } else {
              console.log("can't figure out which touch to end");
            }
            for (let j = 0; j < this.touchesOnElements.length; j++) {
              if (this.touchesOnElements[j].touch_id === touches[i].identifier) {
                this.touchesOnElements.splice(j, 1);
              }
            }
          }
        };
        #handleTouchMove = (e) => {
          e.preventDefault();
          console.log("touch move");
          let touches = e.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            let idx = this.#ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
              this.ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]));
            } else {
              console.log("can't figure out which touch to continue");
            }
          }
          this.#showElement(this.ongoingTouches);
        };
        #handleCancel = (e) => {
          e.preventDefault();
          console.log("touchcancel.");
          let touches = e.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            let idx = this.ongoingTouchIndexById(touches[i].identifier);
            this.ongoingTouches.splice(idx, 1);
          }
        };
        #copyTouch = ({ identifier, clientX, clientY }) => {
          return { identifier, clientX, clientY };
        };
        #ongoingTouchIndexById = (idToFind) => {
          for (let i = 0; i < this.ongoingTouches.length; i++) {
            let id = this.ongoingTouches[i].identifier;
            if (id == idToFind) {
              return i;
            }
          }
          return -1;
        };
        #showElement = () => {
          for (let i = 0; i < this.ongoingTouches.length; i++) {
            let el = document.elementFromPoint(this.ongoingTouches[i].clientX, this.ongoingTouches[i].clientY);
            if (this.#isNewTouchOnElement(i, el.id)) {
              for (let i2 = 0; i2 < 3; i2++) {
                for (let j = 0; j < 10; j++) {
                  if (el.id === `c${i2}s${j}`) {
                    this.handleMouseEnter("touch", `#c${i2}s${j}`);
                  }
                }
              }
            }
          }
        };
        #isNewTouchOnElement = (idx, el_id) => {
          for (let i = 0; i < this.touchesOnElements.length; i++) {
            if (this.touchesOnElements[i].touch_id === this.ongoingTouches[idx].identifier) {
              if (this.touchesOnElements[i].element_id === el_id) {
                return false;
              } else {
                this.touchesOnElements.splice(i, 1, { touch_id: this.ongoingTouches[idx].identifier, element_id: el_id });
                return true;
              }
            }
          }
          this.touchesOnElements.push({ touch_id: this.ongoingTouches[idx].identifier, element_id: el_id });
          return true;
        };
      };
      module.exports = EventHandlers2;
    }
  });

  // coolStuffHappens.js
  var require_coolStuffHappens = __commonJS({
    "coolStuffHappens.js"(exports, module) {
      var CoolStuffHappens2 = class {
        constructor() {
        }
      };
      module.exports = CoolStuffHappens2;
    }
  });

  // index.js
  var EventBinders = require_eventBinders();
  var EventHandlers = require_eventHandlers();
  var CoolStuffHappens = require_coolStuffHappens();
  var eventBinders = new EventBinders();
  var coolStuffHappens = new CoolStuffHappens();
  var eventHandlers = new EventHandlers(eventBinders, coolStuffHappens);
})();

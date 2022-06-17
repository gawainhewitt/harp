class EventBinders {

  constructor() {
    this.stringsArray = [];
    for(let i = 0; i < 3; i++){
      this.stringsArray[i] = [];
      for(let j = 0; j < 10; j++){
        this.stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
      }
    }
    this.wrapper = document.querySelector("#wrapper");
    this.startscreen = document.querySelector("#startscreen");
  }

  bindStartScreen(handler) {
    this.startscreen.addEventListener('click', () => {
      handler();
    })
  }

  bindMouseEnter(handler) {
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 10; j++){
        this.stringsArray[i][j].addEventListener('mouseenter', () => { 
        handler("mouse", {chord: i, string: j});
        })
      }
    }
  }

  bindSelectStart(handler) {
    document.addEventListener('selectstart', (e) => {
      handler(e);
    })
  }

  bindMouseDown(handler) {
    document.addEventListener('mousedown', (e) => {
      handler(e);
    })
  }

  bindMouseUp(handler) {
    document.addEventListener('mouseup', (e) => {
      handler(e);
    })
  }

  bindTouchStart(handler) {
    this.wrapper.addEventListener('touchstart', handler);
  }

  bindTouchEnd(handler) {
    this.wrapper.addEventListener('touchend', handler);
  }

  bindTouchMove(handler) {
    this.wrapper.addEventListener('touchmove', handler);
  }

  bindTouchCancel(handler) {
    this.wrapper.addEventListener('touchcancel', handler);
  }

}
 

module.exports = EventBinders;

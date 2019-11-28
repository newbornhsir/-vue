import {Watcher} from './watcher'


export class Dep {
  subs:Array<Watcher>
  static target ?: Watcher
  constructor() {
    this.subs = []
  }

  addSub (watcher:Watcher) {
    if (this.subs.includes(watcher))return
    this.subs.push(watcher)
  }

  removeSub (watcher:Watcher) {
    const index = this.subs.indexOf(watcher);
    if (index > -1) {
      this.subs.splice(index, 1)
    }
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    console.log('notify')
    console.log(this.subs)
    this.subs.forEach(watcher=>{
      watcher.update();
    });
  }


}
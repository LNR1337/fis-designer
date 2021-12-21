import { Injectable } from '@angular/core';
import {DisplayConfigState} from "../config/display/state/display.state";

const DISPLAY_STATE_KEY = 'displayState';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /** Saves app state to local storage under specified name. */
  saveDisplayState(name: string, state: DisplayConfigState) {
    const stored = this.getWholeStorage();
    stored.set(name, JSON.stringify(state));
    localStorage.setItem(DISPLAY_STATE_KEY, JSON.stringify(Array.from(stored.entries())));
  }

  /** Gets a list of stored config names. */
  getSavedNames(): string[] {
    const stored = this.getWholeStorage();
    return Array.from(stored.keys());
  }

  /** Loads whole app local storage dict or creates a new one. */
  getWholeStorage(): Map<string, string> {
    const storage = localStorage.getItem(DISPLAY_STATE_KEY);
    if (storage) {
      try {
        return new Map<string, string>(JSON.parse(storage));
      } catch (e) {
        console.error(`Error loading from local storage. Resetting store. (${e})`);
        localStorage.clear();
      }
    }
    return new Map<string, string>();
  }

}

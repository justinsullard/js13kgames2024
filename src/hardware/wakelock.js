import { on, once } from "./bus.js";
import listen from "../util/listen.js";
// Wake Lock
let wakelock;
const lockWakeState = async () => {
    if(wakelock || !navigator.wakeLock) {
        return;
    }
    try {
        wakelock = await navigator.wakeLock.request();
        wakelock.addEventListener('release', () => {
            console.log('Screen Wake State Locked:', !wakelock.released);
        });
        console.log('Screen Wake State Locked:', !wakelock.released);
    } catch(e) {
        console.error('Failed to lock wake state with reason:', e.message);
    }
};

const releaseWakeState = () => {
    wakelock?.release?.();
    wakelock = null;
};

on("pause", releaseWakeState);
on("play", lockWakeState);
once("init", lockWakeState);

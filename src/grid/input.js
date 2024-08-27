import { emit, on, off } from "../hardware/bus.js";
import { colorMap, printf, text, del } from "../hardware/screen.js";

export class Input {
    label = "input";
    value = "";
    max = 32;
    min = 0;
    complete = false;
    mask = false;
    cursor = 0;
    constructor(label, max, min, mask) {
        this.label = label ?? this.label;
        this.max = max ?? this.max;
        this.min = min ?? this.min;
        this.mask = mask ?? this.mask;
        this.keydown = ({ key }) => {
            if (key === "Delete") {
                this.value = this.value.slice(0, this.cursor) + this.value.slice(this.cursor + 1, this.value.length);
                emit("trauma@cursor", 5);
            } else if (key === "Enter" || key === "Return") {
                this.submit();
            } else if (key === "ArrowLeft") {
                this.cursor -= 1;
                emit("trauma@cursor", 4);
            } else if (key === "ArrowRight") {
                this.cursor += 1;
                emit("trauma@cursor", 4);
            } else if (key == "Backspace") {
                this.value = this.value.slice(0, this.cursor - 1) + this.value.slice(this.cursor, this.value.length);
                this.cursor -= 1;
                emit("trauma@cursor", 5);
            }
            this.norm();
        }
        this.keypress = ({ key }) => {
            if (key.length === 1 && this.value.length < this.max - 1) {
                this.value = this.value.slice(0, this.cursor) + key + this.value.slice(this.cursor, this.value.length);
                this.cursor += 1;
                emit("trauma@cursor", 5);
                this.norm();
            } else {
                emit("nope@speaker");
            }
        };
        "keydown,keypress".split(",").forEach(x => on(x, this[x]));
    }
    norm() {
        this.cursor = Math.max(0, Math.min(this.value.length, this.max, this.cursor));
    }
    submit() {
        if (!this.complete && this.value.length >= this.min) {
            "keydown,keypress".split(",").forEach(x => off(x, this[x]));
            this.complete = true;
            emit("draw@cursor", 0, -1, -1);
            emit("@output", this.value, this.label);
        } else {
            emit("nope@speaker");
        }
    }
    draw(dur, x, y) {
        const vl = this.value.length;
        const offset = this.label.length + 1;
        printf(this.label + ":", x, y, colorMap.name);
        const value = this.mask ? ("").padStart(vl, "*") : this.value;
        text(value, x + offset, y, colorMap.text);
        if (vl < this.max) {
            for (let i = x + this.max; i--;) {
                del(x + offset + vl + i, y);
            }
        }
        if (!this.complete) {
            emit("draw@cursor", dur, x + offset + this.cursor, y);
        }
    }
}
export default Input;

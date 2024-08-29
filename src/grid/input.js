import { emit, on, off } from "../hardware/bus.js";
import { cursortrauma, drawCursor } from "../hardware/cursor.js";
import { colorMap, printf, text, del } from "../hardware/screen.js";
import each from "../util/each.js";

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
                this.value = this.value.slice(0, this.cursor) + this.value.slice(this.cursor + 1, this.vl);
                cursortrauma(5);
            } else if (key === "Enter" || key === "Return") {
                this.submit();
            } else if (key === "ArrowLeft") {
                this.cursor -= 1;
                cursortrauma(4);
            } else if (key === "ArrowRight") {
                this.cursor += 1;
                cursortrauma(4);
            } else if (key == "Backspace") {
                this.value = this.value.slice(0, this.cursor - 1) + this.value.slice(this.cursor, this.vl);
                this.cursor -= 1;
                cursortrauma(5);
            }
            this.norm();
        }
        this.keypress = ({ key }) => {
            if (key.length === 1 && this.vl < this.max - 1) {
                this.value = this.value.slice(0, this.cursor) + key + this.value.slice(this.cursor, this.vl);
                this.cursor += 1;
                cursortrauma(5);
                this.norm();
            } else {
                emit("nope@speaker");
            }
        };
        this.toggle(on);
    }
    toggle(f) {
        each("keydown,keypress".split(","), x => f(x, this[x]));
    }
    get vl() { return this.value.length; }
    norm() {
        this.cursor = Math.max(0, Math.min(this.vl, this.max, this.cursor));
    }
    submit() {
        if (!this.complete && this.vl >= this.min) {
            this.toggle(off);
            this.complete = true;
            drawCursor(0, -1, -1);
            emit("@output", this.value, this.label);
        } else {
            emit("nope@speaker");
        }
    }
    draw(dur, x, y) {
        const vl = this.vl;
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
            drawCursor(dur, x + offset + this.cursor, y);
        }
    }
}
export default Input;

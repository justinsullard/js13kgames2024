bus.once("init", ({ $screen, $pointy, image }) => {
    let char = 208;
    let trauma = 0;
    
    const draw = (dur, x = -2, y = -2) => {
        const offset = (dur / 240) % 2 | 0;
        bus.emit("update@screen", 257, trauma ? 209 + trauma | 0 : char + offset);
        bus.emit("move@screen", 257, x / 40, -y / 30);
        trauma = Math.max(0, trauma - 0.125);
    };
    bus.on("trauma@cursor", (x = 1) => trauma = Math.max(0, Math.min(6, x)));
    bus.on("draw@cursor", draw);
});

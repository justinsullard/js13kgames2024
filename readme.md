# Codetastrophy

You are the Cursor.
Chug coffee.
Throw code.
Fix bugs.

## Todo

* [ ] Finish Todo List
* [ ] Build Screen
    * [x] Build Font
        * [x] Initial Layout
        * [x] Alpha Analysis
        * [x] Build 3D texture
    * [x] Build Theme
    * [ ] Build Renderer
        * [ ] Data Buffers
            * [x] Distortion Uniforms (vec2 skew, vec2 warp, vec2 mask, float fxmix, float brightness, float contrast, float saturation)
            * [x] Cell Data 4800x(vec2 offset, vec4 fg, vec4 bg, float alpha, float char)
            * [ ] FX Data (80 x 60 UInt8 rgba ImageData)
            * [x] Entity Data (256 bugs, 1 dumpster fire, 1 cursor, 1 pointer)
        * [x] Vertex Shader
        * [x] Fragment Shader
        * [ ] Render Loop : cells.each(FX ?? Grid ?? flames) + entities
        * [ ] Print functions
            * [x] Print
            * [x] Printf
            * [ ] FX
* [ ] Build Mouse
    * [ ] Add Handlers
    * [x] Add Entity
    * [x] Use canvas to spoof cursor
* [ ] Build Speaker
    * [ ] Build Scales (7 of 13, 5 of 13, 5 of 7 of 13)
    * [ ] Build Rhythms
        * [ ] (1-13) of (15, 17, 23, 26)
        * [ ] fizzbuzz of (15, 17, 23, 26)
    * [ ] Build Instruments
        * [ ] Stereo Distance (`fade = xdiff, volume = 1/dist**2`)
        * [ ] Voice (attack, release, waveform, etc.)
    * [ ] Build Memes
        * [ ] Full Scale
            * [ ] Root focus (2, 1, 1, 1, 1, 1, 1)
            * [ ] Traditional (4, 1, 2, 2, 3, 1, 1)
            * [ ] Alternative (2, 1, 2, 1, 3, 2, 2)
            * [ ] Weird (1, 4, 1, 2, 1, 3, 3)
        * [ ] Penta Scale
            * [ ] Basic [2, 1, 2, 2, 1]
            * [ ] Odd [1, 2, 1, 1, 3]
    * [ ] Build Control
        * [ ] FX Controls
        * [ ] Music Controls
* [ ] Build Initial Game Components
    * [ ] Grid
        * [ ] Gutter
        * [ ] Map
        * [ ] MiniMap
        * [ ] Editor Plugins
        * [ ] Network
        * [ ] Disks
        * [ ] Backlog
        * [ ] Memory
        * [ ] Clipboard
        * [ ] Peripherals
        * [ ] Billing
        * [ ] Status Bar
        * [ ] Audio
        * [ ] Logs
        * [ ] Informant
        * [ ] Input
        * [ ] Title
        * [ ] MainMenu
        * [ ] RepoMenu
        * [ ] Achievements
        * [ ] RepoAchievements
        * [ ] Readme
        * [ ] RepoReadme
        * [ ] Marketplace
        * [ ] PurchaseConfirmation
        * [ ] Purchase
    * [ ] BusinessStuff
        * [ ] Thing
        * [ ] Prop
        * [ ] Link
        * [ ] View
        * [ ] Store
        * [ ] Action
    * [ ] Code
    * [ ] Hardware
    * [ ] Bugs
    * [ ] Plugins
* [ ] Build generator for BS to Code
* [ ] Build generator for Code to BS
* [ ] Transpile game to Code, then to BS
* [ ] Generate game from BS
* [ ] Unleash True Evil

## Dev Log

### Day 0: 2024-08-13T11:00:00.000Z

It begins. I'm still sick, but got some rest last night.
I logged on at 6 am to and checked out the [js13kGames 2024 start and theme announcement](https://medium.com/js13kgames/js13kgames-2024-start-and-theme-announcement-5d734f77da68).

> This year’s theme is… Triskaidekaphobia.

Well... it just so happens that this fits perfectly with what I wanted to do this year: **Codetastrophy**.

The basic idea is to make a *roguelike* game (I think that qualifies under the Berlin Interpretation) in which you play as the cursor in a code editor.

Most of the traditional *roguelike* elements will be present, albeit some in a different form, with some new things that are code-editor exclusives (I don't play enough games to know if these mechanics have equivalents).

I've been working on my WebGL2 skills enough that I think I can make something that will work for this. Worst case scenario I can fall back to using regular canvas calls, but I don't think that will be necessary, and honestly WebGL2 forces me to use some data structures that will improve performance in other ways.

The high-level application flow should look something like this,  with the `RepoLoop` being the main game loop, described in more detail below:

```mermaid
stateDiagram-v2
	[*] --> Title : Initial Load
    Title --> Username : First Visit
    Username --> Password : Valid Username
    Password --> PasswordFail : Invalid Password
    PasswordFail --> Password : automatic
    Password --> MainMenu : Valid Password
    Title --> MainMenu : Subsequent Visit
    MainMenu --> Loading : Continue
    MainMenu --> Creating : New Repo
    MainMenu --> Readme : Readme
    MainMenu --> Achievements : Achievements
    Loading --> RepoLoop : automatic
	Creating --> RepoLoop : automatic
	RepoLoop --> RepoMenu : Esc
	RepoLoop --> EndScreen : automatic on death or completion
	EndScreen --> MainMenu : Review Complete
    RepoMenu --> RepoLoop : Esc or Continue
    RepoMenu --> Saving : Save Game
    RepoMenu --> QuitConfirmation : Quit and Give Up
    RepoMenu --> RepoAchievements : Achievements
    RepoMenu --> RepoReadme : Readme
    RepoMenu --> Marketplace : Market
    Marketplace --> PurchaseConfirmation : Buy
    PurchaseConfirmation --> Marketplace : Esc or No
    PurchaseConfirmation --> Purchase : Yes
    Purchase --> Marketplace : automatic
    Marketplace --> RepoMenu : Esc
    Saving --> MainMenu : automatic
    QuitConfirmation --> RepoMenu : Esc
    QuitConfirmation --> MainMenu : Yes
    Readme --> MainMenu : Esc
    Achievements --> MainMenu : Esc
    RepoAchievements --> RepoMenu : Esc
    RepoReadme --> RepoMenu : Esc
```

### Day 1: 2024-08-14T11:00:00.000Z

I am still sick, so was not able to put in as much time as I had hoped.
Aside from letting a little proof of concept I whipped together from while I was learning WebGL2 that was running on my screen all day I didn't get to coding until after work. And supper. And medication.

Needless to say all I was really able to focus on was getting the rendering working with all of the uniforms I want to have control over, and some prelimary work on the mouse pointer.

I did manage to put together a local dev server, and work out the various imports, and now having something rendering to the screen and updating the mouse pointer at least.

Tomorrow I'll get the initial loading screen and (hopefully) login process working.

## References and Credits

There are a large number of sources that I could name, but most directly over the last couple of months, and the development of this game, these specific sources proved valuable in my efforts to implement **Codetastrophy**.

* <https://noisehack.com/custom-audio-effects-javascript-web-audio-api/>
* <https://www.shadertoy.com/view/XsjSzR>
* <https://medium.com/eureka-engineering/image-processing-with-webgl-c2af552e8df0>
* <https://www.shadertoy.com/view/XsK3RR>
* <https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API>
* <https://dev.to/lucasdamianjohnson/using-binary-data-in-javascript-3fn2>
* <https://jsisweird.com/>
* <https://github.com/denysdovhan/wtfjs>
* <https://en.wikipedia.org/wiki/JSFuck>
* <https://github.com/scriptfoundry/WebGL2-Videos-Materials>
* [Image Optimizer](https://github.com/GijsGoudzwaard/Image-Optimizer)
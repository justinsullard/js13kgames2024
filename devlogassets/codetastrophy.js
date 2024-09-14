var chars = `Nil
StartHeading
StartText
EndText
EndTransmission
Query
Ack
Bell
Backspace
Tab
LineFeed
VerticalTab
FormFeed
CarriageReturn
ShiftOut
ShiftIn
Link
Dev1
Dev2
Dev3
Dev4
Nak
Idle
EndBlock
Cancel
EndMedium
Substitute
Escape
FileSeperator
GroupSeperator
RecordSeperator
UnitSeperator
Pad
Not
Quote
Color
Element
Percent
And
Conj
Register
End
Multiply
Add
Comma
Subtract
Dot
Divide
AvidReader
BugHunter
CodeCoverage
FullStack
GiveUp
HerdingCats
HideAndSeek
ITSupport
JobSecurity
1337 h@x0r
SamuraioCertificate
ScrumLord
TechGeek
Equal
GreaterThan
If
@HackAway
ACatch
BEnclose
CCommentOut
DDeconstruct
EReplace
FImplement
GMultiThread
HPromise
IPull
JPush
KRefactor
LReplace
MRevert
NSimplify
OTest
PProp
QLink
RMutation
SProp
TThing
UAction
VView
W
X
Y
Z
[
\\Backslash
]
^
_
\`Tick
aAim
bChoose
cConfirm
dDestroy
eHandle
fInput
gPickup
hPlace
iRequest
jSort
kThrow
lUse
m
n
o
p
q
r
s
t
u
v
w
x
y
z
{
|
}
~
Delete
Chat
Accept
Reject
Achievement
TimeBomb
Move
Cut
Paste
Blip
Laugh
Ghost
Star
Sleep
BizzNick
Mail
Bookmark
Title0
Title1
Title2
Title3
Title4
Title5
Title6
Stink
Headphones
Squat
Elf
OctoNot
ScriptKitty
BizzNess
Chart
QuadChopper
Sort
Display
Cart
Clip
Javascript
Markdown
CSS
HTML
World
Squid
Ika
Goblin
Derp
SecretAgent
Shield
Pudding
MouseAim
MouseMove
LineWrap
Informant
AIGuru
MiniMap
OverClock
Spellcheck
LintRuler
Paginator
WelcomeMat
Folded
Contortionist
Prompt
Network
Speaker
Core
Memory
Disk
Plugin
Coffee
BrowniePoints
Readme
Script
Debugger
Todo
Completed
Warning
Bugs
Help
Outage
Idea
Cursor0
Cursor1
Cursor2
Cursor3
Cursor4
Cursor5
Death0
Death1
Volume0
Volume1
Volume2
Volume3
Volume4
Volume5
Volume6
Lock
KeyControls
ArrowUp
ArrowLeft
ArrowDown
ArrowRight
Spacebar
Shift
Enter
Mouse
Aim
LeftClick
RightClick
DumpsterFire
RubberDuck
Reference
Definition
Lint
Typo
EldritchOne
PackRat
CargoCultist
CallbackHell
TrueEvil
MagicNumber
PatchMonkey
PerformanceHog
MudBall
DangerousFugitive
UndeadCode
CopyPasta
ProxyWarrior
ScopeCreep`;
var game = `## Actor
x:
y:
plugins:[]
buzz:
disks:[]
ram:[]
## Container
content:
fault:
## Disk
Container
## Memory
Container
## Grid
x:
y:
info:
## Plugin
Grid
char:
name:
key:
## Todo
Grid
done:
name:
## Clipboard
Grid
## Console
Grid
## Viewer
Grid
key:
## Info
Grid
quote:
author:
`;
var ast = `## Func
generator:false
async:false
params:[]
body:
## Super
## Import
## CatchClause
param:
body:
## ClassBody
body:[]
## Comment
value:
## Conditional
test:
consequent:
alternate:
## Declaration
trailingComments:[]
## Expression
trailingComments:[]
## File
path:
program:
## Identifier
name:
## LeftRight
left:
right:
## Literal
value:
## Keyword
word:
## Method
Func
key:
computed:false
kind:method
## PrivateName
id:
## Program
body:[]
## Property
key:
computed:false
value:
leadingComments:[]
trailingComments:[]
## Raw
raw:
cooked:
## RestElement
argument:
## Specifier
local:
## SpreadElement
argument:
## Statement
leadingComments:[]
trailingComments:[]
## TemplateElement
value:
tail:false
## VariableDeclarator
id:
init:
## ArrayExpression
Expression
elements:[]
## ArrayPattern
Pattern
elements:[]
## ArrowFunctionExpression
Expression,Func
## AssignmentExpression
Expression,LeftRight
operator:=
## AssignmentPattern
Pattern,LeftRight
## AwaitExpression
Expression
argument:
## BinaryExpression
Expression,LeftRight
operator:===
## BlockStatement
Statement
body:[]
## BooleanLiteral
Literal
value:false
## BreakStatement
Statement
label:
## CallExpression
Expression
callee:
arguments:[]
## ClassDeclaration
Declaration
id:
superClass:
body:
## ClassMethod
Method
static:false
## ClassPrivateMethod
ClassMethod
## ClassPrivateProperty
ClassProperty
key:
computed:false
## ClassProperty
Property
static:false
## CommentBlock
Comment
value:
## CommentLine
Comment
value:
## ConditionalExpression
Expression,Conditional
## ContinueStatement
Statement
label:
## DebuggerStatement
Statement
## DoWhileStatement
WhileStatement
test:
body:
## EmptyStatement
Statement
## ExportDefaultDeclaration
Declaration
declaration:
## ExportNamedDeclaration
Declaration
specifiers:[]
declaration:
## ExportSpecifier
Specifier
exported:
## ExpressionStatement
Statement
expression:
## ForInStatement
Statement,LeftRight
body:
## ForOfStatement
Statement,LeftRight
await:false
body:
## ForStatement
Statement
init:
test:
update:
body:
## FunctionDeclaration
Declaration
id:
## FunctionExpression
Expression
id:
## IfStatement
Statement,Conditional
## ImportDeclaration
Declaration
specifiers:[]
source:
## ImportSpecifier
Specifier
imported:
## ImportDefaultSpecifier
Specifier
## LabeledStatement
Statement
body:
label:
## LogicalExpression
Expression
left:
operator:&&
right:
## MemberExpression
Expression
object:
computed:false
property:
## NewExpression
Expression
callee:
arguments:[]
## NullLiteral
Literal
## NumericLiteral
Literal
value:
## ObjectExpression
Expression
properties:[]
## ObjectMethod
Method
## ObjectPattern
Pattern
properties:[]
## ObjectProperty
Property
key:
computed:false
value:
shorthand:false
## OptionalCallExpression
CallExpression
callee:
arguments:[]
optional:true
## OptionalMemberExpression
MemberExpression
object:
computed:false
property:
optional:true
## Pattern
## RegExpLiteral
Literal
pattern:
flags:
## ReturnStatement
Statement
argument:
## SequenceExpression
Expression
expressions:[]
## StringLiteral
Literal
value:
## TemplateLiteral
Literal
expression:[]
quasis:[]
## ThisExpression
Expression
## TryStatement
Statement
block:
handler:
finalizer:
## UnaryExpression
Expression
operator:!
prefix:false
argument:
## UpdateExpression
Expression
operator:++
prefix:false
argument:
## VariableDeclaration
Declaration
kind:var
declarations:[]
## WhileStatement
Statement
test:
body:
## YieldExpression
Expression
delegate:false
argument:`;
var nodes = ast.split("## ").filter(Boolean).map(def => {
    const lines = def.split("\n").map(x => x.trim()).filter(Boolean);
    if (!lines) { return; }
    const name = lines.shift();
    const mixins = lines[0]?.match(/^\w[,\w+]*$/) ? lines.shift().split(",") : [];
    const props = lines.map(p => p.split(":").map(x => x ? (x === "[]" ? [] : (x.match(/^\d+$/) ? Number(x) : x)) : null));
    return { name, mixins, props, refs: [], dep: 0 };
}).filter(Boolean).reduce((r, o) => {
    r[o.name] = o;
    return r;
}, {});
var defs = [...Object.values(nodes)];
defs.forEach((x) => {
    x.mixins.map(o => nodes[o]).forEach((o) => {
        x.props = x.props.filter(p => !o.props.find(r => p[0] === r[0] && p[1] === r[1]));
        o.refs.push(x.name);
    });
});
var paths = (x) => [
    [x.name],
    ...x.mixins.reduce((r, k) => [...r, ...paths(nodes[k]).map(p => [x.name, ...p])], [])
];
defs.forEach((x) => x.paths = paths(x).filter(p => p.length > 1));

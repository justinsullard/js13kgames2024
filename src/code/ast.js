// Abstract Syntax Tree
import Invocation from "../bs/invocation.js";
import entries from "../util/entries.js";
import reduce from "../util/reduce.js";
import sort from "../util/sort.js";
import map from "../util/map.js";
const AST = {
  ArrayExpression: [{ elements: [] }, ["Expression"]],
  ArrayPattern: [{ elements: [] }, ["Pattern"]],
  ArrowFunctionExpression: [
    {
      generator: false,
      async: false,
      params: [],
      body: [],
    },
    ["Expression"],
  ],
  AssignmentExpression: [
    { left: null, operator: "=", right: null },
    ["Expression"],
  ],
  AssignmentPattern: [{ left: null, right: null }, ["Pattern"]],
  AwaitExpression: [{ argument: null }, ["Expression"]],
  BinaryExpression: [
    { left: null, operator: "===", right: null },
    ["Expression"],
  ],
  BlockStatement: [
    { leadingComments: [], trailingComments: [], body: [] },
    ["Statement"],
  ],
  BooleanLiteral: [{ value: false }, ["Literal"]],
  BreakStatement: [
    { leadingComments: [], trailingComments: [], label: null },
    ["Statement"],
  ],
  CallExpression: [
    { trailingComments: [], callee: null, arguments: [] },
    ["Expression"],
  ],
  CatchClause: [{ param: null, body: null }],
  ClassBody: [{ body: [] }],
  ClassDeclaration: [
    { trailingComments: [], id: null, superClass: null, body: null },
    ["Declaration"],
  ],
  ClassMethod: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
      static: false,
    },
    ["Method"],
  ],
  ClassPrivateMethod: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
      static: false,
    },
    ["ClassMethod"],
  ],
  ClassPrivateProperty: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
      static: false,
    },
    ["ClassProperty"],
  ],
  ClassProperty: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
      static: false,
    },
    ["Property"],
  ],
  Comment: [{ value: "" }],
  CommentBlock: [{ value: "" }, ["Comment"]],
  CommentLine: [{ value: "" }, ["Comment"]],
  ConditionalExpression: [
    { test: null, consequent: null, alternate: null },
    ["Expression"],
  ],
  ContinueStatement: [
    { label: null },
    ["Statement"],
  ],
  DebuggerStatement: [
    {},
    ["Statement"],
  ],
  Declaration: [{ trailingComments: [] }],
  DoWhileStatement: [
    { test: null, body: null },
    ["WhileStatement"],
  ],
  EmptyStatement: [
    { },
    ["Statement"],
  ],
  ExportDefaultDeclaration: [
    { declaration: null },
    ["Declaration"],
  ],
  ExportNamedDeclaration: [
    { specifiers: [], declaration: null },
    ["Declaration"],
  ],
  ExportSpecifier: [{ local: null, exported: null }],
  Expression: [{ trailingComments: [] }],
  ExpressionStatement: [
    { expression: null },
    ["Statement"],
  ],
  File: [{ program: null }],
  ForInStatement: [
    {
      left: null,
      right: null,
      body: null,
    },
    ["Statement"],
  ],
  ForOfStatement: [
    {
      await: false,
      left: null,
      right: null,
      body: null,
    },
    ["Statement"],
  ],
  ForStatement: [
    {
      init: null,
      test: null,
      update: null,
      body: null,
    },
    ["Statement"],
  ],
  FunctionDeclaration: [
    {
      id: null,
      generator: false,
      async: false,
      params: [],
      body: null,
    },
    ["Declaration"],
  ],
  FunctionExpression: [
    {
      generator: false,
      async: false,
      id: null,
      params: [],
      body: null,
    },
    ["Expression"],
  ],
  Identifier: [{ n: "a", undefined: undefined }],
  IfStatement: [
    {
      test: null,
      consequent: null,
      alternate: null,
    },
    ["Statement"],
  ],
  Import: [{}],
  ImportDeclaration: [
    { specifiers: [], source: null },
    ["Declaration"],
  ],
  ImportSpecifier: [{ imported: null, local: null }],
  ImportdefaultSpecifier: [{ local: null }],
  Keyword: [{ word: null }],
  LabeledStatement: [
    { body: null, label: null },
    ["Statement"],
  ],
  Literal: [{}],
  LogicalExpression: [
    { left: null, operator: "&&", right: null },
    ["Expression"],
  ],
  MemberExpression: [
    { object: null, computed: false, property: null },
    ["Expression"],
  ],
  Method: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
    },
  ],
  NewExpression: [
    { callee: null, arguments: [] },
    ["Expression"],
  ],
  NullLiteral: [{}, ["Literal"]],
  NumericLiteral: [{ value: null }, ["Literal"]],
  ObjectExpression: [{ properties: [] }, ["Expression"]],
  ObjectMethod: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
    },
    ["Method"],
  ],
  ObjectPattern: [{ properties: [] }, ["Pattern"]],
  ObjectProperty: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
      shorthand: false,
    },
    ["Property"],
  ],
  OptionalCallExpression: [
    { callee: null, arguments: [], optional: true },
    ["CallExpression"],
  ],
  OptionalMemberExpression: [
    {
      object: null,
      computed: false,
      property: null,
      optional: true,
    },
    ["MemberExpression"],
  ],
  Pattern: [],
  PrivateName: [{ id: null }],
  Program: [{ body: [] }],
  Property: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
    },
  ],
  Raw: [{ raw: "", cooked: "" }],
  RegExpLiteral: [{ pattern: null, flags: null }, ["Literal"]],
  RestElement: [{ argument: null }],
  ReturnStatement: [
    { argument: null },
    ["Statement"],
  ],
  SequenceExpression: [
    { expressions: [] },
    ["Expression"],
  ],
  SpreadElement: [{ argument: null }],
  Statement: [{ leadingComments: [], trailingComments: [] }],
  StringLiteral: [{ value: null }, ["Literal"]],
  Super: [],
  TemplateElement: [{ value: null, tail: false }],
  TemplateLiteral: [{ expression: [], quasis: [] }, ["Literal"]],
  ThisExpression: [{ trailingComments: [] }, ["Expression"]],
  TryStatement: [
    {
      leadingComments: [],
      trailingComments: [],
      block: null,
      handler: null,
      finalizer: null,
    },
    ["Statement"],
  ],
  UnaryExpression: [
    { trailingComments: [], operator: "!", prefix: false, argument: null },
    ["Expression"],
  ],
  UpdateExpression: [
    { trailingComments: [], operator: "++", prefix: false, argument: null },
    ["Expression"],
  ],
  VariableDeclaration: [
    { trailingComments: [], kind: "var", declarations: [] },
    ["Declaration"],
  ],
  VariableDeclarator: [{ id: null, init: null }],
  WhileStatement: [
    { leadingComments: [], trailingComments: [], test: null, body: null },
    ["Statement"],
  ],
  YieldExpression: [
    { trailingComments: [], delegate: false, argument: null },
    ["Expression"],
  ],
};
export default reduce(
    sort(entries(AST), ([an, [ap, am = []]], [bn, [bp, bm = []]]) => am.length - bm.length || an.length - bn.length || (an < bn ? -1 : 1)),
    (r, [name, [props = {}, mixins = []]]) => {
        r[name] = Invocation(name, map(mixins, k => r[k]), entries(props));
        return r;
    },
    {}
);
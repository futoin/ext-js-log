
# About

This is a set of additional implementations of FTN9 AuditLog for various purposes.

Alternative implementation of:

    FTN9: FutoIn Interface - AuditLog
    Version: 1.0 (client)

Spec: [FTN9: FutoIn Interface - AuditLog v1.x](http://specs.futoin.org/final/preview/ftn9_if_auditlog.html)

Author: [Andrey Galkin](mailto:andrey@futoin.org)

# Installation for Node.js

Command line:
```sh
$ npm install @futoin/log --save
```

    
# API documentation

## Classes

<dl>
<dt><a href="#ConsoleFace">ConsoleFace</a> ⇐ <code>LogFace</code></dt>
<dd><p>Console-based AuditLog Native interface</p>
<p>Register with ConsoleFace.register().</p>
<p>NOTE: this is a lightweight console logger suitable
for stdout-based log collection.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#FutoInLog">FutoInLog</a></dt>
<dd><p><strong>window.FutoInLog</strong> - Browser-only reference to futoin-log</p>
</dd>
<dt><a href="#Log">Log</a></dt>
<dd><p><strong>window.futoin.Log</strong> - Browser-only reference to futoin-log</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#initFace">initFace(asi, ccm, [options])</a></dt>
<dd><p>Initial client</p>
</dd>
</dl>

<a name="ConsoleFace"></a>

## ConsoleFace ⇐ <code>LogFace</code>
Console-based AuditLog Native interface

Register with ConsoleFace.register().

NOTE: this is a lightweight console logger suitable
for stdout-based log collection.

**Kind**: global class  
**Extends**: <code>LogFace</code>  

* [ConsoleFace](#ConsoleFace) ⇐ <code>LogFace</code>
    * [new ConsoleFace(impl, info)](#new_ConsoleFace_new)
    * [.msg(lvl, txt)](#LogFace+msg)
    * [.hexdump(lvl, txt, data)](#LogFace+hexdump)

<a name="new_ConsoleFace_new"></a>

### new ConsoleFace(impl, info)
ConsoleFace setup


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| impl | <code>SimpleCCMImpl</code> |  | CCM impl |
| info | <code>object</code> |  | info object |
| info.options | <code>object</code> |  | options |
| [info.options.console] | <code>object</code> |  | Console |
| [info.options.logTime] | <code>object</code> | <code>false</code> | enable timestamps |
| [info.options.logLevel] | <code>object</code> | <code>debug</code> | debug level |

<a name="LogFace+msg"></a>

### consoleFace.msg(lvl, txt)
Log message

**Kind**: instance method of [<code>ConsoleFace</code>](#ConsoleFace)  
**Overrides**: [<code>msg</code>](#LogFace+msg)  

| Param | Type | Description |
| --- | --- | --- |
| lvl | <code>string</code> | debug|info|warn|error|security |
| txt | <code>string</code> | message to log |

<a name="LogFace+hexdump"></a>

### consoleFace.hexdump(lvl, txt, data)
Log message

**Kind**: instance method of [<code>ConsoleFace</code>](#ConsoleFace)  
**Overrides**: [<code>hexdump</code>](#LogFace+hexdump)  

| Param | Type | Description |
| --- | --- | --- |
| lvl | <code>string</code> | debug|info|warn|error|security |
| txt | <code>string</code> | message to log |
| data | <code>string</code> | raw data |

<a name="FutoInLog"></a>

## FutoInLog
**window.FutoInLog** - Browser-only reference to futoin-log

**Kind**: global variable  
<a name="Log"></a>

## Log
**window.futoin.Log** - Browser-only reference to futoin-log

**Kind**: global variable  
<a name="initFace"></a>

## initFace(asi, ccm, [options])
Initial client

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| asi | <code>AsyncSteps</code> | async steps interface |
| ccm | <code>SimpleCCM</code> | CCM interface |
| [options] | <code>object</code> | options |
| [options.logType] | <code>string</code> | type of logger |



*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.



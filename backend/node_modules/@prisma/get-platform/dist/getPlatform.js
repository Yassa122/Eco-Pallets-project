"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getPlatform_exports = {};
__export(getPlatform_exports, {
  computeLibSSLSpecificPaths: () => import_chunk_YA4C6GNG.computeLibSSLSpecificPaths,
  getArchFromUname: () => import_chunk_YA4C6GNG.getArchFromUname,
  getBinaryTargetForCurrentPlatform: () => import_chunk_YA4C6GNG.getBinaryTargetForCurrentPlatform,
  getBinaryTargetForCurrentPlatformInternal: () => import_chunk_YA4C6GNG.getBinaryTargetForCurrentPlatformInternal,
  getPlatformInfo: () => import_chunk_YA4C6GNG.getPlatformInfo,
  getPlatformInfoMemoized: () => import_chunk_YA4C6GNG.getPlatformInfoMemoized,
  getSSLVersion: () => import_chunk_YA4C6GNG.getSSLVersion,
  getos: () => import_chunk_YA4C6GNG.getos,
  parseDistro: () => import_chunk_YA4C6GNG.parseDistro,
  parseLibSSLVersion: () => import_chunk_YA4C6GNG.parseLibSSLVersion,
  parseOpenSSLVersion: () => import_chunk_YA4C6GNG.parseOpenSSLVersion,
  resolveDistro: () => import_chunk_YA4C6GNG.resolveDistro
});
module.exports = __toCommonJS(getPlatform_exports);
var import_chunk_YA4C6GNG = require("./chunk-YA4C6GNG.js");
var import_chunk_XC47443Z = require("./chunk-XC47443Z.js");
var import_chunk_XFO73BBC = require("./chunk-XFO73BBC.js");
var import_chunk_UPBZT3NW = require("./chunk-UPBZT3NW.js");

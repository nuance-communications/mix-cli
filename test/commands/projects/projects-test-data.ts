/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  configure: {
    flags: {
      'data-pack': 'en-US@4.7.0',
      project: 1922,
    },
    response: {
      data: {
        id: 'long-random-job-id',
      },
    },
  },
  destroy: {
    flags: {
      project: 1922,
    },
    response: {
      data: {}
    },
  },
  export: {
    flags: {
      filepath: 'filename',
      project: 1922,
      name: 'ACME',
    },
    response: {
      data: {}
    },
  },
  rename: {
    flags: {
      project: 1922,
      name: 'ACME-1234',
    },
    response: {
      data: {displayName: 'ACME-1234'}
    },
  },
  replace: {
    flags: {
      confirm: '1922',
      project: 1922,
      filepath: './myProject.zip',
    },
    response: {
      data: {
        id: 'long-random-job-id',
      },
    },
  },
  request: {
    projectId: 1922,
    locale: 'en-US',
    params: {
      orgId: 1,
    },
  },

  response: { projects: [
    { id: "8681", displayName: "EricCTEEllipsisDemo", languageTopic: "gen", channels: [ { channel: { id: "10311", displayName: "Omni Channel VA", codeName: "Omni Channel VA", modes: [ "AUDIO_SCRIPT", "DTMF", "INTERACTIVITY", "RICH_TEXT", "TTS", ], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.5.0", isActive: true, }, ], baseDatapack: "", createTime: "2020-03-25T12:32:07.247Z", updateTime: "2020-05-21T15:48:23Z", }, { id: "26066", displayName: "DateEntityTest", languageTopic: "sie", channels: [ { channel: { id: "38122", displayName: "IVR channel", codeName: "IVR channel", modes: ["AUDIO_SCRIPT", "DTMF"], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.1.0", isActive: true, }, ], baseDatapack: "", createTime: "2021-05-27T14:42:52.386Z", updateTime: "2021-05-27T14:42:49Z", }, { id: "26793", displayName: "decimalAssingAndCompare", languageTopic: "sie", channels: [ { channel: { id: "39404", displayName: "Digital VA text", codeName: "Digital VA text", modes: ["INTERACTIVITY", "RICH_TEXT"], color: "LIGHT_ORANGE", }, isActive: true, }, { channel: { id: "39403", displayName: "IVR channel", codeName: "IVR channel", modes: ["AUDIO_SCRIPT", "DTMF", "TTS"], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.1.0", isActive: true, }, ], baseDatapack: "", createTime: "2021-06-24T06:13:07.528Z", updateTime: "2021-06-24T06:13:07Z", }, { id: "26167", displayName: "IsAEnityRelationship2", languageTopic: "gen", channels: [ { channel: { id: "38278", displayName: "Digital VA text", codeName: "Digital VA text", modes: [ "AUDIO_SCRIPT", "DTMF", "INTERACTIVITY", "RICH_TEXT", "TTS", ], color: "LIGHT_ORANGE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.7.0", isActive: true, }, ], baseDatapack: "", createTime: "2021-06-01T06:52:44.548Z", updateTime: "2021-06-01T06:52:45Z", }, { id: "128", displayName: "21012020_renamed", languageTopic: "gen", channels: [ { channel: { id: "218", displayName: "web", codeName: "web", modes: ["RICH_TEXT"], color: "LIGHT_ORANGE", }, isActive: true, }, { channel: { id: "217", displayName: "ivr", codeName: "ivr", modes: ["AUDIO_SCRIPT", "TTS"], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.5.0", isActive: true, }, ], baseDatapack: "", createTime: "2020-01-21T17:47:04.737Z", updateTime: "2020-05-11T15:06:31Z", }, { id: "10064", displayName: "UX New Color Test", languageTopic: "gen", channels: [ { channel: { id: "12924", displayName: "bevelAndEmboss", codeName: "bevelAndEmboss", modes: ["RICH_TEXT"], color: "YELLOW", }, isActive: true, }, { channel: { id: "12923", displayName: "unicorn vomit", codeName: "unicorn vomit", modes: ["AUDIO_SCRIPT", "RICH_TEXT"], color: "PINK", }, isActive: true, }, { channel: { id: "12922", displayName: "TVRainbow", codeName: "TVRainbow", modes: ["AUDIO_SCRIPT", "RICH_TEXT"], color: "CORN_FLOWER", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.5.0", isActive: true, }, ], baseDatapack: "", createTime: "2020-04-01T14:03:17.447Z", updateTime: "2020-04-01T20:07:13Z", }, { id: "26211", displayName: "ACME-3978", languageTopic: "sie", channels: [ { channel: { id: "38355", displayName: "Omni Channel VA", codeName: "Omni Channel VA", modes: [ "AUDIO_SCRIPT", "DTMF", "INTERACTIVITY", "RICH_TEXT", "TTS", ], color: "CORN_FLOWER", }, isActive: true, }, { channel: { id: "38354", displayName: "Digital VA voice", codeName: "Digital VA voice", modes: [ "AUDIO_SCRIPT", "DTMF", "INTERACTIVITY", "RICH_TEXT", "TTS", ], color: "GREEN", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.1.0", isActive: true, }, ], baseDatapack: "", createTime: "2021-06-02T14:59:55.273Z", updateTime: "2021-06-08T10:45:15Z", }, { id: "10871", displayName: "EricCTPromotionDemo", languageTopic: "gen", channels: [ { channel: { id: "14470", displayName: "Omni Channel VA", codeName: "Omni Channel VA", modes: [ "AUDIO_SCRIPT", "DTMF", "INTERACTIVITY", "RICH_TEXT", "TTS", ], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.5.0", isActive: true, }, ], baseDatapack: "", createTime: "2020-04-23T15:51:16.520Z", updateTime: "2020-04-23T18:46:38Z", },
    { id: "26166", displayName: "IsAEntityRelationship", languageTopic: "gen", channels: [ { channel: { id: "38277", displayName: "Digital VA text", codeName: "Digital VA text", modes: [ "AUDIO_SCRIPT", "DTMF", "INTERACTIVITY", "RICH_TEXT", "TTS", ], color: "LIGHT_ORANGE", }, isActive: true, }, { channel: { id: "38276", displayName: "IVR channel", codeName: "IVR channel", modes: ["AUDIO_SCRIPT", "DTMF"], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-GB", version: "4.1.0", isActive: true, }, ], baseDatapack: "", createTime: "2021-06-01T06:29:49.087Z", updateTime: "2021-06-01T06:49:09Z", },
    { id: "26836", displayName: "DecimalDatatype", languageTopic: "gen", channels: [ { channel: { id: "39492", displayName: "Digital VA text", codeName: "Digital VA text", modes: ["INTERACTIVITY", "RICH_TEXT"], color: "LIGHT_ORANGE", }, isActive: true, }, { channel: { id: "39491", displayName: "IVR channel", codeName: "IVR channel", modes: ["AUDIO_SCRIPT", "DTMF", "TTS"], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.7.0", isActive: true, }, ], baseDatapack: "", createTime: "2021-06-28T09:12:49.630Z", updateTime: "2021-06-28T09:12:49Z", },
    { id: "26291", displayName: "XDLGTOOL-4095", languageTopic: "sie", channels: [ { channel: { id: "38501", displayName: "IVR channel", codeName: "IVR channel", modes: ["AUDIO_SCRIPT", "DTMF", "TTS"], color: "PURPLE", }, isActive: true, }, ], datapacks: [ { displayName: "en-US", version: "4.1.0", isActive: true, }, ], baseDatapack: "", createTime: "2021-06-07T07:18:55.840Z", updateTime: "2021-06-07T07:18:55Z", }, ], },
  buildResponse:  { id: "e01669b9-d572-45d4-9fcc-270947494556", type: "BUILD_MODELS", projectId: "1922", status: "RUNNING", createTime: "2021-09-13T17:44:42Z", updateTime: "2021-09-13T17:44:42Z", }
}

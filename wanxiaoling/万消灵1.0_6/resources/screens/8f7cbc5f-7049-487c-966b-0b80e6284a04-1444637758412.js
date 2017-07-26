jQuery("#simulation")
  .on("click", ".s-8f7cbc5f-7049-487c-966b-0b80e6284a04 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Hotspot_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "isbackward": true,
                    "transition": "slideleft"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("click", ".s-8f7cbc5f-7049-487c-966b-0b80e6284a04 .toggle", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-checkbox-on-light_8")) {
      if(jFirer.data("jimHasToggle")) {
        jFirer.removeData("jimHasToggle");
        jEvent.undoCases(jFirer);
      } else {
        jFirer.data("jimHasToggle", true);
        event.backupState = true;
        event.target = jFirer;
        cases = [
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimSetValue",
                    "parameter": {
                      "target": "#s-checkbox-on-light_8",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_8": {
                        "attributes": {
                          "font-size": "17.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_8 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_8 span": {
                        "attributes": {
                          "color": "#333333",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
                          "font-size": "17.0pt"
                        }
                      }
                    } ],
                    "exectype": "serial",
                    "delay": 0
                  }
                ]
              }
            ],
            "exectype": "serial",
            "delay": 0
          }
        ];
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-checkbox-on-light_9")) {
      if(jFirer.data("jimHasToggle")) {
        jFirer.removeData("jimHasToggle");
        jEvent.undoCases(jFirer);
      } else {
        jFirer.data("jimHasToggle", true);
        event.backupState = true;
        event.target = jFirer;
        cases = [
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimSetValue",
                    "parameter": {
                      "target": "#s-checkbox-on-light_9",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_9": {
                        "attributes": {
                          "font-size": "17.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_9 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_9 span": {
                        "attributes": {
                          "color": "#333333",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
                          "font-size": "17.0pt"
                        }
                      }
                    } ],
                    "exectype": "serial",
                    "delay": 0
                  }
                ]
              }
            ],
            "exectype": "serial",
            "delay": 0
          }
        ];
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-checkbox-on-light_10")) {
      if(jFirer.data("jimHasToggle")) {
        jFirer.removeData("jimHasToggle");
        jEvent.undoCases(jFirer);
      } else {
        jFirer.data("jimHasToggle", true);
        event.backupState = true;
        event.target = jFirer;
        cases = [
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimSetValue",
                    "parameter": {
                      "target": "#s-checkbox-on-light_10",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_10": {
                        "attributes": {
                          "font-size": "17.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_10 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_10 span": {
                        "attributes": {
                          "color": "#333333",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
                          "font-size": "17.0pt"
                        }
                      }
                    } ],
                    "exectype": "serial",
                    "delay": 0
                  }
                ]
              }
            ],
            "exectype": "serial",
            "delay": 0
          }
        ];
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-checkbox-on-light_11")) {
      if(jFirer.data("jimHasToggle")) {
        jFirer.removeData("jimHasToggle");
        jEvent.undoCases(jFirer);
      } else {
        jFirer.data("jimHasToggle", true);
        event.backupState = true;
        event.target = jFirer;
        cases = [
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimSetValue",
                    "parameter": {
                      "target": "#s-checkbox-on-light_11",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_11": {
                        "attributes": {
                          "font-size": "17.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_11 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_11 span": {
                        "attributes": {
                          "color": "#333333",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
                          "font-size": "17.0pt"
                        }
                      }
                    } ],
                    "exectype": "serial",
                    "delay": 0
                  }
                ]
              }
            ],
            "exectype": "serial",
            "delay": 0
          }
        ];
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-checkbox-on-light_12")) {
      if(jFirer.data("jimHasToggle")) {
        jFirer.removeData("jimHasToggle");
        jEvent.undoCases(jFirer);
      } else {
        jFirer.data("jimHasToggle", true);
        event.backupState = true;
        event.target = jFirer;
        cases = [
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimSetValue",
                    "parameter": {
                      "target": "#s-checkbox-on-light_12",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_12": {
                        "attributes": {
                          "font-size": "17.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_12 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_12 span": {
                        "attributes": {
                          "color": "#333333",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
                          "font-size": "17.0pt"
                        }
                      }
                    } ],
                    "exectype": "serial",
                    "delay": 0
                  }
                ]
              }
            ],
            "exectype": "serial",
            "delay": 0
          }
        ];
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-checkbox-on-light_13")) {
      if(jFirer.data("jimHasToggle")) {
        jFirer.removeData("jimHasToggle");
        jEvent.undoCases(jFirer);
      } else {
        jFirer.data("jimHasToggle", true);
        event.backupState = true;
        event.target = jFirer;
        cases = [
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimSetValue",
                    "parameter": {
                      "target": "#s-checkbox-on-light_13",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_13": {
                        "attributes": {
                          "font-size": "17.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_13 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_13 span": {
                        "attributes": {
                          "color": "#333333",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
                          "font-size": "17.0pt"
                        }
                      }
                    } ],
                    "exectype": "serial",
                    "delay": 0
                  }
                ]
              }
            ],
            "exectype": "serial",
            "delay": 0
          }
        ];
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-checkbox-on-light_14")) {
      if(jFirer.data("jimHasToggle")) {
        jFirer.removeData("jimHasToggle");
        jEvent.undoCases(jFirer);
      } else {
        jFirer.data("jimHasToggle", true);
        event.backupState = true;
        event.target = jFirer;
        cases = [
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimSetValue",
                    "parameter": {
                      "target": "#s-checkbox-on-light_14",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_14": {
                        "attributes": {
                          "font-size": "17.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_14 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-checkbox-on-light_14 span": {
                        "attributes": {
                          "color": "#333333",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
                          "font-size": "17.0pt"
                        }
                      }
                    } ],
                    "exectype": "serial",
                    "delay": 0
                  }
                ]
              }
            ],
            "exectype": "serial",
            "delay": 0
          }
        ];
        jEvent.launchCases(cases);
      }
    }
  })
  .on("pageload", ".s-8f7cbc5f-7049-487c-966b-0b80e6284a04 .pageload", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Label_5")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-Label_5": {
                      "attributes": {
                        "-webkit-transform": "rotate(180deg)",
                        "-moz-transform": "rotate(180deg)",
                        "transform": "rotate(180deg)"
                      }
                    }
                  },{
                    "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-Label_5": {
                      "attributes-ie": {
                        "-ms-transform": "rotate(180.0deg)"
                      }
                    }
                  },{
                    "#s-8f7cbc5f-7049-487c-966b-0b80e6284a04 #s-Label_5": {
                      "attributes-ie8lte": {
                        "-ms-filter": " progid:DXImageTransform.Microsoft.Matrix(SizingMethod = 'auto expand',M11=-1.0,M12=-1.2246467991473532E-16,M21=1.2246467991473532E-16,M22=-1.0)",
                        "filter": " progid:DXImageTransform.Microsoft.Matrix(SizingMethod = 'auto expand',M11=-1.0,M12=-1.2246467991473532E-16,M21=1.2246467991473532E-16,M22=-1.0)"
                      },
                      "expressions-ie8lte": {
                        "margin-left": "jimUtil.calculateRotationShift(180.0,$target).x + 'px'",
                        "margin-top": "jimUtil.calculateRotationShift(180.0,$target).y + 'px'"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  });
jQuery("#simulation")
  .on("click", ".s-eb6641de-f3ad-44d5-8aca-3965f98691d9 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Button_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_3 span": {
                      "attributes": {
                        "color": "#80B8F1",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "12.0pt"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimPause",
                  "parameter": {
                    "pause": 300
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_3 span": {
                      "attributes": {
                        "color": "#007DFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "12.0pt"
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
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/94ee3025-7adb-4a1f-8947-060b4d35df78",
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
    } else if(jFirer.is("#s-Label_58")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_58 span": {
                      "attributes": {
                        "color": "#80B8F1",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "12.0pt"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_59 span": {
                      "attributes": {
                        "color": "#80B8F1",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "IOS8-Icons-Regular,Arial",
                        "font-size": "20.0pt"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimPause",
                  "parameter": {
                    "pause": 300
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_58 span": {
                      "attributes": {
                        "color": "#007DFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "12.0pt"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_59 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "IOS8-Icons-Regular,Arial",
                        "font-size": "20.0pt"
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
    } else if(jFirer.is("#s-Label_59")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/c8225202-c76a-46e1-aeb5-c87ad76d4223",
                    "transition": "slideright"
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
    } else if(jFirer.is("#s-Label_18")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18": {
                      "attributes": {
                        "background-color": "#80B8F1",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18": {
                      "attributes-ie": {
                        "-pie-background": "#80B8F1",
                        "-pie-poll": "false"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimPause",
                  "parameter": {
                    "pause": 200
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18": {
                      "attributes": {
                        "background-color": "#157EFB",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18 span": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18": {
                      "attributes-ie": {
                        "-pie-background": "#157EFB",
                        "-pie-poll": "false"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19": {
                      "attributes-ie": {
                        "-pie-background": "transparent",
                        "-pie-poll": "false"
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
    } else if(jFirer.is("#s-Label_19")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_18": {
                      "attributes-ie": {
                        "-pie-background": "transparent",
                        "-pie-poll": "false"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19": {
                      "attributes": {
                        "background-color": "#80B8F1",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19": {
                      "attributes-ie": {
                        "-pie-background": "#80B8F1",
                        "-pie-poll": "false"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimPause",
                  "parameter": {
                    "pause": 200
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19": {
                      "attributes": {
                        "background-color": "#157EFB",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19 span": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Label_19": {
                      "attributes-ie": {
                        "-pie-background": "#157EFB",
                        "-pie-poll": "false"
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
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/c7d37358-ccdf-4df3-8d6d-bce76192ecd8"
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
    } else if(jFirer.is("#s-Button_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_1": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_1 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_1 span": {
                      "attributes": {
                        "color": "#80B8F1",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "12.0pt"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimPause",
                  "parameter": {
                    "pause": 300
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_1": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_1 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-eb6641de-f3ad-44d5-8aca-3965f98691d9 #s-Button_1 span": {
                      "attributes": {
                        "color": "#007DFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "12.0pt"
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
  })
  .on("drag", ".s-eb6641de-f3ad-44d5-8aca-3965f98691d9 .drag", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getDirectEventFirer(this);
    if(jFirer.is("#s-Ellipse_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimMove",
                  "parameter": {
                    "target": "#s-Group_2",
                    "top": {
                      "type": "nomove"
                    },
                    "left": {
                      "type": "movewithcursor",
                      "value": null
                    },
                    "containment": false
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
  .on("dragend", ".s-eb6641de-f3ad-44d5-8aca-3965f98691d9 .drag", function(event, data) {
    jimEvent(event).jimRestoreDrag(jQuery(this));
  })
  .on("dragend", ".s-eb6641de-f3ad-44d5-8aca-3965f98691d9 .drag", function(event, data) {
    jimEvent(event).jimDestroyDrag(jQuery(this));
  })
  .on("pageload", ".s-eb6641de-f3ad-44d5-8aca-3965f98691d9 .pageload", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Label_35")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Label_35",
                    "value": {
                      "action": "jimConcat",
                      "parameter": [ {
                        "action": "jimSubstring",
                        "parameter": [ {
                          "action": "jimSystemTime"
                        },"0","5" ]
                      }," PM" ]
                    }
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
  .on("focusin", ".s-eb6641de-f3ad-44d5-8aca-3965f98691d9 .focusin", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Input-text")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text",
                    "value": ""
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
    } else if(jFirer.is("#s-Input-text_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text_1",
                    "value": ""
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
    } else if(jFirer.is("#s-Input-text_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text_2",
                    "value": ""
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
    } else if(jFirer.is("#s-Input-text_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text_3",
                    "value": ""
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
    } else if(jFirer.is("#s-Input-text_4")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text_4",
                    "value": ""
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
    } else if(jFirer.is("#s-Input-text_5")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text_5",
                    "value": ""
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
    } else if(jFirer.is("#s-Input-text_6")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text_6",
                    "value": ""
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
  });
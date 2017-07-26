jQuery("#simulation")
  .on("click", ".s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Label_58")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_58 span": {
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
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_59 span": {
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
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_58 span": {
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
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_59 span": {
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
                    "target": "screens/b5d89b91-9bce-4edf-aabd-82667d3cd3e5",
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
    } else if(jFirer.is("#s-Rich_text_33")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/0cda1285-e6cf-4cff-974f-7011a93a63cd"
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
    } else if(jFirer.is("#s-Label_24")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_24": {
                      "attributes": {
                        "background-color": "#80B8F1",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_24": {
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
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_24": {
                      "attributes": {
                        "background-color": "#157EFB",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_24": {
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
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_33": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_33": {
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
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/0cda1285-e6cf-4cff-974f-7011a93a63cd"
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
    } else if(jFirer.is("#s-Label_33")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_24": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_24": {
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
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_33": {
                      "attributes": {
                        "background-color": "#80B8F1",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_33": {
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
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_33": {
                      "attributes": {
                        "background-color": "#157EFB",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 #s-Label_33": {
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
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("pageload", ".s-7c326f1c-4a3b-4017-bf2a-ebb3fb9673f8 .pageload", function(event, data) {
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
  });
jQuery("#simulation")
  .on("click", ".s-bffc2f1a-5047-4895-adbc-e2d23cab0695 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Button-blue")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue": {
                      "attributes": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#80B8F1",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#80B8F1",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#80B8F1",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#80B8F1",
                        "border-radius": "5px 5px 5px 5px",
                        "padding-top": "3px",
                        "padding-right": "3px",
                        "padding-bottom": "3px",
                        "padding-left": "3px",
                        "font-size": "11.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      },
                      "expressions": {
                        "width": "Math.max(358 - 1 - 1 - 3 - 3, 0) + 'px'",
                        "height": "Math.max(35 - 1 - 1 - 3 - 3, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue span": {
                      "attributes": {
                        "color": "#80B8F1",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "11.0pt"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#80B8F1",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#80B8F1",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#80B8F1",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#80B8F1",
                        "border-radius": "5px 5px 5px 5px",
                        "padding-top": "3px",
                        "padding-right": "3px",
                        "padding-bottom": "3px",
                        "padding-left": "3px"
                      },
                      "expressions-ie": {
                        "width": "Math.max(358 - 1 - 1 - 3 - 3, 0) + 'px'",
                        "height": "Math.max(35 - 1 - 1 - 3 - 3, 0) + 'px'"
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
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue": {
                      "attributes": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#157EFB",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#157EFB",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#157EFB",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#157EFB",
                        "border-radius": "5px 5px 5px 5px",
                        "padding-top": "3px",
                        "padding-right": "3px",
                        "padding-bottom": "3px",
                        "padding-left": "3px",
                        "font-size": "11.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      },
                      "expressions": {
                        "width": "Math.max(358 - 1 - 1 - 3 - 3, 0) + 'px'",
                        "height": "Math.max(35 - 1 - 1 - 3 - 3, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "11.0pt"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button-blue": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#157EFB",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#157EFB",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#157EFB",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#157EFB",
                        "border-radius": "5px 5px 5px 5px",
                        "padding-top": "3px",
                        "padding-right": "3px",
                        "padding-bottom": "3px",
                        "padding-left": "3px"
                      },
                      "expressions-ie": {
                        "width": "Math.max(358 - 1 - 1 - 3 - 3, 0) + 'px'",
                        "height": "Math.max(35 - 1 - 1 - 3 - 3, 0) + 'px'"
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
                    "target": "screens/b5d89b91-9bce-4edf-aabd-82667d3cd3e5"
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
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_1": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_1 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_1 span": {
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
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_1": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_1 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_1 span": {
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
                    "target": "screens/6a50a557-2220-42e3-ad70-75768153fb8b"
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
    } else if(jFirer.is("#s-Button_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_3 span": {
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
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Button_3 span": {
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
                    "target": "screens/028ea545-7a83-4785-9a54-270be725c943",
                    "transition": "slideleft"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "parallel",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("click", ".s-bffc2f1a-5047-4895-adbc-e2d23cab0695 .toggle", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Check-box")) {
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
                      "target": "#s-Check-box",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Check-box": {
                        "attributes": {
                          "font-size": "20.0pt",
                          "font-family": "IOS8-Icons-Regular,Arial"
                        }
                      }
                    },{
                      "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Check-box .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-bffc2f1a-5047-4895-adbc-e2d23cab0695 #s-Check-box span": {
                        "attributes": {
                          "color": "#A9A9A9",
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
        jEvent.launchCases(cases);
      }
    }
  })
  .on("pageload", ".s-bffc2f1a-5047-4895-adbc-e2d23cab0695 .pageload", function(event, data) {
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
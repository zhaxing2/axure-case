jQuery("#simulation")
  .on("click", ".s-dc676842-c3be-4aec-be91-4a14539544b0 .click", function(event, data) {
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
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_58 span": {
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
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_59 span": {
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
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_58 span": {
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
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Label_59 span": {
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
    } else if(jFirer.is("#s-Button_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Button_3 span": {
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
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-dc676842-c3be-4aec-be91-4a14539544b0 #s-Button_3 span": {
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
    } else if(jFirer.is("#s-Hotspot_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "isbackward": true
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
  .on("pageload", ".s-dc676842-c3be-4aec-be91-4a14539544b0 .pageload", function(event, data) {
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
  .on("focusin", ".s-dc676842-c3be-4aec-be91-4a14539544b0 .focusin", function(event, data) {
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
    } else if(jFirer.is("#s-Input-text_8")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Input-text_8",
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
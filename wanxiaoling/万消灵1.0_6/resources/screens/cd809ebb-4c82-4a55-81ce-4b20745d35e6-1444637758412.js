jQuery("#simulation")
  .on("click", ".s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Flat-button-dark")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/2751b3de-bdf6-401d-ac61-7da7ec4fda65",
                    "transition": "pop"
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
    } else if(jFirer.is("#s-Flat-button-dark_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/0d49ead2-443f-4f9c-92b5-81818ae5571a",
                    "transition": "pop"
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
  .on("click", ".s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 .toggle", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-radio-button-off-dark")) {
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
                      "target": "#s-radio-button-off-dark",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark": {
                        "attributes": {
                          "font-size": "20.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark span": {
                        "attributes": {
                          "color": "#8AD9D2",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
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
          },
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimShow",
                    "parameter": {
                      "target": "#s-Panel_2"
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
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-radio-button-off-dark_1")) {
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
                      "target": "#s-radio-button-off-dark_1",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark_1": {
                        "attributes": {
                          "font-size": "20.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark_1 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark_1 span": {
                        "attributes": {
                          "color": "#8AD9D2",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
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
          },
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimShow",
                    "parameter": {
                      "target": "#s-Panel_3"
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
        jEvent.launchCases(cases);
      }
    } else if(jFirer.is("#s-radio-button-off-dark_2")) {
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
                      "target": "#s-radio-button-off-dark_2",
                      "value": ""
                    },
                    "exectype": "serial",
                    "delay": 0
                  },
                  {
                    "action": "jimChangeStyle",
                    "parameter": [ {
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark_2": {
                        "attributes": {
                          "font-size": "20.0pt",
                          "font-family": "materialdesignjim-Regular,Arial"
                        }
                      }
                    },{
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark_2 .valign": {
                        "attributes": {
                          "vertical-align": "middle",
                          "text-align": "left"
                        }
                      }
                    },{
                      "#s-cd809ebb-4c82-4a55-81ce-4b20745d35e6 #s-radio-button-off-dark_2 span": {
                        "attributes": {
                          "color": "#8AD9D2",
                          "text-align": "left",
                          "text-decoration": "none",
                          "font-family": "materialdesignjim-Regular,Arial",
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
          },
          {
            "blocks": [
              {
                "actions": [
                  {
                    "action": "jimShow",
                    "parameter": {
                      "target": "#s-Panel_1"
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
        jEvent.launchCases(cases);
      }
    }
  });
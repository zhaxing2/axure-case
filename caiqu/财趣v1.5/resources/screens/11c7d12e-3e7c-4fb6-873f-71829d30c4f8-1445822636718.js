jQuery("#simulation")
  .on("click", ".s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 .click", function(event, data) {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_58 span": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_59 span": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_58 span": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_59 span": {
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
                    "target": "screens/b6517062-d87c-4e26-aeb1-f367d8401faa",
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
    } else if(jFirer.is("#s-Plus")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/98b3468c-2b11-4fd6-827f-12264e082f0a"
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
    } else if(jFirer.is("#s-Label_19")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
                      "attributes": {
                        "background-color": "#80B8F1",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
                      "attributes": {
                        "background-color": "#157EFB",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19 span": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
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
                        "border-radius": "0px 0px 0px 0px",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
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
                        "border-radius": "0px 0px 0px 0px",
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
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
                    "target": "screens/359b9519-e788-4f4c-82c3-c6183ff6cd19"
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
    } else if(jFirer.is("#s-Label_20")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
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
                        "border-radius": "0px 0px 0px 0px",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
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
                        "border-radius": "0px 0px 0px 0px",
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
                      "attributes": {
                        "background-color": "#80B8F1",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
                      "attributes": {
                        "background-color": "#157EFB",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20 span": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
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
    } else if(jFirer.is("#s-Label_21")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19 span": {
                      "attributes": {
                        "color": "#007DFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_19": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
                      "attributes": {
                        "background-color": "#80B8F1",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
                      "attributes": {
                        "background-color": "#157EFB",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21 span": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_21": {
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
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
                      "attributes": {
                        "background-color": "transparent",
                        "background-image": "none",
                        "font-size": "9.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20 span": {
                      "attributes": {
                        "color": "#157EFB",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "Roboto-Regular,Arial",
                        "font-size": "9.0pt"
                      }
                    }
                  },{
                    "#s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 #s-Label_20": {
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
                    "target": "screens/51f97917-f54a-402f-bea6-0edd2700fae1"
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
    } else if(jFirer.is("#s-Hotspot_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/a0c7bbaf-a869-4f0e-918d-95d2dd034f82"
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
  .on("pageload", ".s-11c7d12e-3e7c-4fb6-873f-71829d30c4f8 .pageload", function(event, data) {
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
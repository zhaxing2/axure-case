jQuery("#simulation")
  .on("click", ".s-88059376-f97a-4e68-b208-48dea6a7c66e .click", function(event, data) {
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_58 span": {
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_59 span": {
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_58 span": {
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Label_59 span": {
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
                    "target": "screens/45cbe5cb-eb26-4be1-a8d0-4f81887654c0",
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
    } else if(jFirer.is("#s-cover_6")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_6": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_6": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_6": {
                      "attributes-ie8lte": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_6": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_6": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_6": {
                      "attributes-ie8lte": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
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
                    "target": "screens/04f2ca00-8810-4c22-8285-8217d4cc55cc"
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
    } else if(jFirer.is("#s-Button_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_2": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_2 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_2 span": {
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_2": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_2 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_2 span": {
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
    } else if(jFirer.is("#s-cover_7")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_7": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_7": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_7": {
                      "attributes-ie8lte": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_7": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_7": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_7": {
                      "attributes-ie8lte": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
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
                    "target": "screens/04f2ca00-8810-4c22-8285-8217d4cc55cc"
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_3 span": {
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_3 span": {
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
    } else if(jFirer.is("#s-cover_8")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_8": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_8": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_8": {
                      "attributes-ie8lte": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_8": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_8": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-cover_8": {
                      "attributes-ie8lte": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
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
                    "target": "screens/04f2ca00-8810-4c22-8285-8217d4cc55cc"
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
    } else if(jFirer.is("#s-Button_4")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_4": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_4 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_4 span": {
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
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_4": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_4 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-88059376-f97a-4e68-b208-48dea6a7c66e #s-Button_4 span": {
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
                    "target": "screens/237463c0-e203-43e5-8716-20d4f0581ffd"
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
    } else if(jFirer.is("#s-Hotspot_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/ed412935-4095-4ccb-93b7-91cdd7acc15a"
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
    } else if(jFirer.is("#s-Hotspot_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/947db2e5-986d-439d-8325-bd5b93a46a61"
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
  .on("pageload", ".s-88059376-f97a-4e68-b208-48dea6a7c66e .pageload", function(event, data) {
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
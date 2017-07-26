jQuery("#simulation")
  .on("click", ".s-6709a53d-60b3-4498-bf73-977706fff4da .click", function(event, data) {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_58 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_59 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_58": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_58 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_58 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_59": {
                      "attributes": {
                        "font-size": "20.0pt",
                        "font-family": "IOS8-Icons-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_59 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "left"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Label_59 span": {
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
    } else if(jFirer.is("#s-cover")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover": {
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
                    "target": "screens/ed394f1a-9163-4db0-8e3b-af12f68091cb"
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
    } else if(jFirer.is("#s-cover_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_1": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_1": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_1": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_1": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_1": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_1": {
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
    } else if(jFirer.is("#s-cover_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_2": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_2": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_2": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_2": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_2": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_2": {
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
                    "target": "screens/aca47310-9962-4616-a1fa-3c6ae13977ed"
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
    } else if(jFirer.is("#s-cover_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_3": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_3": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_3": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_3": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_3": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_3": {
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
                    "target": "screens/a749d93b-9475-44a2-90c7-99e3204d537a"
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
    } else if(jFirer.is("#s-cover_4")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_4": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_4": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_4": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_4": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_4": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_4": {
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
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Label-blue")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/8cb5378f-eb11-4136-9927-865379d11512",
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
    } else if(jFirer.is("#s-cover_5")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_5": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_5": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_5": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_5": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_5": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_5": {
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
                    "target": "screens/ed394f1a-9163-4db0-8e3b-af12f68091cb"
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_6": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_6": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_6": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_6": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_6": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_6": {
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
    } else if(jFirer.is("#s-cover_7")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_7": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_7": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_7": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_7": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_7": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_7": {
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
                    "target": "screens/aca47310-9962-4616-a1fa-3c6ae13977ed"
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
    } else if(jFirer.is("#s-cover_8")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_8": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_8": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_8": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_8": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_8": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_8": {
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
                    "target": "screens/a749d93b-9475-44a2-90c7-99e3204d537a"
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
    } else if(jFirer.is("#s-cover_9")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_9": {
                      "attributes": {
                        "opacity": "0.75"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_9": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",
                        "filter": "alpha(opacity=75)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_9": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_9": {
                      "attributes": {
                        "opacity": "1.0"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_9": {
                      "attributes-ie": {
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        "filter": "alpha(opacity=100)"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-cover_9": {
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
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Label-blue_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/8cb5378f-eb11-4136-9927-865379d11512",
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
    } else if(jFirer.is("#s-Button_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_1": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_1 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_1 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_1": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_1 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_1 span": {
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
    } else if(jFirer.is("#s-Button_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_2": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_2 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_2 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_2": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_2 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_2 span": {
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
    } else if(jFirer.is("#s-Button_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_3 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_3": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_3 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_3 span": {
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
    } else if(jFirer.is("#s-Button_4")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_4": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_4 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_4 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_4": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_4 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_4 span": {
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
    } else if(jFirer.is("#s-Button_5")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_5": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_5 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_5 span": {
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
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_5": {
                      "attributes": {
                        "font-size": "12.0pt",
                        "font-family": "Roboto-Regular,Arial"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_5 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-6709a53d-60b3-4498-bf73-977706fff4da #s-Button_5 span": {
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
    } else if(jFirer.is("#s-Hotspot_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/a6ac13e2-ef81-4f03-9ce1-d1e0d46dad23"
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
  .on("pageload", ".s-6709a53d-60b3-4498-bf73-977706fff4da .pageload", function(event, data) {
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
    } else if(jFirer.is("#s-Hotspot_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimHide",
                  "parameter": {
                    "target": "#s-Dynamic_Panel_1"
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
  .on("swipedown", ".s-6709a53d-60b3-4498-bf73-977706fff4da .swipedown", function(event, data) {
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
                  "action": "jimShow",
                  "parameter": {
                    "target": "#s-Dynamic_Panel_1",
                    "effect": {
                      "type": "slide",
                      "duration": 500,
                      "direction": "up"
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
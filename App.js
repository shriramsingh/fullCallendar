import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  const [loadingError, setLoadingError] = useState(false);
  const [selectedDate,setSelectedDate  ] = useState()
  const [allEventData, setAllEventData] = useState([
    {
      title: 'Event 1',
      start: '2024-05-10 10:00',
      color: 'red',
      textColor: 'red'
    },
    {
      title: 'Event 3',
      start: '2024-05-10 10:00',
      color: 'green'
    },
    {
      title: 'Event 4',
      start: '2024-05-10 10:00',
      backgroundColor: 'blue'
    },
    {
      title: 'Event 5',
      start: '2024-05-10 10:00',
    },
    {
      title: 'Event 6',
      start: '2024-05-10 10:00',
      
    },
    {
      title: 'Event 7',
      start: '2024-05-10 10:00',
    },
    {
      title: 'Event 2',
      start: '2024-05-15 10:00',
      end: '2024-05-17 12:00',
      backgroundColor: 'blue'
    },
    // Add more events as needed
  ]);

  const onError = () => {
    setLoadingError(true);
  };

  const handleMessage = (event) => {
    // Handle message received from WebView
    // const eventData = JSON.parse(event.nativeEvent.data);
    console.log("event data",event)
    // alert(JSON.stringify(eventData));
    // handleDateSelect(event)
    // Perform further actions with eventData as needed
  };

  const handleDateSelect=(info)=>{
 // alert('Clicked on: ' + info.dateStr);
//  alert('Current view: ' + info.view.type);
 // change the day's background color just for fun
//  info.dayEl.style.backgroundColor = 'red';

const eventData =JSON.parse(info.nativeEvent.data); // Example data to send
console.log("event daa",eventData)
                          // info.dayEl.style.backgroundColor = 'red';
  }

  // console.log(event);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <StatusBar hidden={false} />
      {loadingError ? (
        <Text>Error loading FullCalendar.</Text>
      ) : (
        <WebView
          javaScriptEnabled={true}
          source={{
            html: `
            <!DOCTYPE html>
              <html lang='en'>
                <head>
                  <meta charset='utf-8' />
                  <!--- https://fullcalendar.io/docs/bootstrap5-demo --->
                  <!---<meta id="Viewport" name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"> --->
                  <meta id="Viewport" name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
                  <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>
                  <!-- <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.11/index.global.min.js'></script> -->
                  <!---<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/interaction@6.1.11/index.global.min.js"></script>--->
                  <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.11/index.global.min.js'></script>
                  <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@6.1.11/index.global.min.js'></script>
                  <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/list@6.1.11/index.global.min.js'></script>
                  <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'>
                  <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'>
                  <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/bootstrap5@6.1.11/index.global.min.js'></script>
                  <!---<script src='https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.11/main.min.js'></script>--->
                  <script>                  


                    document.addEventListener('DOMContentLoaded', function() {
                      var customvalue = [];
                      if (window.ReactNativeWebView.injectedObjectJson()) {
                          customValue = JSON.parse(window.ReactNativeWebView.injectedObjectJson()).customValue;
                        }
                      var calendarEl = document.getElementById('calendar');
                      var calendar = new FullCalendar.Calendar(calendarEl, {
                        // plugins: [
                        //   interactionPlugin,
                        //   dayGridPlugin
                        // ],
                        dateClick: function(info) {
                          // const eventData = { dateStr: info.dateStr }; // Example data to send
                          // info.dayEl.style.backgroundColor = 'red';
                          window.ReactNativeWebView.postMessage(JSON.stringify(info));;
                        },
                        themeSystem: 'bootstrap5',
                        initialView: 'dayGridMonth',
                        selectable: true,
                        select: function(info) {
                          // Send selected day data to React Native application
                         
                          // window.ReactNativeWebView.postMessage(JSON.stringify(info.start));
                          window.ReactNativeWebView.postMessage(JSON.stringify(info));
                        },
                        eventLimit: true,
                        events:JSON.parse(customValue),
                        dayMaxEvents: 3,
                        eventClick: function(info) {
                          // Handle the event click here
                          window.ReactNativeWebView.postMessage(JSON.stringify(info));
                        },
                        views: {
                          dayGrid: {
                            buttonText: 'Month', // Customize button text for month view
                          },
                          day: {
                            type: 'dayGrid',
                            duration: { days: 1 }, // Show only one day in day view
                            buttonText: 'Day', // Customize button text for day view
                          },
                          week: {
                            type: 'timeGrid',
                            duration: { weeks: 1 }, // Show one week in week view
                            buttonText: 'Week', // Customize button text for week view
                          }
                        },
                        headerToolbar: {
                          left: 'prev,next today',
                          center: 'title',
                          right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }
                      });
                     
                      calendar.render();
                   
                    });
          
                  </script>
                  <style>
                      button.fc-dayGridMonth-button.btn.btn-primary.active,button.fc-timeGridWeek-button.btn.btn-primary,button.fc-timeGridDay-button.btn.btn-primary,button.fc-listMonth-button.btn.btn-primary, button.fc-today-button.btn.btn-primary{
                          text-transform: capitalize;
                          font-size:10px;
                      } 
                      h2#fc-dom-1 {
                        font-size: 10px;
                    }
                    button.fc-today-button.btn.btn-primary {
                      font-size: 10px;
                  }
                  span.bi.bi-chevron-left, span.bi.bi-chevron-right {
                      font-size: 10px;
                  }
                  #calendar{
                    height:700px;
                  } 
                  </style>
                </head>
                <body>
                  <div id='calendar'></div>
                </body>
              </html>
            `,
          }}
          style={styles.webview}
          originWhitelist={['*']}
          onError={onError}
          injectedJavaScriptObject={{customValue: JSON.stringify(allEventData)}}
          onMessage={handleMessage}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  container1: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;

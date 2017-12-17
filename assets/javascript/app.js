alert("Connect!");
var config = {
    apiKey: "AIzaSyCOMnyUVVjlwLFkt6eYqFua4sQXe7nepY4",
    authDomain: "trainscheduler-902ff.firebaseapp.com",
    databaseURL: "https://trainscheduler-902ff.firebaseio.com",
    projectId: "trainscheduler-902ff",
    storageBucket: "trainscheduler-902ff.appspot.com",
    messagingSenderId: "956058429655"
};
firebase.initializeApp(config);
var dataRef = firebase.database();
initialization();



// Capture Button Click
$("#addTrain").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    // Code for the push
    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTraintime: firstTrainTime,
        frequency: frequency,


    });
    initialization ();
});
dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrainTime);


    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("This is a first train time converted" + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // full list of items to the well
    $("#trainsTable").append("<tr><th scope='col' id='trainName'> " + childSnapshot.val().trainName +
        " </th><th scope='col' id='destination'> " + childSnapshot.val().destination +
        " </th><th scope='col' id='frequency'> " + childSnapshot.val().frequency +
        " </th><th scope='col' id='nexttrain'> " + nextTrain.format("hh:mm") +
        " </th><th scope='col' id='minutesaway'> " + tMinutesTillTrain + " </th></tr>");
    //, function(errorObject) {
    //      console.log("Errors handled: " + errorObject.code);
    //    }
});


function initialization () {
    var trainName = "";
    var destination = "";
    var firstTraintime = "";
    var frequency = "";
}

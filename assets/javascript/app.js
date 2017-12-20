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
// Capture Button Click
$("#addTrain").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();
    // Creates local "temporary" object for holding   data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };
    // Uploads data to the database
    dataRef.ref().push(newTrain);
    //log everthing to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
    //alert
    alert("New Train is added");
    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});
dataRef.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Log everything that's coming out of snapshot
    var TrainName = childSnapshot.val().trainName;
    var Destination = childSnapshot.val().destination;
    var FirstTrainTime = childSnapshot.val().firstTrainTime;
    var Frequency = childSnapshot.val().frequency;
    console.log(TrainName);
    console.log(Destination);
    console.log(FirstTrainTime);
    console.log(Frequency);
    var tFrequency = Frequency;
    // Time is 3:30 AM
    var firstTime = FirstTrainTime;
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
    $("#trainsTable").append("<tr><th scope='col'> " + TrainName +
        " </th><th scope='col'> " + Destination +
        " </th><th scope='col'> " + Frequency +
        " </th><th scope='col'>" + nextTrain.format("hh:mm") +
        " </th><th scope='col'> " + tMinutesTillTrain + " </th></tr>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
//dataRef.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
//
//    initialization ();
//    });

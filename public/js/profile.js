var firebaseConfig = {
    apiKey: "AIzaSyBGtUPKltVYV0pRiLjl-XVG8cuHWkYowOw",
    authDomain: "clownpits--users.firebaseapp.com",
    databaseURL: "https://clownpits--users.firebaseio.com",
    projectId: "clownpits--users",
    storageBucket: "clownpits--users.appspot.com",
    messagingSenderId: "97278489859",
    appId: "1:97278489859:web:dbca84525e1c37744b2536",
    measurementId: "G-TR449M5BSQ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var authstate=firebase.auth();
authstate.onAuthStateChanged(function(user)
{
    //console.log("checking");
    if(user)
    {
        //console.log("yes");
        authstate.currentUser.getIdToken(/* forceRefresh */ true).then(function(id) 
        {
            //console.log(id);
            fetch('https://us-central1-clownpits--users.cloudfunctions.net/modules/users/me',{
                method: 'GET',
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Authorization': 'Bearer '+id
                },
            }).then(res =>{
                if(res.ok)
                {
                    //console.log("Successfull");
                    res.json().then(function(data)
                    {
                        if(data.error)
                        {
                            //console.log("User not verified");
                            document.getElementById("login").style.display="block";
                            document.getElementById("profile").style.display="none";
                        }
                        else
                        {
                            //console.log("User verified");
                            document.getElementById("login").style.display="none";
                            document.getElementById("profile").style.display="block";
                        }
                    });
                }
            });
        })
    }
                                                                             
    else
    {
        //console.log("User not signed in");
        document.getElementById("login").style.display="block";
        document.getElementById("profile").style.display="none";
    }
});  

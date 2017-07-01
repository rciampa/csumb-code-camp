<?php
    if(isset($_GET["id"]) && isset($_GET["speed"]) && isset($_GET["temperature"]) && isset($_GET["pressure"])) {
        $id = $_GET["id"];
        $speed = $_GET["speed"];
        $temperature = $_GET["temperature"];
        $pressure = $_GET["pressure"];
        
        $cloudURL = "https://script.google.com?";
        $cloudURL .= "id=" . $id;
        $cloudURL .= "&speed=" . $speed;
        $cloudURL .= "&temperature=" . $temperature;
        $cloudURL .= "&pressure=" . $pressure;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $cloudURL);
        
        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        // close curl resource to free up system resources 
        curl_close($ch);
    }

?>

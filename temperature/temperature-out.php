<?php
    if(isset($_GET["id"]) && isset($_GET["temperature"])) {
        $id = $_GET["id"];
        $temperature = $_GET["temperature"];
        
        $cloudURL = "https://script.google.com/macros/s/AKfycbzd-Lm_e7_p-cWj86R96d0nU4K828avQq0t-nfxJ_XQFU0MbyA/exec?";
        $cloudURL .= "id=" . $id;
        $cloudURL .= "&temperature=" . $temperature;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $cloudURL);
        
        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        // close curl resource to free up system resources 
        curl_close($ch);
        
        //echo $output;
    }
?>

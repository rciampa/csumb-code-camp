<?php
    if(isset($_GET["id"]) && isset($_GET["uvIntensity"])) {
        $id = $_GET["id"];
        $uvIntensity = $_GET["uvIntensity"];
        
        $cloudURL = "https://script.google.com/macros/s/AKfycbxnRZc6DCh8vX1A49ht5UYl6FF1SUV7nKaFn7dAT48r_rsG3IE/exec?";
        $cloudURL .= "id=" . $id;
        $cloudURL .= "&uvIntensity=" . $uvIntensity;
        
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

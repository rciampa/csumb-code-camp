<?php
    if(isset($_GET["id"]) && isset($_GET["flow"]) && isset($_GET["moisture"])) {
        $id = $_GET["id"];
        $flow = $_GET["flow"];
        $moisture = $_GET["moisture"];
        
        $cloudURL = "https://script.google.com/macros/s/AKfycbytrw9yPMksyHvNX75IcD2RGVsGsVUN4sSpFP9B2LYWYXpLuAU/exec?";
        $cloudURL .= "id=" . $id;
        $cloudURL .= "&flow=" . $flow;
        $cloudURL .= "&moisture=" . $moisture;
        
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

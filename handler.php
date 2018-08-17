<?php
    //db connexion

       $db=new PDO('mysql:host=localhost;dbname=chatbox;charset=utf8','root',
        '',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);


    //analyse the request of (GET) URL to see if we want to write a message
   //or receive one
   $task="list";//lire
   if(array_key_exists('task',$_GET)){ //checks if parametre exists in an array,$_GET is an array
       $task=$_GET['task'];
   }
    if($task=="write"){
       postMessages(); //task demanded is to write a message back
    }else{
       getMessages();
    }




    //read
    function getMessages(){
       //get 20 last messages from database
        global $db;//variable global coz inside the function its unkown
        $results= $db->query("SELECT * FROM messages ORDER BY
        created_at DESC LIMIT 20");
        $messages=$results->fetchAll();
        echo json_encode($messages);//print data in json format
    }
    //write
    function postMessages(){
       //get parametres in Post(author,content)
        global $db;
        if(!array_key_exists('author',$_POST) || !array_key_exists('content',$_POST) ){
            echo json_encode(["status"=>"error","message"=>
            "one field or manu have not been sent"]);
            return; //stops this function from completing
        }
        $author=$_POST['author'];
        $content=$_POST['content'];
        $query=$db->prepare('INSERT INTO messages SET author 
        = :author, content= :content, created_at = NOW()');
        $query->execute([
           "author"=>$author,
           "content"=>$content
        ]);
        //it was sent correctly
        echo json_encode(["status"=>"success"]);


    }

?>
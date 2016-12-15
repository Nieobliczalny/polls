<?php

use Phalcon\Loader;
use Phalcon\Mvc\Micro;
use Phalcon\Di\FactoryDefault;
use Phalcon\Db\Adapter\Pdo\Mysql as PdoMysql;
use PollCreator\Models\Polls;
use PollCreator\Models\Users;
use PollCreator\Entity\Poll;
use Phalcon\Http\Response;

// Use Loader() to autoload our model
$loader = new Loader();

$loader->registerNamespaces(
    [
        "PollCreator\\Models" => __DIR__ . "/../models/",
        "PollCreator\\Entity" => __DIR__ . "/../entity/",
    ]
);

$loader->register();

$di = new FactoryDefault();

// Set up the database service
$di->set(
    "db",
    function () {
        return new PdoMysql(
            [
                "host"     => "localhost",
                "username" => "root",
                "password" => "",
                "dbname"   => "polls",
            ]
        );
    }
);

$app = new Micro($di);

// Retrieves all polls
$app->get(
    "/api/polls",
    function () {
        // Create a response
        $response = new Response();
        $pollsData = Polls::find(
        [
            "status > :status:",
            "bind" => [
                "status"   => 1
            ]
        ]);
        $polls = [];
        // Traversing with a foreach
        foreach ($pollsData as $poll) {
            array_push($polls, new Poll($poll));
        }
        $response->setStatusCode(200, "OK");
        $response->setJsonContent($polls);
        return $response;
    }
);

// Retrieves all polls
$app->get(
    "/api/polls/user/{id:[0-9]+}",
    function ($id) {
        // Create a response
        $response = new Response();
        $pollsData = Polls::find(
        [
            "user = :id:",
            "bind" => [
                "id"   => $id
            ]
        ]);
        $polls = [];
        // Traversing with a foreach
        foreach ($pollsData as $poll) {
            array_push($polls, new Poll($poll));
        }
        $response->setStatusCode(200, "OK");
        $response->setJsonContent($polls);
        return $response;
    }
);

// Retrieves polls based on primary key
$app->get(
    "/api/poll/{id:[0-9]+}",
    function ($id) {
        // Create a response
        $response = new Response();
        $poll = Polls::findFirst($id);
        $response->setStatusCode(200, "OK");
        $response->setJsonContent(new Poll($poll));
        return $response;
    }
);

// Adds a new polls
$app->post(
    "/api/poll",
    function () use ($app){
        // Create a response
        $response = new Response();
        $jsonData = $app->request->getJsonRawBody();
        $poll = new Polls();
        $poll->name = $jsonData->name;
        $poll->Users = Users::findFirst($jsonData->user);
        $poll->status = 1;
        $result = $poll->save();
        if ($result !== false)
        {
            $response->setStatusCode(201, "Created");
            $response->setJsonContent(new Poll($poll));
        }
        else
        {
            $response->setStatusCode(409, "Conflict");
        }
        return $response;
    }
);

// Updates polls based on primary key
$app->put(
    "/api/poll/{id:[0-9]+}",
    function ($id) use ($app){
        // Create a response
        $response = new Response();
        $jsonData = $app->request->getJsonRawBody();
        $poll = Polls::findFirst($id);
        if (isset($jsonData->name)) $poll->name = $jsonData->name;
        if (isset($jsonData->user)) $poll->Users = Users::findFirst($jsonData->user);
        if (isset($jsonData->status)) $poll->status = $jsonData->status;
        $result = $poll->save();
        if ($result !== false)
        {
            $response->setStatusCode(200, "OK");
            $response->setJsonContent(new Poll($poll));
        }
        else
        {
            $response->setStatusCode(409, "Conflict");
        }
        return $response;
    }
);

// Deletes polls based on primary key
$app->delete(
    "/api/poll/{id:[0-9]+}",
    function ($id) {
        // Create a response
        $response = new Response();
        $poll = Polls::findFirst($id);
        $result = $poll->delete();
        if ($result !== false)
        {
            $response->setStatusCode(200, "OK");
            $response->setJsonContent(new Poll($poll));
        }
        else
        {
            $response->setStatusCode(409, "Conflict");
        }
        return $response;
    }
);

$app->handle();
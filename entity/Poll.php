<?php

namespace PollCreator\Entity;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validator\Uniqueness;
use Phalcon\Mvc\Model\Validator\InclusionIn;

class Poll
{
    public $id;
    public $name;
    public $user;
    public $status;
    public $questions;

    public function __construct($poll){
        $this->id = $poll->id;
        $this->name = $poll->name;
        $this->user = $poll->Users;
        $this->status = $poll->status;
        $this->questions = $poll->Questions;
    }
}
<?php

namespace PollCreator\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validator\Uniqueness;
use Phalcon\Mvc\Model\Validator\InclusionIn;

class Polls extends Model
{
    public $id;
    public $name;
    public $user;
    public $status;
    public $questions;
    public function validation()
    {
        // Check if any messages have been produced
        if ($this->validationHasFailed() === true) {
            return false;
        }
    }

    public function initialize()
    {
        $this->belongsTo(
            "user",
            "PollCreator\\Models\\Users",
            "id",
            array('foreignKey' => TRUE, 'alias' => 'Users')
        );
        
        $this->hasMany(
            "id",
            "PollCreator\\Models\\Questions",
            "poll",
            array('foreignKey' => TRUE, 'alias' => 'Questions')
        );
    }
    
    public function afterFetch()
    {
        // Assign cascade data
        $this->user = $this->Users;
        $this->questions = $this->Questions;
    }

    public function afterSave()
    {
        // Assign cascade data
        $this->user = $this->Users;
        $this->questions = $this->Questions;
    }
    
    /*
    public function getUsers()
    {
        return $this->getRelated("Users", null);
    }
    */
}
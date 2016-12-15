<?php

namespace PollCreator\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validator\Uniqueness;
use Phalcon\Mvc\Model\Validator\InclusionIn;

class Users extends Model
{
    public $id;
    public $name;
    public function validation()
    {
        // Check if any messages have been produced
        if ($this->validationHasFailed() === true) {
            return false;
        }
    }

    public function initialize()
    {
        $this->hasMany(
            "id",
            "PollCreator\\Models\\Polls",
            "user",
            array('foreignKey' => TRUE, 'alias' => 'Polls')
        );
    }
}
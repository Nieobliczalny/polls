<?php

namespace PollCreator\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validator\Uniqueness;
use Phalcon\Mvc\Model\Validator\InclusionIn;

class Options extends Model
{
    public $id;
    public $answer;
    public $text;
    public $value;
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
            "answer",
            "PollCreator\\Models\\Answers",
            "id",
            array('foreignKey' => TRUE, 'alias' => 'Answers')
        );
    }
}
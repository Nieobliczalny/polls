<?php

namespace PollCreator\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validator\Uniqueness;
use Phalcon\Mvc\Model\Validator\InclusionIn;

class Questions extends Model
{
    public $id;
    public $question;
    public $required;
    public $type;
    public $poll;
    public $min;
    public $max;
    public $step;
    public $inputtype;
    public $multiple;
    public $allowcustomvalue;
    public $pattern;
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
            "PollCreator\\Models\\Answers",
            "question",
            array('foreignKey' => TRUE, 'alias' => 'Answers')
        );
        $this->belongsTo(
            "poll",
            "PollCreator\\Models\\Polls",
            "id",
            array('foreignKey' => TRUE, 'alias' => 'Polls')
        );
    }
}
<?php

namespace PollCreator\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validator\Uniqueness;
use Phalcon\Mvc\Model\Validator\InclusionIn;

class Answers extends Model
{
    public $id;
    public $question;
    public $allowcustomvalue;
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
            "PollCreator\\Models\\Options",
            "answer",
            array('foreignKey' => TRUE, 'alias' => 'Options')
        );
        $this->belongsTo(
            "question",
            "PollCreator\\Models\\Questions",
            "id",
            array('foreignKey' => TRUE, 'alias' => 'Questions')
        );
    }
}
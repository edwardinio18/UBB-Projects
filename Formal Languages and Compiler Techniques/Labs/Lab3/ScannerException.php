<?php

class ScannerException extends RuntimeException
{
    public function __construct($message)
    {
        parent::__construct($message);
    }
}
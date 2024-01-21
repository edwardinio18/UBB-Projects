<?php

namespace Main\Scanner;

use RuntimeException;

/**
 * ScannerException class
 *
 * A custom exception class for the Scanner class.
 */
class ScannerException extends RuntimeException
{
    /**
     * {@inheritDoc}
     */
    public function __construct($message)
    {
        parent::__construct($message);
    }
}
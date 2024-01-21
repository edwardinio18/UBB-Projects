<?php

namespace Main\Helper;

use DirectoryIterator;

/**
 * FileHelper class
 *
 * The FileHelper class provides helper methods for working with files.
 */
class FileHelper
{
    /**
     * Retrieves the list of problems.
     *
     * @return array An array of problem filenames.
     */
    public function getProblems(): array
    {
        $problems = [];

        $dir = new DirectoryIterator("Problem");
        foreach ($dir as $fileInfo) {
            if (!$fileInfo->isDot()) {
                $problems[] = $fileInfo->getFilename();
            }
        }

        sort($problems);

        return $problems;
    }
}
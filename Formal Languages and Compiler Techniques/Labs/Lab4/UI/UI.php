<?php

namespace UI;

use Main\Helper\FileHelper;

require_once(__DIR__ . "/../Helper/FileHelper.php");

/**
 * UI class
 *
 * The UI class provides methods for printing the UI.
 */
class UI
{
    /**
     * @var FileHelper The FileHelper object.
     */
    private FileHelper $fileHelper;

    /**
     * @var array The list of problems.
     */
    public array $problems;

    public function __construct()
    {
        $this->fileHelper = new FileHelper();
        $this->problems = $this->fileHelper->getProblems();
    }

    /**
     * Prints the main menu.
     *
     * @return void
     */
    public function printMainMenu(): void
    {
        echo "\nMenu:\n";
        echo "1. Use Scanner\n";
        echo "2. Use FA\n";
        echo "0. Exit\n\n";
    }

    /**
     * Prints the menu for the Scanner.
     *
     * @return void
     */
    public function printMenuScanner(): void
    {
        echo "\nMenu:\n";
        foreach ($this->problems as $key => $problem) {
            echo ($key + 1) . ". Run " . $problem . "\n";
        }
        echo "0. Go back\n\n";
    }

    /**
     * Prints the menu for the FA.
     *
     * @return void
     */
    public function printMenuFA(): void
    {
        echo "\nMenu:\n";
        echo "1. Print states\n";
        echo "2. Print alphabet\n";
        echo "3. Print output states\n";
        echo "4. Print initial state\n";
        echo "5. Print transitions\n";
        echo "6. Check word\n";
        echo "7. Get matching substring\n";
        echo "0. Go back\n\n";
    }
}
<?php

namespace Main;

use Main\FA\FA;
use Main\Scanner\Scanner;
use UI\UI;

require_once("UI/UI.php");
require_once("Scanner/Scanner.php");
require_once("FA/FA.php");

/**
 * Main class
 *
 * The Main class is the entry point of the program.
 */
class Main
{
    /**
     * @var UI The UI object.
     */
    private UI $ui;

    /**
     * Main constructor.
     */
    public function __construct()
    {
        $this->ui = new UI();
    }

    /**
     * The main method of the program.
     *
     * @return void
     */
    public function main(): void
    {
        while (true) {
            $this->ui->printMainMenu();
            $option = (int)readline("Enter an option: ");
            if ($option === 0) {
                break;
            } elseif ($option === 1) {
                $scanner = new Scanner();

                while (true) {
                    $this->ui->printMenuScanner();
                    $scannerOption = (int)readline("Enter an option for Scanner: ");
                    switch ($scannerOption) {
                        case 0:
                            break 2;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            $scanner->scan($this->ui->problems[$scannerOption - 1]);
                            break;
                        default:
                            echo "Invalid Scanner option. Please try again.\n";
                            break;
                    }
                }
            } elseif ($option === 2) {
                $fa = new FA("fa.in");

                while (true) {
                    $this->ui->printMenuFA();
                    $faOption = (int)readline("Enter an option for FA: ");
                    if ($faOption === 0) {
                        break;
                    } elseif ($faOption === 1) {
                        $fa->printStates();
                    } elseif ($faOption === 2) {
                        $fa->printAlphabet();
                    } elseif ($faOption === 3) {
                        $fa->printOutputStates();
                    } elseif ($faOption === 4) {
                        $fa->printInitialState();
                    } elseif ($faOption === 5) {
                        $fa->printTransitions();
                    } elseif ($faOption === 6) {
                        while (true) {
                            $word = readline("Enter a word (or type '0' to return to the FA menu): ");
                            if ($word === '0') {
                                break;
                            }
                            $accepted = $fa->checkAccepted($word);
                            if ($accepted) {
                                echo "The word '{$word}' is accepted.\n";
                            } else {
                                echo "The word '{$word}' is NOT accepted.\n";
                            }
                        }
                    } elseif ($faOption === 7) {
                        while (true) {
                            $word = readline("Enter a word (or type '0' to return to the FA menu): ");
                            if ($word === '0') {
                                break;
                            }
                            $longestAccepted = $fa->getNextAccepted($word);
                            if ($longestAccepted) {
                                echo "The longest accepted substring is '{$longestAccepted}'.\n";
                            } else {
                                echo "No accepted substring found.\n";
                            }
                        }
                    } else {
                        echo "Invalid FA option. Please try again.\n";
                    }
                }
            } else {
                echo "Invalid option. Please try again.\n";
            }
        }
    }
}

$main = new Main();
$main->main();
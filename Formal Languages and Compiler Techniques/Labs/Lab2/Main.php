<?php

require_once("SymbolTable.php");

/**
 * Class Main
 * A class to demonstrate the usage of SymbolTable.
 */
class Main
{
    /**
     * Run the main application.
     */
    public static function run(): void
    {
        $identifierTable = new SymbolTable(10);
        $constantTable = new SymbolTable(10);

        $identifierTable->add("a");
        $identifierTable->add("test");
        $identifierTable->add("ALABALAPORTOCALA");
        $identifierTable->add("qlasf");
        $identifierTable->add("gu12g3");

        $constantTable->add(420);
        $constantTable->add("69");
        $constantTable->add("lftc <3");

        $ID = "ALABALAPORTOCALA";
        $foundID = $identifierTable->getPosition($ID);
        if ($foundID != -1) {
            echo "Found identifier at position: " . $foundID . "\n";
        } else {
            echo "Identifier '$ID' not found\n";
        }

        $ID = "nu";
        $foundID = $identifierTable->getPosition($ID);
        if ($foundID != -1) {
            echo "Found identifier at position: " . $foundID . "\n";
        } else {
            echo "Identifier '$ID' not found\n";
        }

        $const = 1;
        $foundConst = $constantTable->getPosition($const);
        if ($foundConst != -1) {
            echo "Found constant at position: " . $foundConst . "\n";
        } else {
            echo "Constant '$const' not found\n";
        }

        $const = "oasuhfo";
        $foundConst = $constantTable->getPosition($const);
        if ($foundConst != -1) {
            echo "Found constant at position: " . $foundConst . "\n";
        } else {
            echo "Constant '$const' not found\n";
        }

        echo "Identifier Table: " . $identifierTable . "\n";
        echo "Constant Table: " . $constantTable . "\n";
    }
}

Main::run();
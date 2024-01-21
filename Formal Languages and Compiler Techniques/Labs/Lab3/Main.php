<?php

require_once("SymbolTable.php");
require_once("Scanner.php");

/**
 * Class Main
 * The main application class.
 */
class Main
{
    /**
     * Run the main application.
     */
    public static function run(): void
    {
        $scanner = new Scanner();
        $p1 = "p1.txt";
        $p2 = "p2.txt";
        $p3 = "p3.txt";
        $p1err = "p1err.txt";
        $scanner->scan($p1);
        $scanner->scan($p2);
        $scanner->scan($p3);
        $scanner->scan($p1err);
    }
}

Main::run();
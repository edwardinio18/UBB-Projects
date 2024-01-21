<?php

require_once("ScannerException.php");

/**
 * The Scanner class is responsible for scanning a program and generating a Program Internal Form (PIF).
 */
class Scanner
{
    /**
     * @var string The input program to be scanned.
     */
    private string $program;

    /**
     * @var array An array to store tokens from the input program.
     */
    private array $tokens;

    /**
     * @var array An array to store reserved words.
     */
    private array $reservedWords;

    /**
     * @var SymbolTable A symbol table to store identifiers.
     */
    private SymbolTable $identifierSymbolTable;

    /**
     * @var SymbolTable A symbol table to store constants.
     */
    private SymbolTable $constantSymbolTable;

    /**
     * @var array The Program Internal Form (PIF) to store the scanned tokens.
     */
    private array $PIF;

    /**
     * @var int The current index in the input program.
     */
    private int $index = 0;

    /**
     * @var int The current line number in the input program.
     */
    private int $currentLine = 1;

    /**
     * Scanner constructor.
     */
    public function __construct()
    {
        $this->identifierSymbolTable = new SymbolTable(100);
        $this->constantSymbolTable = new SymbolTable(100);
        $this->PIF = [];
        $this->reservedWords = [];
        $this->tokens = [];
        try {
            $this->readTokens();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    /**
     * Set the input program to be scanned.
     *
     * @param string $program The input program.
     */
    public function setProgram(string $program): void
    {
        $this->program = $program;
    }

    /**
     * Reads tokens from a file and populates the reservedWords and tokens arrays.
     *
     * @throws Exception If there is an error reading the tokens from the file.
     */
    private function readTokens(): void
    {
        $file = "token.in";
        $lines = file($file, FILE_IGNORE_NEW_LINES);
        foreach ($lines as $token) {
            if ($token != "€" && strlen($token) > 1 && $token != '\n') {
                $this->reservedWords[] = $token;
            } else {
                $this->tokens[] = $token;
            }
        }
    }

    /**
     * Skip spaces and increment the current line number when encountering newline characters.
     */
    private function skipSpaces(): void
    {
        while ($this->index < strlen($this->program) && ctype_space($this->program[$this->index])) {
            if ($this->program[$this->index] == "\n") {
                $this->currentLine++;
            }
            $this->index++;
        }
    }

    /**
     * Skip comments in the input program.
     */
    private function skipComments(): void
    {
        $this->skipSpaces();
        while ($this->index < strlen($this->program)) {
            if (substr($this->program, $this->index, 2) == '//') {
                while ($this->index < strlen($this->program) && $this->program[$this->index] != "\n") {
                    $this->index++;
                }
            } else {
                break;
            }
            $this->skipSpaces();
        }
    }

    /**
     * Extract and process string constants from the input program.
     *
     * @return bool Returns true if a valid string constant is found, false otherwise.
     *
     * @throws ScannerException If there is an issue with the string constant.
     */
    private function treatStringConstant(): bool
    {
        $regexForStringConstant = '/^"[a-zA-Z0-9_ ?:*^+=.,!;]*(?:\\\\n)?"/';
        $input = substr($this->program, $this->index);

        if (!preg_match($regexForStringConstant, $input, $matches)) {
            if (preg_match('/^"[^"]"/', $input)) {
                throw new ScannerException("Invalid string constant at line " . $this->currentLine);
            }
            if (preg_match('/^"[^"]/', $input)) {
                throw new ScannerException("Missing \" at line " . $this->currentLine);
            }
            return false;
        }

        $stringConstant = $matches[0];

        [, $nextCode] = $this->getPosition($stringConstant);
        $position = $this->getPositionInFile("const");
        $this->PIF[] = [$position, $nextCode];
        return true;
    }

    /**
     * Extract and process integer constants from the input program.
     *
     * @return bool Returns true if a valid integer constant is found, false otherwise.
     */
    private function treatIntConstant(): bool
    {
        $regexForIntConstant = '/^-?\d+/';
        $matchCount = preg_match($regexForIntConstant, substr($this->program, $this->index), $matches);

        if (!$matchCount) {
            return false;
        }

        if ($this->PIF[count($this->PIF) - 1][0] == "stergete") {
            array_pop($this->PIF);
            $matches[0] = "-" . $matches[0];
        }

        [, $nextCode] = $this->getPosition($matches[0], "int");
        $position = $this->getPositionInFile("const");
        $this->PIF[] = [$position, $nextCode];
        return true;
    }

    /**
     * Get the position of a constant in the symbol table and add it if it doesn't exist.
     *
     * @param string $match The constant to process.
     * @param string $type The type of the constant (default is "string").
     *
     * @return array An array containing code and hash value.
     */
    private function getPosition(string $match, string $type = "string"): array
    {
        $constant = $type == "int" ? intval($match) : $match;
        $this->index += is_int($constant) && $constant < 0 ? strlen($match) - 1 : strlen($match);

        $this->constantSymbolTable->add($constant);

        return $this->constantSymbolTable->getPosition($constant);
    }

    /**
     * Check if an identifier is valid and not a reserved word.
     *
     * @param string $possibleIdentifier The possible identifier to check.
     * @param string $programSubstring The remaining program substring to check.
     *
     * @return bool Returns true if the identifier is valid, false otherwise.
     */
    private function checkIfValid(string $possibleIdentifier, string $programSubstring): bool
    {
        if (isset($this->PIF[count($this->PIF) - 1][0]) && $this->PIF[count($this->PIF) - 1][0] != "€") {
            if (in_array($possibleIdentifier, $this->reservedWords)) {
                return false;
            }
        }

        if (preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*: (intreg|real|sfoara|caracter);/', $programSubstring)) {
            return true;
        }

        if (preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*: sir\((\d+)\) de (intreg|caracter|sfoara|real);/', $programSubstring)) {
            return true;
        }

        return $this->identifierSymbolTable->contains($possibleIdentifier);
    }

    /**
     * Extract and process identifiers from the input program.
     *
     * @return bool Returns true if a valid identifier is found, false otherwise.
     */
    private function treatIdentifier(): bool
    {
        if (isset($this->PIF[count($this->PIF) - 1][0]) && $this->PIF[count($this->PIF) - 1][0] != "€") {
            return false;
        }

        $regexForIdentifier = '/^([a-zA-Z_][a-zA-Z0-9_]*)/';
        preg_match($regexForIdentifier, substr($this->program, $this->index), $matches);

        if (empty($matches)) {
            return false;
        }

        $identifier = $matches[1];

        if (!$this->checkIfValid($identifier, substr($this->program, $this->index))) {
            return false;
        }

        $this->index += strlen($identifier);

        $this->identifierSymbolTable->add($identifier);
        [, $nextCode] = $this->identifierSymbolTable->getPosition($identifier);
        $position = $this->getPositionInFile("id");
        $this->PIF[] = [$position, $nextCode];

        return true;
    }

    /**
     * Extract and process tokens from the reservedWords and tokens arrays.
     *
     * @return bool Returns true if a valid token is found, false otherwise.
     */
    private function treatFromTokenList(): bool
    {
        $possibleToken = explode(" ", substr($this->program, $this->index))[0];

        foreach ($this->reservedWords as $reservedToken) {
            if ($possibleToken == $reservedToken) {
                $this->index += strlen($reservedToken);
                $position = $this->getPositionInFile($reservedToken);
                $this->PIF[] = [$reservedToken, $position];
                return true;
            } else if (str_starts_with($possibleToken, $reservedToken)) {
                $regex = "/^[a-zA-Z0-9_]*" . preg_quote($reservedToken, '/') . "[a-zA-Z0-9_]+/";

                if (preg_match($regex, $possibleToken)) {
                    return false;
                }

                $this->index += strlen($reservedToken);
                $position = $this->getPositionInFile($reservedToken);
                $this->PIF[] = [$reservedToken, $position];
                return true;
            }
        }

        foreach ($this->tokens as $token) {
            if ($token == $possibleToken) {
                $this->index += strlen($token);
                $position = $this->getPositionInFile($token);
                $this->PIF[] = [$token, $position];
                return true;
            } elseif (str_starts_with($possibleToken, $token)) {
                $this->index += strlen($token);
                $position = $this->getPositionInFile($token);
                $this->PIF[] = [$token, $position];
                return true;
            }
        }

        return false;
    }

    /**
     * Advance to the next token in the input program and add it to the Program Internal Form (PIF).
     *
     * @throws ScannerException If an invalid token is encountered.
     */
    private function nextToken(): void
    {
        $this->skipComments();

        if ($this->index == strlen($this->program)) {
            return;
        }

        if (isset($this->PIF[count($this->PIF) - 1][0]) && $this->PIF[count($this->PIF) - 1][0] != "€" && substr($this->program, $this->index, 1) != "\"") {
            if ($this->treatFromTokenList()) {
                return;
            }
        }

        if ($this->treatIdentifier()) {
            return;
        }

        if ($this->treatStringConstant()) {
            return;
        }

        if ($this->treatIntConstant()) {
            return;
        }

        if ($this->treatFromTokenList()) {
            return;
        }

        throw new ScannerException("Lexical error: invalid token at line " . $this->currentLine . ", index " . $this->index);
    }

    /**
     * Scan the input program and generate the Program Internal Form (PIF).
     *
     * @param string $programFileName The name of the input program file.
     */
    public function scan(string $programFileName): void
    {
        try {
            $this->index = 0;
            $this->currentLine = 1;
            $this->PIF = [];
            $this->identifierSymbolTable = new SymbolTable(100);
            $this->constantSymbolTable = new SymbolTable(100);

            $this->setProgram(file_get_contents($programFileName));

            while ($this->index < strlen($this->program)) {
                $this->nextToken();
            }

            $fileWriter = fopen("PIF" . str_replace(".txt", ".out", $programFileName), "w");
            foreach ($this->PIF as $pair) {
                fwrite($fileWriter, $pair[0] . ", " . $pair[1] . "\n");
            }
            fclose($fileWriter);

            $fileWriter = fopen("ST" . str_replace(".txt", ".out", $programFileName), "w");
            fwrite($fileWriter, "Identifier Symbol Table");
            fwrite($fileWriter, $this->identifierSymbolTable);
            fwrite($fileWriter, "\n\nConstant Symbol Table");
            fwrite($fileWriter, $this->constantSymbolTable);
            fclose($fileWriter);

            echo "Lexically correct\n";
        } catch (Exception|ScannerException $e) {
            echo $e->getMessage() . "\n";
        }
    }

    /**
     * Get the line number at which a specific value is found in a file.
     *
     * @param string $value The value to search for in the file.
     *
     * @return int The line number (1-based) where the value is found. If not found, returns -1.
     */
    public function getPositionInFile(string $value): int
    {
        $file = fopen("token.in", "r");
        $lineNumber = 0;

        while (($line = fgets($file)) !== false) {
            $lineNumber++;
            if (str_contains($line, $value)) {
                fclose($file);
                return $lineNumber;
            }
        }

        fclose($file);

        return -1;
    }
}
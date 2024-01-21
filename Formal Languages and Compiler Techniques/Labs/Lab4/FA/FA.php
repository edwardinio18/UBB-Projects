<?php

namespace Main\FA;

use Exception;
use Main\FA\Transition;

require_once(__DIR__ . "/Transition.php");

/**
 * FA class
 *
 * The FA class represents a finite automaton.
 * It handles the initialization and processing of states, alphabet, transitions,
 * and output states based on a configuration file.
 */
class FA
{
    /**
     * @var string Filename from which the FA is initialized.
     */
    private string $filename;

    /**
     * @var array The states in the FA.
     */
    private array $states = [];

    /**
     * @var array The alphabet of the FA.
     */
    private array $alphabet = [];

    /**
     * @var array Collection of Transition objects representing the FA's transitions.
     */
    private array $transitions = [];

    /**
     * @var string The initial state of the FA.
     */
    private string $initial_state = "";

    /**
     * @var array The output (accepting) states of the FA.
     */
    private array $output_states = [];

    /**
     * FA constructor.
     *
     * @param string $filename The name of the file containing FA configuration.
     */
    public function __construct(string $filename)
    {
        $this->filename = __DIR__ . "/../Input/" . $filename;
        try {
            $this->init();
        } catch (Exception $e) {
            echo "Error when initializing FA: " . $e->getMessage();
        }
    }

    /**
     * Initializes the FA by parsing the file content and setting up states,
     * alphabet, transitions, initial state, and output states.
     *
     * @throws Exception If there is an invalid line in the file.
     */
    private function init(): void
    {
        $regex = "/^([a-z_]*)=/";
        $file_content = file_get_contents($this->filename);
        $lines = explode("\n", $file_content);

        foreach ($lines as $line) {
            if (preg_match($regex, $line, $matches)) {
                $keyword = $matches[1];
                $value = substr($line, strpos($line, "=") + 1);
                switch ($keyword) {
                    case "states":
                        $this->states = $this->parseList($value);
                        break;
                    case "alphabet":
                        $this->alphabet = $this->parseList($value);
                        break;
                    case "out_states":
                        $this->output_states = $this->parseList($value);
                        break;
                    case "initial_state":
                        $this->initial_state = trim($value);
                        break;
                    case "transitions":
                        $this->transitions = $this->parseTransitions($value);
                        break;
                    default:
                        throw new Exception("Invalid line in file");
                }
            }
        }
    }

    /**
     * Parses a list of items separated by commas from a string.
     *
     * @param string $string The string containing the list.
     * @return array An array of trimmed items.
     */
    private function parseList(string $string): array
    {
        $string = trim($string, "{} \t\n\r\0\x0B");
        return array_map('trim', explode(',', $string));
    }

    /**
     * Parses the transitions from a string into an array of Transition objects.
     *
     * @param string $string The string containing the transitions.
     * @return array An array of Transition objects.
     */
    private function parseTransitions(string $string): array
    {
        $transitions = [];
        $transList = explode(';', trim($string, "{} \t\n\r\0\x0B"));
        foreach ($transList as $trans) {
            $parts = explode(',', trim($trans, "() \t\n\r\0\x0B"));
            $transitions[] = new Transition(trim($parts[0]), trim($parts[1]), trim($parts[2]));
        }
        return $transitions;
    }

    /**
     * Prints the list of states in the FA.
     */
    public function printStates(): void
    {
        $this->printListOfString("states", $this->states);
    }

    /**
     * Prints the alphabet used in the FA.
     */
    public function printAlphabet(): void
    {
        $this->printListOfString("alphabet", $this->alphabet);
    }

    /**
     * Prints the output states of the FA.
     */
    public function printOutputStates(): void
    {
        $this->printListOfString("out_states", $this->output_states);
    }

    /**
     * Prints the initial state of the FA.
     */
    public function printInitialState(): void
    {
        echo "initial_state = " . $this->initial_state . "\n";
    }

    /**
     * Prints all transitions in the FA.
     */
    public function printTransitions(): void
    {
        echo "transitions = {";
        $lastIndex = count($this->transitions) - 1;
        foreach ($this->transitions as $i => $transition) {
            /** @var Transition $transition */
            if ($i != $lastIndex) {
                echo "(" . $transition->getFrom() . ", " . $transition->getTo() . ", " . $transition->getLabel() . "); ";
            } else {
                echo "(" . $transition->getFrom() . ", " . $transition->getTo() . ", " . $transition->getLabel() . ")";
            }
        }
        echo "}\n";
    }

    /**
     * Helper function to print a list of strings.
     *
     * @param string $listName The name of the list to print.
     * @param array $list The list of strings to print.
     */
    private function printListOfString(string $listName, array $list): void
    {
        echo $listName . " = {" . implode(', ', $list) . "}\n";
    }

    /**
     * Checks if a given word is accepted by the FA.
     *
     * @param string $word The word to check.
     * @return bool True if the word is accepted, false otherwise.
     */
    public function checkAccepted(string $word): bool
    {
        $wordAsArray = str_split($word);
        $currentState = $this->initial_state;
        $idx = 0;
        foreach ($wordAsArray as $c) {
            $found = false;
            if ($idx >= count($this->transitions)) {
                return false;
            }
            $transition = $this->transitions[$idx];
            if ($transition->getFrom() == $currentState && $transition->getLabel() == $c) {
                $currentState = $transition->getTo();
                ++$idx;
                $found = true;
            }
            if (!$found) {
                return false;
            }
        }
        return in_array($currentState, $this->output_states);
    }

    /**
     * Determines the next accepted word based on the given word's prefix.
     *
     * @param string $word The word to use as a prefix.
     * @return string|null The next accepted word, or null if none is found.
     */
    public function getNextAccepted(string $word): ?string
    {
        $currentState = $this->initial_state;
        $acceptedWord = "";
        for ($i = 0; $i < strlen($word); $i++) {
            $c = $word[$i];
            $newState = null;
            foreach ($this->transitions as $transition) {
                if ($transition->getFrom() === $currentState && $transition->getLabel() === $c) {
                    $newState = $transition->getTo();
                    $acceptedWord .= $c;
                    break;
                }
            }
            if ($newState === null) {
                if (!in_array($currentState, $this->output_states)) {
                    return null;
                } else {
                    return $acceptedWord;
                }
            }
            $currentState = $newState;
        }

        // If the entire word is processed and the current state is an output state, return the word.
        if (in_array($currentState, $this->output_states)) {
            return $acceptedWord;
        }

        return null;
    }
}
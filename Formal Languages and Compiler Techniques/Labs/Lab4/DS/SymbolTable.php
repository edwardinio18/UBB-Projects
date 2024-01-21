<?php

namespace Main\DS;

require_once(__DIR__ . "/HashTable.php");

/**
 * SymbolTable class
 *
 * A symbol table to store symbols and their associated positions.
 */
class SymbolTable
{
    /**
     * @var HashTable A hash table used for storing symbols and their positions.
     */
    private HashTable $hashTable;

    /**
     * @var int The next available code to assign to a symbol.
     */
    private int $nextCode = 0;

    /**
     * SymbolTable constructor.
     *
     * @param int $capacity The capacity of the symbol table.
     */
    public function __construct(int $capacity)
    {
        $this->hashTable = new HashTable($capacity);
    }

    /**
     * Add a symbol to the symbol table with an associated position.
     *
     * @param int|string $symbol The symbol to be added.
     */
    public function add(int|string $symbol): void
    {
        if (!$this->hashTable->contains($symbol)) {
            $this->hashTable->add($symbol, $this->nextCode);
            $this->nextCode++;
        }
    }

    /**
     * Get the position associated with a symbol.
     *
     * @param int|string $key The symbol for which to retrieve the position.
     *
     * @return array The position associated with the symbol.
     */
    public function getPosition(int|string $key): array
    {
        return $this->hashTable->getPosition($key);
    }

    /**
     * Checks if the hash table contains a specific key.
     *
     * @param int|string $key The key to check for in the hash table.
     *
     * @return bool True if the key is found in the hash table, false otherwise.
     */
    public function contains(int|string $key): bool
    {
        return $this->hashTable->contains($key);
    }

    /**
     * Convert the symbol table to a string for easy printing.
     *
     * @return string The string representation of the symbol table.
     */
    public function __toString(): string
    {
        $result = "\n{";

        for ($i = 0; $i < $this->hashTable->getCapacity(); $i++) {
            $result .= "\n\t$i => [";
            for ($j = 0; $j < count($this->hashTable->getHashTable()[$i]); $j++) {
                $result .= "(" . $this->hashTable->getHashTable()[$i][$j][0] . ", " . $this->hashTable->getHashTable()[$i][$j][1] . ")";
                if ($j < count($this->hashTable->getHashTable()[$i]) - 1) {
                    $result .= ", ";
                }
            }
            $result .= "]";
        }

        $result .= "\n}";

        return $result;
    }
}

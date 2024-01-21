<?php

/**
 * Class HashTable
 */
class HashTable
{
    /**
     * @var array An array to store key-value pairs in a hash table.
     */
    private array $hashTable;

    /**
     * @var int The capacity of the hash table.
     */
    private int $capacity;

    /**
     * HashTable constructor.
     *
     * @param int $capacity The capacity of the hash table.
     */
    public function __construct(int $capacity)
    {
        $this->capacity = $capacity;
        $this->hashTable = array_fill(0, $capacity, array());
    }

    /**
     * Get the capacity of the hash table.
     *
     * @return int The capacity of the hash table.
     */
    public function getCapacity(): int
    {
        return $this->capacity;
    }

    /**
     * Calculate the hash value for an integer key.
     *
     * @param int $key The key to be hashed.
     * @return int The hash value.
     */
    private function hash(int $key): int
    {
        return $key % $this->capacity;
    }

    /**
     * Calculate the hash value for a string key.
     *
     * @param string $key The key to be hashed.
     * @return int The hash value.
     */
    private function hashString(string $key): int
    {
        $hash = 193;
        for ($i = 0; $i < strlen($key); $i++) {
            $hash = (($hash << 2) + $hash) + ord($key[$i]);
        }
        return abs($hash) % $this->capacity;
    }

    /**
     * Check if the hash table contains a given key.
     *
     * @param int|string $key The key to search for.
     * @return bool True if the key is found, false otherwise.
     */
    public function contains(int|string $key): bool
    {
        $hashValue = $this->getHashValue($key);
        return in_array($key, $this->hashTable[$hashValue]);
    }

    /**
     * Get the hash value for a given key.
     *
     * @param int|string $key The key to be hashed.
     * @return int The hash value.
     */
    public function getHashValue(int|string $key): int
    {
        $hashValue = -1;
        if (is_int($key)) {
            $hashValue = $this->hash($key);
        } elseif (is_string($key)) {
            $hashValue = $this->hashString($key);
        }
        return $hashValue;
    }

    /**
     * Add a key-value pair to the hash table.
     *
     * @param int|string $key The key to add.
     * @param int $value The associated value.
     */
    public function add(int|string $key, int $value): void
    {
        $hashValue = $this->getHashValue($key);
        if ($hashValue != -1 && !$this->contains($key)) {
            $this->hashTable[$hashValue][] = array($key, $value);
        }
    }

    /**
     * Get the value associated with a given key.
     *
     * @param int|string $key The key to search for.
     * @return int The associated value if found, or -1 if not found.
     */
    public function getPosition(int|string $key): int
    {
        $hashValue = $this->getHashValue($key);

        if ($hashValue != -1) {
            for ($i = 0; $i < count($this->hashTable[$hashValue]); $i++) {
                if ($this->hashTable[$hashValue][$i][0] == $key) {
                    return $this->hashTable[$hashValue][$i][1];
                }
            }
        }

        return -1;
    }

    /**
     * Get the entire hash table.
     *
     * @return array The hash table as an array.
     */
    public function getHashTable(): array
    {
        return $this->hashTable;
    }
}

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
        $this->hashTable = array_fill(0, $capacity, []);
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
     *
     * @return int The hash value.
     */
    private function hash(int $key): int
    {
        return abs($key % $this->capacity);
    }

    /**
     * Calculate the hash value for a string key.
     *
     * @param string $key The key to be hashed.
     *
     * @return int The hash value.
     */
    private function hashString(string $key): int
    {
        $hash = hash('sha256', $key, true);
        $decimalHash = gmp_init('0x' . bin2hex($hash), 16);
        $capacity = gmp_init($this->capacity);
        return gmp_intval(gmp_mod($decimalHash, $capacity));
    }

    /**
     * Check if the hash table contains a given key.
     *
     * @param int|string $key The key to search for.
     *
     * @return bool True if the key is found, false otherwise.
     */
    public function contains(int|string $key): bool
    {
        $hashValue = $this->getHashValue($key);
        $hashTableArrayValues = $this->hashTable[$hashValue] ?? [];

        foreach ($hashTableArrayValues as $hashTableArrayValue) {
            if ($hashTableArrayValue[0] == $key) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the hash value for a given key.
     *
     * @param int|string $key The key to be hashed.
     *
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
            $this->hashTable[$hashValue][] = [$key, $value];
        }
    }

    /**
     * Get the position information associated with a key in the hash table.
     *
     * @param int|string $key The key for which to retrieve the position information.
     *
     * @return array An array containing the position information associated with the key, or an array with [-1, -1] if the key is not found.
     */
    public function getPosition(int|string $key): array
    {
        $hashValue = $this->getHashValue($key);

        if ($hashValue != -1) {
            for ($i = 0; $i < count($this->hashTable[$hashValue]); $i++) {
                if ($this->hashTable[$hashValue][$i][0] == $key) {
                    return $this->hashTable[$hashValue][$i];
                }
            }
        }

        return [-1, -1];
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

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <limits>

// Function to encrypt a message using a permutation key
std::string encrypt(const std::string &message, const std::string &key)
{
    int keyLength = key.length();
    int messageLength = message.length();
    int numRows = (messageLength + keyLength - 1) / keyLength;
    char matrix[numRows][keyLength];

    // Fill the matrix with the message
    int messageIndex = 0;
    for (int i = 0; i < numRows; i++)
    {
        for (int j = 0; j < keyLength; j++)
        {
            if (messageIndex < messageLength)
            {
                matrix[i][j] = message[messageIndex++];
            }
            else
            {
                matrix[i][j] = ' ';
            }
        }
    }

    // Sort the columns based on the key
    std::vector<std::pair<char, int>> keyMapping;
    for (int i = 0; i < keyLength; i++)
    {
        keyMapping.emplace_back(key[i], i);
    }
    std::sort(keyMapping.begin(), keyMapping.end());

    // Build the encrypted message by reading the columns in sorted order
    std::string encryptedMessage;
    for (const auto &pair : keyMapping)
    {
        int col = pair.second;
        for (int row = 0; row < numRows; row++)
        {
            encryptedMessage += matrix[row][col];
        }
    }

    return encryptedMessage;
}

// Function to decrypt a message using a permutation key
std::string decrypt(const std::string &encryptedMessage, const std::string &key)
{
    int keyLength = key.length();
    int messageLength = encryptedMessage.length();
    int numRows = messageLength / keyLength;
    char matrix[numRows][keyLength];

    // Create a mapping of the key characters to their original positions
    std::vector<std::pair<char, int>> keyMapping;
    for (int i = 0; i < keyLength; i++)
    {
        keyMapping.emplace_back(key[i], i);
    }
    std::sort(keyMapping.begin(), keyMapping.end());

    // Rearrange the columns in the correct order
    for (int col = 0; col < keyLength; col++)
    {
        int originalCol = keyMapping[col].second;
        for (int row = 0; row < numRows; row++)
        {
            matrix[row][originalCol] = encryptedMessage[col * numRows + row];
        }
    }

    // Create the decrypted message by reading the rows in order
    std::string decryptedMessage;
    for (int row = 0; row < numRows; row++)
    {
        for (int col = 0; col < keyLength; col++)
        {
            decryptedMessage += matrix[row][col];
        }
    }

    return decryptedMessage;
}

int main()
{
    std::string message, key;

    std::cout << "Enter the message: ";
    std::getline(std::cin, message);

    std::cout << "Enter the key: ";
    std::getline(std::cin, key);

    std::string encryptedMessage = encrypt(message, key);
    std::string decryptedMessage = decrypt(encryptedMessage, key);

    std::cout << "Original Message: " << message << std::endl;
    std::cout << "Encrypted Message: " << encryptedMessage << std::endl;
    std::cout << "Decrypted Message: " << decryptedMessage << std::endl;

    return 0;
}
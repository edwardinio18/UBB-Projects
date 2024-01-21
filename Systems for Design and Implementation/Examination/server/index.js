const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package
const app = express();
const port = 1234;

// Object to store votes per GUID
const votes = {};

// Define the route handler for the root route
app.get('/', (req, res) => {
    const guid = uuidv4(); // Generate a random GUID / UUID
    votes[guid] = []; // Save the GUID in the votes object

    const tableHTML = `
    <h1>Decide on an activity together</h1>
    <table style="border-collapse: collapse; border: 1px solid black;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 5px;">Time 1</th>
          <th style="border: 1px solid black; padding: 5px;">Time 2</th>
          <th style="border: 1px solid black; padding: 5px;">Time 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; padding: 5px;">Activity 1</td>
          <td style="border: 1px solid black; padding: 5px;"></td>
          <td style="border: 1px solid black; padding: 5px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 5px;">Activity 2</td>
          <td style="border: 1px solid black; padding: 5px;"></td>
          <td style="border: 1px solid black; padding: 5px;"></td>
        </tr>
      </tbody>
    </table>
    <p>Give this URL to your friends so that they can vote on the activities and the times that they are available:</p>
    <h2>${req.protocol}://${req.get('host')}/vote/${guid}</h2>
    <a href="/vote/${guid}"><button type="button">Create Vote</button></a>
  `;

    res.send(tableHTML);
});

// Define the route handler for the AVP route
app.get('/vote/:guid', (req, res) => {
    const guid = req.params.guid;

    if (!votes[guid]) {
        res.send("Invalid URL");
        return;
    }

    const avpHTML = `
    <h1>Decide on an activity together</h1>
    <p>Give this URL to your friends so that they can vote on the activities and the times that they are available:</p>
    <h2>${req.protocol}://${req.get('host')}/vote/${guid}</h2>
    <form action="/vote/${guid}" method="POST">
      <label for="name">Enter your name:</label>
      <input type="text" id="name" name="name" required>
      <button type="submit">Vote</button>
    </form>
    <table style="border-collapse: collapse; border: 1px solid black;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 5px;">Time 1</th>
          <th style="border: 1px solid black; padding: 5px;">Time 2</th>
          <th style="border: 1px solid black; padding: 5px;">Time 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; padding: 5px;">Activity 1</td>
          <td style="border: 1px solid black; padding: 5px;"></td>
          <td style="border: 1px solid black; padding: 5px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 5px;">Activity 2</td>
          <td style="border: 1px solid black; padding: 5px;"></td>
          <td style="border: 1px solid black; padding: 5px;"></td>
        </tr>
      </tbody>
    </table>
  `;

    res.send(avpHTML);
});

// Define the route handler for the AVP form submission
app.post('/vote/:guid', express.urlencoded({ extended: true }), (req, res) => {
    const guid = req.params.guid;
    const name = req.body.name;

    if (!votes[guid]) {
        res.send("Invalid URL");
        return;
    }

    if (votes[guid].includes(name)) {
        res.send("Error: Name already entered for this vote");
        return;
    }

    votes[guid].push(name);

    res.send("Vote submitted successfully");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
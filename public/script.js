// Handle form submission for creating a new incident
document.getElementById('incidentForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const severity = document.getElementById('severity').value;
  
    // Validate that description and severity are not empty
    if (!description || !severity) {
      document.getElementById('errorMessage').style.display = 'block';  // Show error message
      document.getElementById('errorMessage').textContent = 'Description and Severity are required!';
      return;  // Stop the form submission
    } else {
      document.getElementById('errorMessage').style.display = 'none';  // Hide error message if valid
    }
  
    // Ensure severity is valid
    const validSeverities = ['Low', 'Medium', 'High'];
    if (!validSeverities.includes(severity)) {
      document.getElementById('errorMessage').style.display = 'block';
      document.getElementById('errorMessage').textContent = 'Severity must be Low, Medium, or High';
      return;
    }
  
    // Create the new incident object
    const newIncident = {
      title: title,
      description: description,
      severity: severity
    };
  
    // Send POST request to backend to create a new incident
    fetch('http://localhost:5000/incidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIncident)
    })
    .then(response => response.json())
    .then(data => {
      alert('Incident Added!');
      loadIncidents();  // Reload incidents list
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
  // Function to load incidents from the backend
  function loadIncidents() {
    fetch('http://localhost:5000/incidents')
      .then(response => response.json())
      .then(data => {
        const incidentContainer = document.getElementById('incidentContainer');
        incidentContainer.innerHTML = ''; // Clear current list
        data.forEach(incident => {
          const incidentDiv = document.createElement('div');
          incidentDiv.classList.add('incident');
          incidentDiv.innerHTML = `
            <h3>${incident.title}</h3>
            <p>${incident.description}</p>
            <strong>Severity: ${incident.severity}</strong>
            <button onclick="viewIncident('${incident._id}')">View</button>
            <button onclick="deleteIncident('${incident._id}')">Delete</button>
          `;
          incidentContainer.appendChild(incidentDiv);
        });
      })
      .catch(error => console.error('Error fetching incidents:', error));
  }
  
  // Function to view an incident by ID
  function viewIncident(id) {
    fetch(`http://localhost:5000/incidents/${id}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('incidentTitle').textContent = data.title;
        document.getElementById('incidentDescription').textContent = data.description;
        document.getElementById('incidentSeverity').textContent = data.severity;
        document.getElementById('incidentDetails').style.display = 'block';
        document.getElementById('incidentList').style.display = 'none';
      })
      .catch(error => {
        console.error('Error fetching incident:', error);
      });
  }
  
  // Function to delete an incident
  function deleteIncident(id) {
    fetch(`http://localhost:5000/incidents/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      alert('Incident Deleted!');
      loadIncidents();  // Reload incidents list
    })
    .catch(error => console.error('Error deleting incident:', error));
  }
  
  // Function to go back to the incident list
  function goBack() {
    document.getElementById('incidentDetails').style.display = 'none';
    document.getElementById('incidentList').style.display = 'block';
  }
  
  // Load incidents on page load
  loadIncidents();
  
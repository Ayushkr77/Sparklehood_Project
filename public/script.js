document.getElementById('incidentForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const severity = document.getElementById('severity').value;
  
    if (!description || !severity) {
      document.getElementById('errorMessage').style.display = 'block';
      document.getElementById('errorMessage').textContent = 'Description and Severity are required!';
      return;  
    } else {
      document.getElementById('errorMessage').style.display = 'none'; 
    }
  
    const validSeverities = ['Low', 'Medium', 'High'];
    if (!validSeverities.includes(severity)) {
      document.getElementById('errorMessage').style.display = 'block';
      document.getElementById('errorMessage').textContent = 'Severity must be Low, Medium, or High';
      return;
    }
  
    const newIncident = {
      title: title,
      description: description,
      severity: severity
    };
  
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
      loadIncidents();     })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
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
  
  function deleteIncident(id) {
    fetch(`http://localhost:5000/incidents/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      alert('Incident Deleted!');
      loadIncidents();  
    })
    .catch(error => console.error('Error deleting incident:', error));
  }
  
  function goBack() {
    document.getElementById('incidentDetails').style.display = 'none';
    document.getElementById('incidentList').style.display = 'block';
  }
  
  loadIncidents();
  
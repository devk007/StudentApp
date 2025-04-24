import React, { useState } from 'react';

const StudentAdmin = () => {
  const [studentData, setStudentData] = useState([]);
  const [sid, setSid] = useState('');

  async function showStudent(e) {
    e.preventDefault();
  
    if (sid === '*') {
      try {
        const response = await fetch(`http://localhost:3002/admin/show`);
        const result = await response.json();
        setStudentData(result.msg);
        console.log(result);
        
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:3002/admin/showByEmail/${sid}`);
        const result = await response.json();
        setStudentData([result.msg]); // wrap in array for table mapping consistency
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
  }

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`http://localhost:3002/admin/deleteByEmail/${email}`, { method: 'DELETE' });
      const result = await response.json();
      alert(result.msg);
      setStudentData(prevData => prevData.filter(student => student.email !== email));
    } catch (error) {
      alert("Error deleting student data: " + error);
    }
  }

  const handleUpdate = async (email) => {
    // Get the new name and password from the user
    const newName = prompt("Enter new name:");
    const newPassword = prompt("Enter new password:");
  
    if (!newName && !newPassword) return;
  
    const updateData = {};
    if (newName) updateData.name = newName;
    if (newPassword) updateData.password = newPassword;
  
    try {
      const response = await fetch(`http://localhost:3002/admin/updateByEmail/${email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        const result = await response.json();
  

        setStudentData(prevData =>
          prevData.map(student =>
            student.email === email ? { ...student, ...updateData } : student
          )
        );
        alert("Data updated successfully!");
      } else {
        const result = await response.json();
        alert("Error updating student data: " + result.msg);
      }
    } catch (error) {
      alert("Error updating student data: " + error);
    }
  };
  
  


  return (
    <div>
      <h2>Student Admin</h2>
      <form onSubmit={showStudent}>
        <input
          type="text"
          name="sid"
          value={sid}
          onChange={(e) => setSid(e.target.value)}
          placeholder="Enter * sid or email"
          required
        />
        <button type="submit">Search Student</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <h3>Show Data:</h3>
        {studentData && studentData.length > 0 ? (
          <table border="1" cellPadding="5" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button onClick={() =>handleDelete(student.email)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(student.email)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentAdmin;

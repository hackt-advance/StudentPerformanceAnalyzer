function createSubjectInputs() {
  const num = parseInt(document.getElementById('numSubjects').value);
  const container = document.getElementById('subjectsContainer');
  container.innerHTML = '';

  if (isNaN(num) || num <= 0) {
    alert('Enter a valid number of subjects');
    return;
  }

  const table = document.createElement('table');
  table.className = 'subjects-table';
  const header = document.createElement('tr');
  header.innerHTML = `<th>Subject Name</th><th>Marks</th>`;
  table.appendChild(header);

  for (let i = 1; i <= num; i++) {
    const row = document.createElement('tr');

    const nameTd = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = `Subject ${i} Name`;
    nameInput.id = `subjectName${i}`;
    nameTd.appendChild(nameInput);

    const marksTd = document.createElement('td');
    const marksInput = document.createElement('input');
    marksInput.type = 'number';
    marksInput.placeholder = `Marks`;
    marksInput.id = `subjectMarks${i}`;
    marksTd.appendChild(marksInput);

    row.appendChild(nameTd);
    row.appendChild(marksTd);
    table.appendChild(row);
  }

  container.appendChild(table);
  document.getElementById('analyzeBtn').style.display = 'block';
}

function analyzePerformance() {
  const name = document.getElementById('studentName').value;
  const num = parseInt(document.getElementById('numSubjects').value);
  if (!name || isNaN(num) || num <= 0) {
    alert('Please enter student name and valid number of subjects');
    return;
  }

  const subjects = [];
  const marks = [];

  for (let i = 1; i <= num; i++) {
    const subName = document.getElementById(`subjectName${i}`).value.trim();
    const subMarks = parseInt(document.getElementById(`subjectMarks${i}`).value);

    if (!subName || isNaN(subMarks) || subMarks < 0 || subMarks > 100) {
      alert(`Enter valid name and marks for Subject ${i}`);
      return;
    }

    subjects.push(subName);
    marks.push(subMarks);
  }

  const total = marks.reduce((a,b) => a + b, 0);
  const percentage = ((total / (num*100)) * 100).toFixed(2);

  let grade;
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 75) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 40) grade = 'D';
  else grade = 'F';

  const pass = marks.every(m => m >= 40);
  const status = pass ? 'Pass' : 'Fail';

  const maxMarks = Math.max(...marks);
  const minMarks = Math.min(...marks);
  const strengthIndex = marks.indexOf(maxMarks);
  const weaknessIndex = marks.indexOf(minMarks);

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <p><strong>Student:</strong> ${name}</p>
    <p><strong>Total Marks:</strong> ${total} / ${num*100}</p>
    <p><strong>Percentage:</strong> ${percentage}%</p>
    <p><strong>Grade:</strong> ${grade}</p>
    <p><strong>Status:</strong> <span class='${pass ? 'pass' : 'fail'}'>${status}</span></p>
    <p><strong>Strength:</strong> ${subjects[strengthIndex]} (${maxMarks} marks)</p>
    <p><strong>Weakness:</strong> ${subjects[weaknessIndex]} (${minMarks} marks)</p>
  `;
}

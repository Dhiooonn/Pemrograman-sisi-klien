function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
            
    setTimeout(() => {
        document.getElementById('studentId').focus();
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
            
    // Clear form
    document.getElementById('studentId').value = '';
    document.getElementById('studentName').value = '';
    document.getElementById('studentMajor').value = '';
}

function saveStudent() {
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const studentMajor = document.getElementById('studentMajor').value;
            
    if (studentId && studentName && studentMajor) {
        console.log('Saving student:', { studentId, studentName, studentMajor });
        closeModal();
    } else {
        // Simple validation feedback
        const inputs = [
            { id: 'studentId', value: studentId },
            { id: 'studentName', value: studentName },
            { id: 'studentMajor', value: studentMajor }
        ];
                
        const emptyField = inputs.find(input => !input.value);
        if (emptyField) {
            document.getElementById(emptyField.id).focus();
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
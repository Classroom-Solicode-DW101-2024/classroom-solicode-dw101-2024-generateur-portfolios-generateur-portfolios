// **************** Ta3rif dyal class dial talib ****************
class Student {
    constructor(name, surname, email, phone, group) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.group = group;
        this.projects = [];
    }

    // Method bash nzido projet jdida f liste dyal projets dial talib
    addProject(project) {
        this.projects.push(project);
    }
}

// **************** Ta3rif dyal class dial projet ****************
class Project {
    constructor(title, skills, realisationDate, githubLink) {
        this.title = title;
        this.skills = skills;
        this.realisationDate = realisationDate;
        this.githubLink = githubLink;
    }
}

// **************** Code dyal index.html ****************

let nameInput = document.getElementById('name');
let surnameInput = document.getElementById('surname');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let groupInput = document.getElementById('group');
let nextBtn = document.getElementById('Next-btn');

// Regex dial format dyal phone: +212XXX-XX-XX-XX
const phoneFormat = /^\+212\d{3}-\d{2}-\d{2}-\d{2}$/;

// Function bash nkhali formulaire khawi
function clearForm() {
    nameInput.value = "";
    surnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    groupInput.value = "";
}

let newStudent;

// Check ila button "Next" kayn, n3mro formulaire o n7to data f localStorage
if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Vérifier wach tous les champs 3mmrin b shi haja wla kaynin spaces floul
        if (nameInput.value === "" || 
            nameInput.value.startsWith(" ") ||
            surnameInput.value === "" || 
            surnameInput.value.startsWith(" ") ||
            emailInput.value === "" || 
            emailInput.value.startsWith(" ") ||
            phoneInput.value === "") {
            alert('Please fill all the fields without leading spaces!');
            return;
        }

        // Na7iw spaces w na7to l email fl format matlob
        let nameValue = nameInput.value.replace(/\s+/g, '');  
        let surnameValue = surnameInput.value.replace(/\s+/g, '');
        let formattedEmail = `${nameValue}.${surnameValue}.solicode@gmail.com`;

        // Check ila format dial email mchi howa
        if (formattedEmail !== emailInput.value) {
            alert('Please respect this format in email: name.surname.solicode@gmail.com');
            return;
        }

        // Check ila format dial phone howa howa matlob
        if (!phoneFormat.test(phoneInput.value)) {
            alert('Please enter the phone number in this format: +212XXX-XX-XX-XX');
            return;
        }

        // Ncreateo object talib o nkhbiwha f localStorage
        newStudent = new Student(nameInput.value, surnameInput.value, emailInput.value, phoneInput.value, groupInput.value);
    
        localStorage.setItem('newStudent', JSON.stringify(newStudent));
    
        console.log(newStudent);
    
        // Redirect l projects.html
        window.location.href = "projects.html";
    
        clearForm(); // Nkhalio formulaire khawi
    });
}

// **************** Code dyal projects.html ****************

let projectTitle = document.getElementById("project-title");
let githubLinks = document.getElementById("github-links");
const realisationDate = document.getElementById('realisation-date');
let validateBtn = document.getElementById("validate");
let finishBtn = document.getElementById("finish");
let projectsCreatedSection = document.querySelector('.projects-created');

// Function bash nkhalio formulaire dyal projects khawi
function clearFormProject() {
    document.getElementById("projects-forms").reset();
}

let storedStudent = JSON.parse(localStorage.getItem('newStudent'));

if (storedStudent) {
    let newStudent = Object.assign(new Student(), storedStudent);
    console.log(newStudent);

    if (validateBtn) {
        validateBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

            // Check ila ay champ m3mmrsh b shi haja w kayna spaces floul
            if (projectTitle.value.trim() === "" || 
                projectTitle.value.startsWith(" ") || 
                githubLinks.value.trim() === "" || 
                githubLinks.value.startsWith(" ") || 
                realisationDate.value === "" || 
                checkboxes.length === 0) {
                alert('Please fill all the fields without leading spaces!');
                return;
            }

            // Function bash njib skills mokhtar mn checkboxes
            function getSelectedSkills() {
                const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                let skills = [];
                for (const item of checkboxes) {
                    if (item.checked) {
                        skills.push(item.value)
                    }
                }
                return skills;      
            }

            // Na3mro projet jdida w njibha l student
            const newProject = new Project(projectTitle.value, getSelectedSkills(), realisationDate.value, githubLinks.value);
            newStudent.addProject(newProject);

            console.log(newProject);
            console.log(Student.projects);
    
            localStorage.setItem('newStudent', JSON.stringify(newStudent));
           
            // Aficher projet f projects section
            projectsCreatedSection.innerHTML += `
                <div class="project-item">
                    <div>
                        <label class="project-title">Title: </label>
                        <span>${projectTitle.value}</span>
                    </div>
                    <div>
                        <label class="github-link">Github Link: </label>
                        <span>${githubLinks.value}</span>
                    </div>
                    <div>
                        <label class="skills">Skills: </label>
                        <span>${getSelectedSkills()}</span>
                    </div>
                    <div>
                        <label class="realisation-date">Realisation Date: </label>
                        <span>${realisationDate.value}</span>
                    </div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;

            if (projectsCreatedSection) {
                projectsCreatedSection.addEventListener("click", (e) => {
                    if (e.target.classList.contains("edit")) {
                        const projectDiv = e.target.closest(".project-item");
                        const titleElement = projectDiv.querySelector(".project-title span");
                        const githubLinkElement = projectDiv.querySelector(".github-link span");
                        const dateElement = projectDiv.querySelector(".realisation-date span");

                        projectTitle.value = titleElement.innerText;
                        githubLinks.value = githubLinkElement.innerText;
                        realisationDate.value = dateElement.innerText;
            
                        let existingSaveBtn = projectDiv.querySelector(".save-btn");
                        if (existingSaveBtn) {
                            existingSaveBtn.remove();
                        }
            
                        const saveBtn = document.createElement("button");
                        saveBtn.textContent = "Save";
                        saveBtn.classList.add("save-btn");
                        projectDiv.appendChild(saveBtn);
            
                        saveBtn.addEventListener("click", () => {
                            titleElement.innerText = projectTitle.value;
                            githubLinkElement.innerText = githubLinks.value;
                            dateElement.innerHTML = realisationDate.value;

                            const projectIndex = Array.from(projectsCreatedSection.children).indexOf(projectDiv);
                            newStudent.projects[projectIndex].title = projectTitle.value;
                            newStudent.projects[projectIndex].githubLink = githubLinks.value;
                            newStudent.projects[projectIndex].realisationDate = realisationDate.value;
            
                            localStorage.setItem("newStudent", JSON.stringify(newStudent));
            
                            projectDiv.removeChild(saveBtn);
                            clearFormProject();
                        });
                    } else if (e.target.classList.contains("delete")) {
                        e.target.closest(".project-item").remove();
                    }
                });
            }
            clearFormProject();
        });
    }
}

// **************** Code dyal portfolio.html ****************

if (finishBtn) {
    finishBtn.addEventListener('click', (e) => {
        e.preventDefault();
    
        let newStudent = Object.assign(new Student(), storedStudent);
    
        if (newStudent.projects.length > 0) {
            window.location.href = "portfolio.html";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let newStudent = Object.assign(new Student(), storedStudent);

    let cvContainer = document.querySelector('.generator');
    if (cvContainer) {
        cvContainer.innerHTML += `
            <div class="personal-info">
                <h1>Personal Information</h1>
                <div>
                    <label>Name: </label>
                    <span>${newStudent.name}</span>    
                </div>
                <div>
                    <label>Surname: </label>
                    <span>${newStudent.surname}</span>
                </div>
                <div>
                    <label>Email: </label>
                    <span>${newStudent.email}</span>    
                </div>
                <div>
                    <label>Phone: </label>
                    <span>${newStudent.phone}</span>
                </div>
                <div>
                    <label>Group: </label>
                    <span>${newStudent.group}</span>
                </div>
            </div>
        `;
    
        for (let i = 0; i < newStudent.projects.length; i++) {
            cvContainer.innerHTML += `
                <div class="project-info">
                    <h1>Project ${i + 1}</h1>
                    <div>
                        <label>Title: </label>
                        <span>${newStudent.projects[i].title}</span>
                    </div>
                    <div>
                        <label>Skills: </label>
                        <span>${newStudent.projects[i].skills}</span>
                    </div>
                    <div>
                        <label>Realisation Date: </label>
                        <span>${newStudent.projects[i].realisationDate}</span>
                    </div>
                    <div>
                        <label>Github Link: </label>
                        <span>${newStudent.projects[i].githubLink}</span>
                    </div>
                </div>
            `;
        }

        const downloadButton = document.createElement("button");
        downloadButton.innerText = "Download PDF";
        downloadButton.id = "download-button";
        cvContainer.appendChild(downloadButton);

        downloadButton.addEventListener("click", () => {
            downloadButton.style.display = "none";
            html2pdf().from(cvContainer).set({
                margin: 1,
                filename: `${newStudent.name}_${newStudent.surname}_CV.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { format: 'a4', orientation: 'portrait' }
            }).save().then(() => {
                downloadButton.style.display = "block";
            });
        });
    }
});

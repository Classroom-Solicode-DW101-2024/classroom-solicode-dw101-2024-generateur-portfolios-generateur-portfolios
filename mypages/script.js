class Student {
    constructor(name,surname,email,phone,group,projects){
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.phone=phone;
        this.group=group;
        this.projects=projects;
    }
}

class Projects {
    constructor(Title,Github_links,Skills,Date){
        this.Title=Title;
        this.Github_links=Github_links;
        this.skills=Skills;
        this.Date=Date;
    }
}

function Students(){
    const name = document.getElementById("name").Value;
    const surname = document.getElementById("surname").Value;
    const email = document.getElementById("email").Value;
    const phone = document.getElementById("phone").Value;
    const group = document.getElementById("group").Value;
    const projects = document.getElementById("projects").value;


    localStorage.setItem("studenSaved",JSON.stringify(newStudent));
    window.location.href = "page1.html";
}
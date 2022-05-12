class EmployeePayrollData {

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        const NAME_REGEX = RegExp("^[A-Z]{1}[a-z]{2,}([ ][A-Z]{1}[a-z]{2,})?$");
        if (NAME_REGEX.test(name)) {
            this._name = name;
        } else throw "Name is Incorrect!";
    }
    get profilePicture() {
        return this._profilePicture;
    }
    set profilePicture(profilePicture) {
        this._profilePicture = profilePicture;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
    get departments() {
        return this._departments;
    }
    set departments(departments) {
            this._departments = departments;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }
    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate <= new Date()) {
            this._startDate = startDate;
        } else throw "Start Date is Incorrect!";
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "[ id: " + this.id + ", name: " + this.name + ", salary: " + this.salary +
            ", gender: " + this.gender + ", startDate: " + employeeDate + ", departments: " + this.departments + " ]" + "\n";
    }
}
window.addEventListener("DOMContentLoaded", (event) => {
     const name = document.querySelector('#name'); 
     const textError = document.querySelector('.text-error'); 
     name.addEventListener('input', function() {
        if(name.value. length == 0) { 
            textError. textContent = "";
            return;
    }
    try {
        (new EmployeePayrollData()).name = name.value;
        textError. textContent="";
    } catch (e) {
        textError.textContent = e;
      }
    });
    const salary = document.querySelector('#salary'); 
    const output = document.querySelector('.salary-output'); 
    output.textContent = salary.value; 
    salary.addEventListener('input', function() { 
         output.textContent = salary.value;
    });
});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayrollObject();
        if (employeePayrollData != undefined) updateLocalStorage(employeePayrollData);
    } catch (submitError) {
        alert(submitError);
        return;
    }
};
function updateLocalStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollObject = () => {
    let employeePayrollData = new EmployeePayrollData();

    employeePayrollData.name = getValue("#name");
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.profilePicture = getSelectedValues("[name=profile]").pop();
    employeePayrollData.salary = getValue("#salary");
    dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
    employeePayrollData.startDate = new Date(dateString);
    employeePayrollData.note = getValue("#notes");
    try {
        employeePayrollData.departments = getSelectedValues("[name=department]");
    } catch (error) {
        alert(error);
        return;
    }
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
    return employeePayrollData;
};

const getSelectedValues = (propertyName) => {
    let allValues = document.querySelectorAll(propertyName);
    let selectedValues = [];
    allValues.forEach(input => {
        if (input.checked) selectedValues.push(input.value);
    });
    return selectedValues;
};

const getValue = (propertyId) => {
    let value = document.querySelector(propertyId).value;
    return value;
};

const resetForm = () => {
    setValue("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#salary", " ");
    setValue("#notes", " ");
    setValue("#day", "1");
    setValue("#month", "January");
    setValue("#year", "2020");
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allValues.forEach(item => item.checked == false);
};

const setTextValue = (id , value) => {
    const element = document.querySelector(id);
    element.value= value;
};
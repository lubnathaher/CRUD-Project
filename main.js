var courseName = document.getElementById("courseName")
var courseCategory = document.getElementById("courseCategory")
var coursePrice = document.getElementById("coursePrice")
var courseDescription = document.getElementById("courseDescription")
var courseCapacity = document.getElementById("courseCapacity")
var addbtn = document.getElementById("click")
var search = document.getElementById("search")
var data = document.getElementById("data")
var update = document.getElementById("update")
var currentIndex=0
var isNameValid = false
var isCatValid = false
var isPriValid = false
var isDesValid = false
var isCapValid = false
var courses  
if(JSON.parse(localStorage.getItem('courses')) == null){
    courses = []
}
else{
    courses = JSON.parse(localStorage.getItem('courses'))
}
displayData()
checkInputs()

function checkInputs(){
    if(isNameValid && isCatValid && isPriValid && isDesValid && isCapValid){
        addbtn.removeAttribute('disabled')
    }
    else{
        addbtn.setAttribute('disabled', 'disabled')
    }
}

addbtn.onclick = function(e){
   e.preventDefault()
   addCourse()
   displayData()
   resetInput()
   console.log(courses)
}

// create course
function addCourse(){
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
    }
    courses.push(course)
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'course added successfully',
        showConfirmButton: false,
        timer: 1500,
    })
}

function resetInput(){
    courseName.value = ''
    courseCategory.value = ''
    coursePrice.value = ''
    courseDescription.value = ''
    courseCapacity.value = ''
}

function displayData(){
    var result = ``
    for(var i=0; i<courses.length; i++){
       result += `
    <tr>
       <td>${i+1}</td>
       <td>${courses[i].courseName}</td>
       <td>${courses[i].courseCategory}</td>
       <td>${courses[i].coursePrice}</td>
       <td>${courses[i].courseDescription}</td>
       <td>${courses[i].courseCapacity}</td>
       <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
       <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button></td>
   </tr>`
    }
    data.innerHTML = result
}

// delete all button
document.getElementById("deleteBtn").onclick = function(){
    courses = []
    data.innerHTML = ''
    localStorage.setItem('courses', JSON.stringify(courses))
    console.log(courses)
    displayData()
} 

// delete spacific course 
function deleteCourse(index){
   Swal.fire({
    title:'Are you sure ?',
    text: 'you will not be able to revert this!',
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
   }).then((result)=>{
      if(result.isConfirmed){
        courses.splice(index, 1)
        localStorage.setItem('courses', JSON.stringify(courses))
        displayData()
        Swal.fire(
            'Deleted!',
            'your file has been deleted',
            'success!',
        )
      }
   })
}

// search
search.onkeyup = function(){
    var result = ``
    for(var i=0; i<courses.length; i++){
    if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){ 
        result += `
    <tr>
       <td>${i+1}</td>
       <td>${courses[i].courseName}</td>
       <td>${courses[i].courseCategory}</td>
       <td>${courses[i].coursePrice}</td>
       <td>${courses[i].courseDescription}</td>
       <td>${courses[i].courseCapacity}</td>
       <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
       <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button></td>
   </tr>`
  }
    data.innerHTML = result
}

}

//update
update.style.display = 'none'
function getCourse(index){
    currentIndex = index
    var course = courses[index]
    courseName.value = course.courseName
    courseCategory.value = course.courseCategory
    courseDescription.value = course.courseDescription
    courseCapacity.value = course.courseCapacity
    update.style.display = 'inline'
    addbtn.style.display = 'none'
}

update.onclick = function(e){
    e.preventDefault()
    updateCourse()
    displayData()
    update.style.display = 'none'
    addbtn.style.display = 'inline'
    resetInput()
}

function updateCourse(){
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
    }

    var prevName = courses[currentIndex].courseName
    courses[currentIndex].courseName = course.courseName
    courses[currentIndex].courseCategory = course.courseCategory
    courses[currentIndex].coursePrice = course.coursePrice
    courses[currentIndex].courseDescription = course.courseDescription
    courses[currentIndex].courseCapacity = course.courseCapacity
    localStorage.setItem('courses', JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${prevName} updated successfully`,
        showConfirmButton: false,
        timer: 1500,
    })

}


// validation

/* 
for name validation 
- it shoud start with capital 
- it 3 - 10 letters 
*/
var nameAlert = document.getElementById('nameAlert')
nameAlert.style.display = 'none'
courseName.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,10}$/
    if(pattern.test(courseName.value)){
        isNameValid = true
        if(courseName.classList.contains('is-invalid')){
            courseName.classList.replace('is-invalid','is-valid')
        }
        else{
            courseName.classList.add('is-valid')
        }
    }
    else{
        isNameValid = false
        nameAlert.style.display = 'block'
        if(courseName.classList.contains('is-valid')){
            courseName.classList.replace('is-valid','is-invalid')
        }
        else{
            courseName.classList.add('is-invalid')
        }
    }
    checkInputs()
}

/* 
for categoty validation 
- it shoud start with capital 
- it 3 - 20 letters 
*/
courseCategory.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,20}$/
    if(pattern.test(courseCategory.value)){
        isCatValid = true
        if(courseCategory.classList.contains('is-invalid')){
            courseCategory.classList.replace('is-invalid','is-valid')
        }
        else{
            courseCategory.classList.add('is-valid')
        }
    }
    else{
        isCatValid = false
        if(courseCategory.classList.contains('is-valid')){
            courseCategory.classList.replace('is-valid','is-invalid')
        }
        else{
            courseCategory.classList.add('is-invalid')
        }
    }
    checkInputs()
}

/* 
for price validation  
- 3 - 4 numbers
*/
coursePrice.onkeyup = function(){
    var pattern = /^[0-9]{3,4}$/
    if(pattern.test(coursePrice.value)){
        isPriValid = true
        if(coursePrice.classList.contains('is-invalid')){
            coursePrice.classList.replace('is-invalid','is-valid')
        }
        else{
            coursePrice.classList.add('is-valid')
        }
    }
    else{
        isPriValid = false
        if(coursePrice.classList.contains('is-valid')){
            coursePrice.classList.replace('is-valid','is-invalid')
        }
        else{
            coursePrice.classList.add('is-invalid')
        }
    }
    checkInputs()
}

/* 
for desc validation  
- 2 - 120 numbers
- start with capital
- can contain numbers
*/
courseDescription.onkeyup = function(){
    var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/
    if(pattern.test(courseDescription.value)){
        isDesValid = true
        if(courseDescription.classList.contains('is-invalid')){
            courseDescription.classList.replace('is-invalid','is-valid')
        }
        else{
            courseDescription.classList.add('is-valid')
        }
    }
    else{
        isDesValid = false
        if(courseDescription.classList.contains('is-valid')){
            courseDescription.classList.replace('is-valid','is-invalid')
        }
        else{
            courseDescription.classList.add('is-invalid')
        }
    }
    checkInputs()
}

/* 
for capacity validation  
- 2 - 3 numbers
*/
courseCapacity.onkeyup = function(){
    var pattern = /^[0-9]{2,3}$/
    if(pattern.test(courseCapacity.value)){
        isCapValid= true
        if(courseCapacity.classList.contains('is-invalid')){
            courseCapacity.classList.replace('is-invalid','is-valid')
        }
        else{
            courseCapacity.classList.add('is-valid')
        }
    }
    else{
        isCapValid = false
        if(courseCapacity.classList.contains('is-valid')){
            courseCapacity.classList.replace('is-valid','is-invalid')
        }
        else{
            courseCapacity.classList.add('is-invalid')
        }
    }
    checkInputs()
}


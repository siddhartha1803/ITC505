function sanitize(t){return t.replace(/[<>"'()]/g,"");}
function showError(id,msg){document.getElementById(id).textContent=msg;}
function clearErrors(){["fnameError","lnameError","emailError","passwordError","confirmPasswordError"].forEach(id=>showError(id,""));}

function updatePreview(fname,lname,email){
 document.getElementById("previewName").textContent=sanitize(fname+" "+lname);
 document.getElementById("previewEmail").textContent=sanitize(email);
}

function strength(p){
 let s=0;
 if(p.length>=8)s++;
 if(/[A-Z]/.test(p))s++;
 if(/[0-9]/.test(p))s++;
 if(/[^A-Za-z0-9]/.test(p))s++;
 return s;
}

function updateStrength(p){
 let b=document.getElementById("strengthBar");
 let t=document.getElementById("strengthText");
 let s=strength(p); let w="0%", txt="N/A", c="gray";
 if(p===""){}
 else if(s<=1){w="25%"; txt="Weak"; c="red";}
 else if(s==2){w="50%"; txt="Fair"; c="orange";}
 else if(s==3){w="75%"; txt="Good"; c="green";}
 else {w="100%"; txt="Strong"; c="darkgreen";}
 b.style.width=w; b.style.backgroundColor=c; t.textContent="Password strength: "+txt;
}

document.addEventListener("DOMContentLoaded",()=>{
 let f=document.getElementById("regForm");
 let fn=document.getElementById("fname");
 let ln=document.getElementById("lname");
 let em=document.getElementById("email");
 let pw=document.getElementById("password");
 let cpw=document.getElementById("confirmPassword");
 let msg=document.getElementById("formMessage");

 [fn,ln,em].forEach(i=>i.addEventListener("input",()=>updatePreview(fn.value,ln.value,em.value)));
 pw.addEventListener("input",()=>updateStrength(pw.value));

 document.getElementById("togglePassword").addEventListener("click",()=>{
    let t=pw.type==="password"?"text":"password";
    pw.type=cpw.type=t;
    document.getElementById("togglePassword").textContent=t==="password"?"Show":"Hide";
 });

 f.addEventListener("submit",e=>{
    e.preventDefault(); clearErrors(); msg.textContent="";
    let ok=true;

    if(!fn.value.trim()){showError("fnameError","Required"); ok=false;}
    if(!ln.value.trim()){showError("lnameError","Required"); ok=false;}
    if(!em.value.trim()){showError("emailError","Required"); ok=false;}
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)){showError("emailError","Invalid email"); ok=false;}

    if(!pw.value.trim()){showError("passwordError","Required"); ok=false;}
    if(pw.value!==cpw.value){showError("confirmPasswordError","Passwords do not match"); ok=false;}

    if(!ok){msg.textContent="Fix the errors."; msg.style.color="red"; return;}

    updatePreview(fn.value,ln.value,em.value);
    msg.textContent="Registration successful!"; msg.style.color="green";
 });
});

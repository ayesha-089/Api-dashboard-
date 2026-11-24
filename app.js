const DATA_URL = "data/sample.json";
const PAGE_SIZE = 6;
let allRecords = [];
let currentPage = 1;

const $id = id => document.getElementById(id);
const ui = {
 method:$id("request-method"), load:$id("load-btn"), refresh:$id("refresh-btn"), retry:$id("retry-btn"),
 search:$id("search-input"), department:$id("department-filter"), status:$id("status-filter"),
 records:$id("records-container"), loading:$id("loading-state"), error:$id("error-state"),
 errorMessage:$id("error-message"), empty:$id("empty-state"), total:$id("total-count"),
 active:$id("active-count"), inactive:$id("inactive-count"), updated:$id("last-updated"),
 resultCount:$id("result-count"), pageInfo:$id("page-info"), prev:$id("prev-btn"), next:$id("next-btn")
};

function showLoading(){
 ui.loading.hidden=false; ui.error.hidden=true; ui.empty.hidden=true; ui.records.innerHTML="";
 ui.load.disabled=true; ui.refresh.disabled=true;
}
function hideLoading(){ui.loading.hidden=true;ui.load.disabled=false;ui.refresh.disabled=false;}
function showError(message){
 ui.errorMessage.textContent=message;ui.error.hidden=false;ui.empty.hidden=true;ui.records.innerHTML="";
 ui.resultCount.textContent="0 records";ui.pageInfo.textContent="Page 0 of 0";ui.prev.disabled=true;ui.next.disabled=true;
}
function validateData(data){
 if(!Array.isArray(data)) throw new Error("JSON response must be an array. Check sample.json.");
 return data;
}
function setTime(){
 ui.updated.textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});
}

// Request 1: Fetch API
async function loadWithFetch(){
 showLoading();
 try{
  const response=await fetch(DATA_URL,{cache:"no-store"});
  if(!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data=await response.json();
  allRecords=validateData(data);updateDashboard();setTime();
 }catch(error){
  console.error("Fetch error:",error);
  showError(`${error.message} Run this project with VS Code Live Server.`);
 }finally{hideLoading();}
}

// Request 2: jQuery AJAX
function loadWithJQuery(){
 showLoading();
 $.ajax({
  url:DATA_URL,method:"GET",dataType:"json",cache:false,
  success:function(data){
   try{allRecords=validateData(data);updateDashboard();setTime();}
   catch(error){console.error("JSON structure error:",error);showError(error.message);}
  },
  error:function(xhr,textStatus,errorThrown){
   console.error("AJAX error:",textStatus,errorThrown);
   showError(`Request failed (status ${xhr.status || "unavailable"}). Run with Live Server and check the JSON path.`);
  },
  complete:function(){hideLoading();}
 });
}
function loadData(){if(ui.method.value==="jquery")loadWithJQuery();else loadWithFetch();}

function filteredRecords(){
 const term=ui.search.value.trim().toLowerCase();
 return allRecords.filter(r=>{
  const text=`${r.name} ${r.email} ${r.department} ${r.city}`.toLowerCase();
  return text.includes(term) &&
   (ui.department.value==="all"||r.department===ui.department.value) &&
   (ui.status.value==="all"||r.status===ui.status.value);
 });
}
function makeCard(record){
 const card=document.createElement("article");card.className="record";
 const top=document.createElement("div");top.className="record-top";
 const identity=document.createElement("div");const name=document.createElement("h3");
 name.textContent=record.name||"Unnamed record";
 const id=document.createElement("span");id.className="rid";id.textContent=`Record #${record.id??"—"}`;
 identity.append(name,id);
 const status=document.createElement("span");status.className="status "+(record.status==="Active"?"active":"inactive");
 status.textContent=record.status||"Unknown";top.append(identity,status);card.append(top);
 [["Email",record.email],["Department",record.department],["City",record.city]].forEach(([label,value])=>{
  const p=document.createElement("p");p.className="detail";
  const b=document.createElement("b");b.textContent=label+": ";
  p.append(b,document.createTextNode(value||"Not provided"));card.append(p);
 });
 return card;
}
function updateDashboard(){
 const data=filteredRecords();const pages=Math.ceil(data.length/PAGE_SIZE);
 currentPage=Math.min(currentPage,Math.max(pages,1));
 ui.total.textContent=allRecords.length;
 ui.active.textContent=allRecords.filter(r=>r.status==="Active").length;
 ui.inactive.textContent=allRecords.filter(r=>r.status==="Inactive").length;
 ui.resultCount.textContent=`${data.length} record${data.length===1?"":"s"}`;
 ui.records.innerHTML="";ui.empty.hidden=data.length!==0;ui.error.hidden=true;
 data.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE).forEach(r=>ui.records.append(makeCard(r)));
 ui.pageInfo.textContent=pages?`Page ${currentPage} of ${pages}`:"Page 0 of 0";
 ui.prev.disabled=currentPage<=1;ui.next.disabled=currentPage>=pages;
}

ui.load.addEventListener("click",loadData);
ui.refresh.addEventListener("click",loadData);
ui.retry.addEventListener("click",loadData);
[ui.search,ui.department,ui.status].forEach(control=>control.addEventListener(control===ui.search?"input":"change",()=>{currentPage=1;updateDashboard();}));
ui.prev.addEventListener("click",()=>{if(currentPage>1){currentPage--;updateDashboard();}});
ui.next.addEventListener("click",()=>{if(currentPage<Math.ceil(filteredRecords().length/PAGE_SIZE)){currentPage++;updateDashboard();}});
document.addEventListener("DOMContentLoaded",loadData);

let transactions = JSON.parse(localStorage.getItem("tx")) || [];

function addTransaction(){
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;
  if(!text || !amount) return alert("تفصیل اور رقم لکھیں");
  
  transactions.push({id: Date.now(), text, amount});
  localStorage.setItem("tx", JSON.stringify(transactions));
  
  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
  updateUI();
}

function removeTx(id){
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("tx", JSON.stringify(transactions));
  updateUI();
}

function updateUI(){
  const list = document.getElementById("list");
  list.innerHTML = "";
  let income=0, expense=0, balance=0;
  
  transactions.forEach(t=>{
    const li = document.createElement("li");
    li.className = t.amount > 0 ? "income" : "expense";
    li.innerHTML = `${t.text} <span>${t.amount} PKR <button onclick="removeTx(${t.id})" style="background:red;color:white;border:none;border-radius:50%;width:20px">x</button></span>`;
    list.appendChild(li);
    balance += t.amount;
    if(t.amount > 0) income += t.amount; else expense += t.amount;
  });
  
  document.getElementById("balance").innerText = balance + " PKR";
  document.getElementById("income").innerText = income + " PKR";
  document.getElementById("expense").innerText = Math.abs(expense) + " PKR";
}

updateUI();